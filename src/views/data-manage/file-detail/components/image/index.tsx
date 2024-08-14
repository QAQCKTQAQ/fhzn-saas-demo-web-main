import { Space, Image, message } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { Context } from '../../store/reducerContent'
import { useContext, useState } from 'react'
import { txtToCanvasDataByOriginalImageInfo } from '../../file-analysis-utils'
const ImageViewer = (props: any) => {
	const {
		setOriginalImageInfo,
		state: { imageLabel, originalImageInfo, labelType }
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
	}, [])

	useEffect(() => {
		setCanvasPath('')
	}, [path, imageLabel])

	// 根据标注渲染图片
	useEffect(() => {
		if (imageLabel && originalImageInfo) {
			const { naturalWidth, naturalHeight } = originalImageInfo
			// 针对txt标注文件，通过原始图片宽高还原标注坐标
			const labelData: any =
				labelType?.type === 'TXT' ? txtToCanvasDataByOriginalImageInfo(imageLabel, originalImageInfo) : imageLabel
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
				<Space className="image-tool" size={16}>
					<DownloadOutlined onClick={() => window.open(path)} style={{ color: '#1890ff' }} />
				</Space>
			</div>
		</>
	)
}

export default ImageViewer
