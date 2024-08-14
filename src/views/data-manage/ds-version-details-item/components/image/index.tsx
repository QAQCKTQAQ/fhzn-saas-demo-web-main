import { Space, Image, message, Tooltip } from 'antd'
import { DownloadOutlined, BlockOutlined, UngroupOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { Context } from '../../store/reducerContent'
import { useContext, useState } from 'react'
import {
	ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL,
	txtToCanvasDataByOriginalImageInfo,
	ASYNC_SUBSCRIBE_FILE_MARK_MODAL
} from '../../const'
import ImgAugmentationModal from '../img-augmentation-modal'
import PubSub from 'pubsub-js'
import ImgMarkModal from '../img-mark-modal'

const ImageViewer = (props: any) => {
	const {
		setOriginalImageInfo,
		state: { imageLabel, originalImageInfo, labelType, fileDetailData },
		from
	} = useContext(Context)
	const { path } = props
	const [canvasPath, setCanvasPath] = useState('')
	useEffect(() => {
		let imageDom: any = document.querySelector('#image .ant-image-img')
		imageDom.onload = () => {
			setOriginalImageInfo(imageDom)
		}
		return () => {
			imageDom.onload = null
		}
	}, [imageLabel])

	useEffect(() => {
		setCanvasPath('')
	}, [path, imageLabel])

	// 标注来源信息 annotationSource :1-普通上传 2-标注操作  3-增广操作
	const handleLabelData = () => {
		const { type } = labelType
		const { annotationSource } = fileDetailData
		if (type === 'TXT' && annotationSource && annotationSource !== 2) {
			return txtToCanvasDataByOriginalImageInfo(imageLabel, originalImageInfo)
		}
		return imageLabel
	}

	// 根据标注渲染图片
	useEffect(() => {
		if (imageLabel && originalImageInfo) {
			debugger
			const { naturalWidth, naturalHeight } = originalImageInfo
			// 针对txt标注文件，通过原始图片宽高还原标注坐标
			const labelData: any = handleLabelData()
			try {
				const imgCanvas: any = document.createElement('canvas')
				const ctx = imgCanvas.getContext('2d')
				imgCanvas.width = naturalWidth
				imgCanvas.height = naturalHeight
				ctx.drawImage(originalImageInfo, 0, 0, naturalWidth, naturalHeight)
				for (const v of labelData || []) {
					renderDrawRect(ctx, v)
				}
				setCanvasPath(imgCanvas.toDataURL(originalImageInfo))
			} catch (e) {
				message.error('解析标注文件异常！')
			}
		}
	}, [imageLabel])

	// 绘制矩形
	const renderDrawRect = (ctx: any, imageLabel: any) => {
		const { x, y, width, height, label, color } = imageLabel
		ctx.lineWidth = 3
		ctx.font = '14px 宋体'
		ctx.fillStyle = color
		ctx.fillText(label, x, y)
		ctx.strokeStyle = color
		ctx.strokeRect(x, y, width, height)
	}

	return (
		<>
			<div className="image-container">
				{/* 根据标注图片显示隐藏原图 */}
				<Image src={path} id="image" style={{ display: canvasPath ? 'none' : 'block' }} />
				{(canvasPath && <Image src={canvasPath} />) || null}
				<Space className="image-tool">
					{from === 'space' &&
						((
							<>
								<Tooltip title="图片标注" placement="bottom">
									<BlockOutlined
										onClick={() =>
											PubSub.publishSync(ASYNC_SUBSCRIBE_FILE_MARK_MODAL, {
												url: path,
												...fileDetailData,
												callBack: () => {
													document.location.reload()
												}
											})
										}
									/>
								</Tooltip>
								<Tooltip title="图片增广" placement="bottom">
									<UngroupOutlined
										onClick={() =>
											PubSub.publishSync(ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL, {
												url: path,
												...fileDetailData
											})
										}
									/>
								</Tooltip>
							</>
						) ||
							null)}
					<DownloadOutlined onClick={() => window.open(path)} />
				</Space>
			</div>
			<ImgAugmentationModal />
			<ImgMarkModal />
		</>
	)
}

export default ImageViewer
