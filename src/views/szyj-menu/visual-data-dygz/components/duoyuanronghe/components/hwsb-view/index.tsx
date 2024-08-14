// 红外目标智能识别算法
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getHwsbDataApi } from '@/api/modules/visual-data'
import { Col, Row, Image, Empty } from 'antd'
import { getRandomColor } from '@/utils/util'

export default function HwsbView(props: any) {
	const { type } = props
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [hongwaiInfo, setHongwaiInfo] = useState<any>(null)
	// 画图打标注
	const [canvasPath, setCanvasPath] = useState('')

	// 原始图片信息
	const [originalImageInfo, setOriginalImageInfo] = useState(null)

	console.log(hongwaiInfo)

	useEffect(() => {
		if (selectDdId && selectTime) {
			setHongwaiInfo(null)
			setCanvasPath('')
			setOriginalImageInfo(null)
			getHwsbData()
		}
	}, [selectDdId, selectTime, type])

	const getHwsbData = async () => {
		const data = await getHwsbDataApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime, type })
		setHongwaiInfo(data)
	}

	useEffect(() => {
		let imageDom: any = document.querySelector('#image .ant-image-img')
		if (hongwaiInfo && imageDom) {
			imageDom.onload = () => {
				setOriginalImageInfo(imageDom)
			}
			return () => {
				imageDom.onload = null
			}
		}
	}, [hongwaiInfo])

	// 根据标注渲染图片
	useEffect(() => {
		if (originalImageInfo) {
			const { naturalWidth, naturalHeight } = originalImageInfo
			const { hwSlices } = hongwaiInfo
			// 针对txt标注文件，通过原始图片宽高还原标注坐标
			const labelData: any = (hwSlices || []).map((item: any) => {
				const { tar_X, tar_Y, image_kuandu, image_gaodu } = item
				return {
					x: tar_X,
					y: tar_Y,
					width: image_kuandu,
					height: image_gaodu,
					color: getRandomColor()
				}
			})

			try {
				const imgCanvas: any = document.createElement('canvas')
				const ctx = imgCanvas.getContext('2d')
				imgCanvas.width = naturalWidth
				imgCanvas.height = naturalHeight
				ctx.drawImage(originalImageInfo, 0, 0, naturalWidth, naturalHeight)
				for (const v of labelData || []) {
					renderDrawRect(ctx, v)
				}
				renderX(ctx)
				setCanvasPath(imgCanvas.toDataURL(originalImageInfo))
			} catch (e) {
				/* empty */
			}
		}
	}, [originalImageInfo])

	// 绘制X号
	const renderX = (ctx: any) => {
		ctx.beginPath() //开始路径状态
		ctx.moveTo(10, 10) //笔尖落在哪
		ctx.lineTo(30, 30) //笔尖走到哪
		ctx.lineWidth = 5 //笔水的大小
		ctx.strokeStyle = 'red' //笔的颜色
		ctx.stroke() //绘制

		ctx.beginPath() //开始路径状态
		ctx.moveTo(30, 10) //笔尖落在哪
		ctx.lineTo(10, 30) //笔尖走到哪
		ctx.lineWidth = 5 //笔水的大小
		ctx.strokeStyle = 'red' //笔的颜色
		ctx.stroke() //绘制

		ctx.font = '12px serif'
		ctx.fillText('舰船-置信度：6', 0, 42)
	}

	// 绘制矩形
	const renderDrawRect = (ctx: any, imageLabel: any) => {
		const { x, y, width, height, color } = imageLabel
		ctx.lineWidth = 6
		ctx.strokeStyle = color
		ctx.strokeRect(x, y, width, height)
	}

	return (
		<>
			<div className="mult-container-item">
				<Row gutter={[16, 16]}>
					<Col span={12} className="item-box">
						<div className="img-box hwsb-gdmb-view-box">
							<div className="title-box">
								<div className="title font-size-12">算法输入</div>
							</div>

							{(hongwaiInfo?.hwImageBase64 && (
								<Image className="hwsb-view-img" id="image" src={`data:image/png;base64,${hongwaiInfo?.hwImageBase64}`} />
							)) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col>
					<Col span={12} className="item-box">
						<div className="img-box hwsb-view-box">
							<div className="title-box">
								<div className="title font-size-12">算法输出</div>
							</div>
							{(canvasPath && <Image width={'100%'} src={canvasPath} />) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}
