/****
 * 编辑图片
 */
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react'
import { Context } from '../store/reducerContent'
import Cropper from 'cropperjs'
import {
	DragOutlined,
	ScissorOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
	RedoOutlined,
	UndoOutlined,
	ColumnHeightOutlined,
	ColumnWidthOutlined
} from '@ant-design/icons'
import { initialState } from '../store'
import { ASYNC_IMAGE_HANDLE } from '../const'
import PubSub from 'pubsub-js'
import { dataURLtoFile } from '@/utils/util'
import axios from 'axios'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import { message } from 'antd'

const Editer = (props: any, ref: any) => {
	const {
		state: { imageData },
		setImageData
	} = useContext(Context)

	const imageDataRef: any = useRef()

	useImperativeHandle(ref, () => ({
		//暴露给父组件的方法
		saveImage: async () => {
			const file = dataURLtoFile(
				cropperRef.current.cropper.getCroppedCanvas().toDataURL('image/png'),
				`${new Date().getTime()}.png`
			)
			return await uploadFile(file)
		}
	}))

	const uploadFile = (file: any) => {
		return new Promise((resolve: any) => {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('source', UPLOAD_SOURCE_ENUM.FILES)
			axios({
				url: '/api/bff/upload',
				method: 'post',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				timeout: 60000 // 超时时间设置
			})
				.then((res: any) => {
					const { status, data } = res || {}
					if (status === 200 && data?.code === 0) {
						const code = data?.data?.code
						file.done = 'success'
						file.code = code
						resolve(file)
						return
					}

					file.done = 'fail'
					message.error(data?.message || '上传失败，请稍后重试！')
					resolve(file)
				})
				.catch(() => {
					file.done = 'fail'
					resolve(file)
				})
		})
	}

	useEffect(() => {
		imageDataRef.current = imageData
	}, [imageData])

	useEffect(() => {
		PubSub.subscribe(ASYNC_IMAGE_HANDLE, asyncHanleImage)
		return () => {
			PubSub.unsubscribe(ASYNC_IMAGE_HANDLE)
		}
	}, [])

	const asyncHanleImage = (key: any, action: string) => {
		if (action === 'reset') {
			reset()
		}
		if (action === 'crop') {
			crop()
		}
		if (action === 'clear') {
			clear()
		}
		if (action === 'restore') {
			restore()
		}
	}

	const cropperRef: any = useRef({
		canvasData: null,
		cropBoxData: null,
		croppedData: null,
		cropper: null
	})

	const imageRef: any = useRef()

	// 初始化数据
	const start = () => {
		const { cropped } = imageData
		if (cropped || cropperRef.current.cropper) {
			return
		}
		cropperRef.current.cropper = new Cropper(imageRef.current, {
			autoCrop: false,
			dragMode: 'move',
			background: false,

			ready: () => {
				if (cropperRef.current.croppedData) {
					cropperRef.current.cropper
						.crop()
						.setData(cropperRef.current.croppedData)
						.setCanvasData(cropperRef.current.canvasData)
						.setCropBoxData(cropperRef.current.cropBoxData)
					cropperRef.current.croppedData = null
					cropperRef.current.canvasData = null
					cropperRef.current.cropBoxData = null
				}
			},

			crop: ({ detail }) => {
				if (detail.width > 0 && detail.height > 0 && !imageData.cropping) {
					setImageData({ ...imageData, cropping: true })
				}
			}
		})
	}

	const crop = () => {
		const { cropper } = cropperRef.current
		const { cropping, url, type } = imageDataRef.current
		if (cropping) {
			cropperRef.current.croppedData = cropper.getData()
			cropperRef.current.canvasData = cropper.getCanvasData()
			cropperRef.current.cropBoxData = cropper.getCropBoxData()
			setImageData({
				...imageDataRef.current,
				cropped: true,
				cropping: false,
				previousUrl: url,
				url: cropper.getCroppedCanvas({}).toDataURL(type)
			})
			stop()
		}
	}

	const stop = () => {
		if (cropperRef.current.cropper) {
			cropperRef.current.cropper.destroy()
			cropperRef.current.cropper = null
		}
	}

	const clear = () => {
		const { cropping } = imageDataRef.current
		if (cropping) {
			imageRef.current.cropper.clear()
			setImageData({ ...imageDataRef.current, cropping: false })
		}
	}

	const restore = () => {
		const { cropped, previousUrl } = imageDataRef.current
		if (cropped) {
			setImageData({
				...imageDataRef.current,
				cropping: false,
				cropped: false,
				previousUrl: '',
				url: previousUrl
			})
		}
	}

	const reset = () => {
		stop()
		setImageData(initialState.imageData)
	}

	const click = (action: string) => {
		const { cropper } = cropperRef.current

		switch (action) {
			case 'move':
			case 'crop':
				cropper.setDragMode(action)
				break

			case 'zoom-in':
				cropper.zoom(0.1)
				break

			case 'zoom-out':
				cropper.zoom(-0.1)
				break

			case 'rotate-left':
				cropper.rotate(-15)
				break

			case 'rotate-right':
				cropper.rotate(15)
				break

			case 'flip-horizontal':
				cropper.scaleX(-cropper.getData().scaleX || -1)
				break

			case 'flip-vertical':
				cropper.scaleY(-cropper.getData().scaleY || -1)
				break

			default:
		}
	}

	return (
		<div className="editer">
			<div className="canvas">
				<img
					src={imageData.url}
					onLoad={start}
					alt={imageData.name}
					ref={ref => (imageRef.current = ref)}
					className="cropper-hidden"
				/>
				<div className="tool">
					<DragOutlined onClick={() => click('move')} />
					<ScissorOutlined onClick={() => click('crop')} />
					<ZoomInOutlined onClick={() => click('zoom-in')} />
					<ZoomOutOutlined onClick={() => click('zoom-out')} />
					<RedoOutlined onClick={() => click('rotate-left')} />
					<UndoOutlined onClick={() => click('rotate-right')} />
					<ColumnWidthOutlined onClick={() => click('flip-horizontal')} />
					<ColumnHeightOutlined onClick={() => click('flip-vertical')} />
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Editer)
