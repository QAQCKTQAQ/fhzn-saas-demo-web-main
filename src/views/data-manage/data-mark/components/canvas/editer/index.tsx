import { useContext, useEffect, useRef } from 'react'
import LeftSideTool from '../left-side-tool'
import RightSideTool from '../right-side-tool'
import { Context } from '../../../store/reducerContent'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash'
import defaultLabelImg from '@/assets/images/aug-demo.jpeg'

export default function Editer() {
	const { state, setLabelResultList, extraInfo } = useContext(Context)
	const { labelResultList = [] } = state || {}

	// 数据信息
	const currentInfoRef: any = useRef({
		// 图片信息
		imageInfo: {
			iWidth: 0,
			iHeight: 0,
			scale: 1,
			// 缩放布进
			scaleStep: 0.02,
			// 最小缩放比例
			minScale: 0.2,
			// 最大缩放比例
			maxScale: 8,
			// 图片拖拽至边缘最小显示
			appearSize: 180,
			// 图片在画板中的横坐标
			x: 0,
			// 图片在画板中的纵坐标
			y: 0,
			// 矩形框起点横坐标
			rectX: 0,
			// 矩形框起点纵坐标
			rectY: 0,
			opacity: 0.45,
			radius: 6
		},
		canvasInfo: {
			cWidth: 0,
			cHeight: 0,
			// 鼠标当前画板中的横坐标
			mouseX: 0,
			// 鼠标当前画板中的纵坐标
			mouseY: 0,
			// 拖动过程中，鼠标前一次移动的横坐标
			prevX: 0,
			// 拖动过程中，鼠标前一次移动的纵坐标
			prevY: 0
		},
		// 节点信息
		nodes: {
			// 图片节点
			image: null,
			// 画布节点
			canvas: null,
			// 画布上下文
			ctx: null,
			// 存储图像数据的画布
			bCanvas: null,
			// 存储图像数据的上下文
			bCtx: null
		},
		// 标注结果
		labelResultList: [],
		// 图片标注存储数据集
		imageAnnotateMemory: [],
		// 是否激活标注框
		isDragCircle: false,
		// 当前激活的标注信息
		activeLabel: null,
		// 当前点击圆点index
		snapCircleIndex: 0
	})

	useEffect(() => {
		initCanvas()
		initLoadImg()
	}, [])

	useEffect(() => {
		bindAddEventListener()
		return () => {
			bindRemoveEventListener()
		}
	}, [state])

	useEffect(() => {
		let _nodes = currentInfoRef.current.nodes
		currentInfoRef.current.labelResultList = labelResultList
		ReplaceAnnotateMemory()
		if (_nodes.ctx && _nodes.bCanvas) {
			DrawSavedAnnotateInfoToShow()
		}
	}, [labelResultList])

	// 初始化画布
	const initCanvas = () => {
		// 获取画布信息
		const canvas: any = document.getElementById('canvas')
		const cWidth = canvas.clientWidth
		const cHeight = canvas.clientHeight
		canvas.width = cWidth
		canvas.height = cHeight
		currentInfoRef.current.canvasInfo = { cWidth, cHeight }
		currentInfoRef.current.nodes.canvas = canvas
		currentInfoRef.current.nodes.ctx = canvas.getContext('2d')
	}

	// 初始化原始图片
	const initLoadImg = () => {
		const { cWidth, cHeight } = currentInfoRef.current.canvasInfo
		const image = new Image()
		image.crossOrigin = 'anonymous'
		image.src = extraInfo?.url || defaultLabelImg
		currentInfoRef.current.nodes.image = image
		image.addEventListener('load', () => {
			const iWidth = image.width
			const iHeight = image.height
			currentInfoRef.current.imageInfo.iWidth = iWidth
			currentInfoRef.current.imageInfo.iHeight = iHeight
			// 创建数据存储面板
			createCanvasData()
			currentInfoRef.current.imageInfo.scale = 1
			// 初始化自适应缩放图片并居中 // 图片初始定位
			if (iWidth > cWidth || iHeight > cHeight) {
				currentInfoRef.current.imageInfo.scale = iWidth - cWidth > iHeight - cHeight ? cWidth / iWidth : cHeight / iHeight
			}
			let initImgX = (cWidth - iWidth * currentInfoRef.current.imageInfo.scale) / 2
			let initImgY = (cHeight - iHeight * currentInfoRef.current.imageInfo.scale) / 2
			// 设置图片位置
			setXY(initImgX, initImgY)
		})
	}

	//----设置图片位置，防止图片被拖出画布
	const setXY = (vx: any, vy: any) => {
		const { cWidth, cHeight } = currentInfoRef.current.canvasInfo
		const { appearSize, iWidth, iHeight, scale } = currentInfoRef.current.imageInfo
		if (vx < appearSize - iWidth * scale) {
			currentInfoRef.current.imageInfo.x = appearSize - iWidth * scale
		} else if (vx > cWidth - appearSize) {
			currentInfoRef.current.imageInfo.x = cWidth - appearSize
		} else {
			currentInfoRef.current.imageInfo.x = vx
		}

		if (vy < appearSize - iHeight * scale) {
			currentInfoRef.current.imageInfo.y = appearSize - iHeight * scale
		} else if (vy > cHeight - appearSize) {
			currentInfoRef.current.imageInfo.y = cHeight - appearSize
		} else {
			currentInfoRef.current.imageInfo.y = vy
		}
		upDateCanvas()
	}

	const upDateCanvas = () => {
		let _nodes = currentInfoRef.current.nodes
		const { cWidth, cHeight } = currentInfoRef.current.canvasInfo
		const { x, y, scale } = currentInfoRef.current.imageInfo
		_nodes.ctx.clearRect(0, 0, cWidth, cHeight)
		_nodes.ctx.drawImage(_nodes.bCanvas, -x / scale, -y / scale, cWidth / scale, cHeight / scale, 0, 0, cWidth, cHeight)
	}

	// 创建数据存储面板
	const createCanvasData = () => {
		const _nodes = currentInfoRef.current.nodes
		const { iWidth, iHeight } = currentInfoRef.current.imageInfo
		_nodes.bCanvas = document.createElement('canvas')
		_nodes.bCanvas.width = iWidth
		_nodes.bCanvas.height = iHeight
		_nodes.bCanvas.style.display = 'none'
		_nodes.bCanvas.className = 'bodyCanvas'
		_nodes.bCtx = _nodes.bCanvas.getContext('2d')
		_nodes.bCtx.drawImage(_nodes.image, 0, 0, iWidth, iHeight)
		_nodes.bCtx.translate(0.5, 0.5)
		document.body.appendChild(_nodes.bCanvas)
	}

	// 绑定事件
	const bindAddEventListener = () => {
		const { canvas } = currentInfoRef.current.nodes
		canvas?.addEventListener('mousewheel', mouseWheel)
		// 画布禁止右键
		canvas?.addEventListener('contextmenu', (e: any) => e.preventDefault())
		canvas?.addEventListener('mousedown', canvasMouseDown)
		canvas?.addEventListener('mousemove', CanvasMouseMove)
		canvas.addEventListener('mousemove', MouseMoveCrossHairLocation)
	}

	// 删除绑定事件
	const bindRemoveEventListener = () => {
		const { canvas } = currentInfoRef.current.nodes
		canvas?.removeEventListener('mousewheel', mouseWheel)
		// 画布禁止右键
		canvas?.removeEventListener('contextmenu', (e: any) => e.preventDefault())
		canvas?.removeEventListener('mousedown', canvasMouseDown)
		canvas?.removeEventListener('mousemove', MouseMoveCrossHairLocation)
	}

	//----鼠标移动十字线定位函数
	const MouseMoveCrossHairLocation = () => {
		DrawSavedAnnotateInfoToShow()
		// 更新鼠标当前位置十字线
		if (state.crossOn) {
			MouseMoveCrossHair()
		}
	}

	//----画板跟随鼠标十字线绘制函数
	const MouseMoveCrossHair = () => {
		let _nodes = currentInfoRef.current.nodes
		const { mouseY, mouseX, cWidth, cHeight } = currentInfoRef.current.canvasInfo
		_nodes.ctx.setLineDash([6, 3])
		_nodes.ctx.lineWidth = 2
		_nodes.ctx.strokeStyle = '#ffffff'
		_nodes.ctx.beginPath()
		// 横线
		_nodes.ctx.moveTo(0, mouseY)
		_nodes.ctx.lineTo(cWidth, mouseY)
		_nodes.ctx.stroke()
		// 纵线
		_nodes.ctx.moveTo(mouseX, 0)
		_nodes.ctx.lineTo(mouseX, cHeight)
		_nodes.ctx.stroke()
		_nodes.ctx.closePath()
		const { opacity } = currentInfoRef.current.imageInfo
		_nodes.ctx.fillStyle = 'rgba(' + '0, 0, 0' + ',' + opacity + ')'
		const text = `x:${Number(mouseX).toFixed(2)} y:${Number(mouseY).toFixed(2)}`
		const textPx = _nodes.ctx.measureText(text).width
		_nodes.ctx.fillRect(mouseX + 6, mouseY + 6, 100, 20)
		_nodes.ctx.fillStyle = '#fff'
		_nodes.ctx.fillText(text, mouseX + (50 - textPx / 2), mouseY + 20, textPx)
	}

	//----监听画板鼠标移动, 激活标注的圆点
	const CanvasMouseMove = (e: any) => {
		const _nodes = currentInfoRef.current.nodes
		let _arrays = currentInfoRef.current.labelResultList
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		const { radius } = currentInfoRef.current.imageInfo
		getMouseInCanvasLocation(e)
		for (let j = 0; j < _arrays.length; j++) {
			const imageIndexShow = _arrays[j].content
			for (let i = 0; i < imageIndexShow.length; i++) {
				// 使用勾股定理计算鼠标当前位置是否处于当前点上
				let distanceFromCenter = Math.sqrt(Math.pow(imageIndexShow[i].x - mouseX, 2) + Math.pow(imageIndexShow[i].y - mouseY, 2))
				// 改变圆点颜色动画
				if (distanceFromCenter <= radius) {
					_nodes.canvas.style.cursor = 'grabbing'
					return
				} else {
					_nodes.canvas.style.cursor = 'crosshair'
				}
			}
		}
	}

	// 通过监听鼠标点击，在标注框四点时，激活标注框拖动
	const activeDragCircle = () => {
		currentInfoRef.current.isDragCircle = false
		const _nodes = currentInfoRef.current.nodes
		let _arrays = currentInfoRef.current.labelResultList
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		const { radius } = currentInfoRef.current.imageInfo

		for (let j = 0; j < _arrays.length; j++) {
			const imageIndexShow = _arrays[j].content
			for (let i = 0; i < imageIndexShow.length; i++) {
				// 使用勾股定理计算鼠标当前位置是否处于当前点上
				let distanceFromCenter = Math.sqrt(Math.pow(imageIndexShow[i].x - mouseX, 2) + Math.pow(imageIndexShow[i].y - mouseY, 2))
				// 改变圆点颜色动画
				if (distanceFromCenter <= radius) {
					currentInfoRef.current.activeLabel = _arrays[j]
					currentInfoRef.current.isDragCircle = true
					currentInfoRef.current.snapCircleIndex = i
					_nodes.canvas.addEventListener('mousemove', DragRectCircleRepaintRect)
					_nodes.canvas.addEventListener('mouseup', RemoveDragRectCircle)
				} else {
					_nodes.canvas.style.cursor = 'crosshair'
				}
			}
		}
	}

	//----拖拽矩形圆点时重新绘制矩形事件
	const DragRectCircleRepaintRect = (e: any) => {
		const { id } = currentInfoRef.current.activeLabel
		const _nodes = currentInfoRef.current.nodes
		const { opacity } = currentInfoRef.current.imageInfo
		getMouseInCanvasLocation(e)
		const labelResultList = cloneDeep(currentInfoRef.current.labelResultList)
		const imageLabel = labelResultList.find((item: any) => item.id === id)
		_nodes.ctx.fillStyle = 'rgba(255,0,0,' + opacity + ')'
		DragRectCircleChangeLocation(imageLabel?.content, currentInfoRef.current.snapCircleIndex)
		CalcRectMask(imageLabel)
		currentInfoRef.current.labelResultList = labelResultList
		DrawSavedAnnotateInfoToShow()
		setLabelResultList(labelResultList)
	}

	// 选中远点绘制时，重新计算当前标注框信息
	const CalcRectMask = (imageLabel: any) => {
		const { content: arrays } = imageLabel
		if (arrays.length >= 2) {
			// 保存边缘矩形框坐标点
			let xMin = arrays[0].x,
				xMax = arrays[0].x,
				yMin = arrays[0].y,
				yMax = arrays[0].y
			arrays.forEach((item: any) => {
				xMin = xMin < item.x ? xMin : item.x
				xMax = xMax > item.x ? xMax : item.x
				yMin = yMin < item.y ? yMin : item.y
				yMax = yMax > item.y ? yMax : item.y
			})
			imageLabel.rectMask = {
				xMin: xMin,
				yMin: yMin,
				width: xMax - xMin,
				height: yMax - yMin
			}
			// 计算已创建的标签居中显示
			// let labelX = (xMax - xMin) / 2 + xMin
			// let labelY = (yMax - yMin) / 2 + yMin
			// imageLabel.labelLocation.x = labelX
			// imageLabel.labelLocation.y = labelY
		}
	}

	//----拖拽矩形圆点时改变矩形十个点坐标
	const DragRectCircleChangeLocation = (content: any, circleIndex: number) => {
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		content[circleIndex].x = mouseX
		content[circleIndex].y = mouseY
		switch (circleIndex) {
			case 0:
				content[1].y = mouseY
				content[3].x = mouseX
				break
			case 1:
				content[0].y = mouseY
				content[2].x = mouseX
				break
			case 2:
				content[1].x = mouseX
				content[3].y = mouseY
				break
			case 3:
				content[0].x = mouseX
				content[2].y = mouseY
				break
			default:
				break
		}
	}

	//----移除矩形圆点拖拽事件，并将最新数据绘制到存储面板中
	const RemoveDragRectCircle = () => {
		ReplaceAnnotateMemory()
		DrawSavedAnnotateInfoToMemory(false)
		const _nodes = currentInfoRef.current.nodes
		_nodes.canvas.removeEventListener('mousemove', DragRectCircleRepaintRect)
		_nodes.canvas.removeEventListener('mouseup', RemoveDragRectCircle)
	}

	//----绘制已保存的标定信息（只在拖拽和缩放画布时渲染）绘画至数据存储面板
	const DrawSavedAnnotateInfoToMemory = (isRender: any) => {
		const _nodes = currentInfoRef.current.nodes
		const { iWidth, iHeight } = currentInfoRef.current.imageInfo
		_nodes.bCtx.clearRect(0, 0, iWidth, iHeight)
		_nodes.bCtx.drawImage(_nodes.image, 0, 0, iWidth, iHeight)
		if (isRender) {
			currentInfoRef.current.imageAnnotateMemory.forEach((item: any) => {
				if (item.contentType === 'rect') {
					DrawRect(
						_nodes.bCtx,
						item.rectMask.xMin,
						item.rectMask.yMin,
						item.rectMask.width,
						item.rectMask.height,
						item.labels.labelColor,
						item.labels.labelColorRGB
					)
				}
				// if (_arrays.resultIndex !== 0 && _arrays.resultIndex-1 === index) {
				// 	item.content.forEach((circle) => {
				// 		// 绘制圆点
				// 		DrawCircle(_nodes.bCtx, circle.x, circle.y, "#20c3f9");
				// 	});
				// }
			})
		}
		upDateCanvas()
		!isRender && DrawSavedAnnotateInfoToShow()
	}

	//监听鼠标点击事件
	const canvasMouseDown = (e: any) => {
		getMouseInCanvasLocation(e)
		if (e.button === 0) {
			activeDragCircle()
			if (!currentInfoRef.current.isDragCircle) {
				if (state?.drag) {
					dragEventHandle(e)
				}
				if (state?.rectOn) {
					drawRectHandle()
				}
			}
		}
	}

	// 开启绘制矩形功能
	const drawRectHandle = () => {
		const _nodes = currentInfoRef.current.nodes
		const imageInfo = currentInfoRef.current.imageInfo
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		_nodes.ctx.lineWidth = 1
		_nodes.ctx.strokeStyle = '#ff0000'
		_nodes.ctx.fillStyle = 'rgba(255,0,0,' + imageInfo.opacity + ')'
		imageInfo.rectX = mouseX
		imageInfo.rectY = mouseY
		_nodes.canvas.addEventListener('mousemove', MouseMoveDrawRect)
		_nodes.canvas.addEventListener('mouseup', MouseUpRemoveDrawRect)
	}

	//----鼠标移动绘制矩形事件
	const MouseMoveDrawRect = (e: any) => {
		const _nodes = currentInfoRef.current.nodes
		const { opacity, rectX, rectY } = currentInfoRef.current.imageInfo
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		getMouseInCanvasLocation(e)
		DrawSavedAnnotateInfoToShow()
		_nodes.ctx.strokeStyle = '#ff0000'
		_nodes.ctx.fillStyle = 'rgba(255,0,0,' + opacity + ')'
		_nodes.ctx.strokeRect(rectX, rectY, mouseX - rectX, mouseY - rectY)
		_nodes.ctx.fillRect(rectX, rectY, mouseX - rectX, mouseY - rectY)
	}

	//----绘制矩形时鼠标抬起后移除监听函数
	const MouseUpRemoveDrawRect = () => {
		const _nodes = currentInfoRef.current.nodes
		const { rectX } = currentInfoRef.current.imageInfo
		const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
		if (mouseX - rectX >= 5 || rectX - mouseX >= 5) {
			// 判断矩形绘制距离大于五才认定为有效绘制
			// 保存绘图数据
			CreateNewResultList(mouseX, mouseY, 'rect')
			ReplaceAnnotateMemory()
		}
		_nodes.canvas.removeEventListener('mousemove', MouseMoveDrawRect)
		_nodes.canvas.removeEventListener('mouseup', MouseUpRemoveDrawRect)
	}

	// 渲染
	const DrawSavedAnnotateInfoToShow = () => {
		let _nodes = currentInfoRef.current.nodes
		const { iWidth, iHeight } = currentInfoRef.current.imageInfo
		_nodes.bCtx.clearRect(0, 0, iWidth, iHeight)
		_nodes.bCtx.drawImage(_nodes.image, 0, 0, iWidth, iHeight)
		upDateCanvas()
		;(currentInfoRef.current.labelResultList || []).map((item: any) => {
			if (item?.visible) {
				DrawRect(
					_nodes.ctx,
					item.rectMask.xMin,
					item.rectMask.yMin,
					item.rectMask.width,
					item.rectMask.height,
					item.labels.labelColor,
					item.labels.labelColorRGB
				)
				item.content.forEach((circle: any) => {
					// 绘制圆点
					DrawCircle(_nodes.ctx, circle.x, circle.y, '#000000')
				})
				// 点亮
				if (item?.hoverActive) {
					_nodes.ctx.beginPath()
					_nodes.ctx.lineWidth = 2
					_nodes.ctx.strokeStyle = '#fffd4d'
					_nodes.ctx.fillStyle = 'rgba(255, 253, 77, 0.3)'
					_nodes.ctx.strokeRect(item.rectMask.xMin, item.rectMask.yMin, item.rectMask.width, item.rectMask.height)
					_nodes.ctx.fillRect(item.rectMask.xMin, item.rectMask.yMin, item.rectMask.width, item.rectMask.height)
					_nodes.ctx.closePath()
				}
			}
		})
	}

	//----绘制矩形的方法
	const DrawRect = (ctx: any, x: any, y: any, width: any, height: any, color: any, rgb: any) => {
		const { opacity } = currentInfoRef.current.imageInfo
		ctx.strokeStyle = color
		ctx.fillStyle = 'rgba(' + rgb + ',' + opacity + ')'
		ctx.strokeRect(x, y, width, height)
		ctx.fillRect(x, y, width, height)
	}

	//----绘制圆点的方法
	const DrawCircle = (ctx: any, x: any, y: any, color: any) => {
		const { radius } = currentInfoRef.current.imageInfo
		ctx.beginPath()
		ctx.fillStyle = '#fff'
		ctx.arc(x, y, radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.beginPath()
		ctx.fillStyle = color
		ctx.arc(x, y, 2, 0, 2 * Math.PI)
		ctx.fill()
	}

	// 收集标注相关信息
	const CreateNewResultList = (mx: any, my: any, contentType: any) => {
		if (contentType === 'rect') {
			const { rectX, rectY } = currentInfoRef.current.imageInfo
			const { mouseX, mouseY } = currentInfoRef.current.canvasInfo
			const rectMask = {
				xMin: rectX,
				yMin: rectY,
				width: mouseX - rectX,
				height: mouseY - rectY
			}
			const labelResultList = [
				...(currentInfoRef.current.labelResultList || []),
				{
					id: nanoid(),
					content: [
						{ x: rectX, y: rectY },
						{ x: mouseX, y: rectY },
						{ x: mouseX, y: mouseY },
						{ x: rectX, y: mouseY }
					],
					labels: {
						labelName: '',
						labelColor: 'red',
						labelColorRGB: '255,0,0'
					},
					rectMask,
					contentType: contentType,
					visible: true
				}
			]
			setLabelResultList(labelResultList)
		}
	}

	// 拖动图片事件
	const dragEventHandle = (e: any) => {
		const _nodes = currentInfoRef.current.nodes
		const canvasInfo = currentInfoRef.current.canvasInfo
		// 是否开启拖拽模式
		const prevP = calculateChange(e, _nodes.canvas)
		canvasInfo.prevX = prevP.x
		canvasInfo.prevY = prevP.y
		_nodes.canvas.addEventListener('mousemove', ImageDrag)
		_nodes.canvas.addEventListener('mouseup', RemoveImageDrag)
	}

	//----图片拖拽事件函数
	const ImageDrag = (e: any) => {
		const _nodes = currentInfoRef.current.nodes
		const { prevX, prevY } = currentInfoRef.current.canvasInfo
		const { x, y } = currentInfoRef.current.imageInfo
		const p = calculateChange(e, _nodes.canvas)
		let offsetX = p.x - prevX
		let offsetY = p.y - prevY
		setXY(x + offsetX, y + offsetY)
		currentInfoRef.current.canvasInfo.prevX = p.x
		currentInfoRef.current.canvasInfo.prevY = p.y
		DrawSavedAnnotateInfoToMemory(true)
	}

	//----移除鼠标拖拽图片事件函数, 并将最新数据绘制到存储面板中
	const RemoveImageDrag = () => {
		const _nodes = currentInfoRef.current.nodes
		ReplaceAnnotateShow()
		DrawSavedAnnotateInfoToMemory(false)
		_nodes.canvas.removeEventListener('mousemove', ImageDrag)
		_nodes.canvas.removeEventListener('mouseup', RemoveImageDrag)
	}

	//----获取更新鼠标在当前展示画板中的位置
	const getMouseInCanvasLocation = (e: any) => {
		const { canvasInfo } = currentInfoRef.current
		canvasInfo.mouseX = XPointReplace(e.layerX || e.offsetX)
		canvasInfo.mouseY = YPointReplace(e.layerY || e.offsetY)
	}

	//----Y坐标点装换， 防止绘制到图片外
	const YPointReplace = (my: any) => {
		const { y, iHeight, scale } = currentInfoRef.current.imageInfo
		if (my < y) {
			my = y
		} else if (my > iHeight * scale + y) {
			my = iHeight * scale + y
		}
		return my
	}

	//----X坐标点装换， 防止绘制到图片外
	const XPointReplace = (mx: any) => {
		const { x, iWidth, scale } = currentInfoRef.current.imageInfo
		if (mx < x) {
			mx = x
		} else if (mx > iWidth * scale + x) {
			mx = iWidth * scale + x
		}
		return mx
	}

	// 滚轮事件，用于缩小放大
	const mouseWheel = (e: any) => {
		let wd = e.wheelDelta || e.detail
		const { scale, scaleStep, minScale, maxScale, x, y } = currentInfoRef.current.imageInfo
		let newScale = scale * (1 + (wd > 0 ? scaleStep : -scaleStep))
		newScale = newScale < minScale ? minScale : newScale
		newScale = newScale > maxScale ? maxScale : newScale
		if (newScale !== scale) {
			let p = calculateChange(e, currentInfoRef.current.nodes.canvas)
			let newX = ((x - p.x) * newScale) / scale + p.x
			let newY = ((y - p.y) * newScale) / scale + p.y
			currentInfoRef.current.imageInfo.scale = newScale
			setXY(newX, newY)
		}
		ReplaceAnnotateShow()
		DrawSavedAnnotateInfoToShow()
	}

	//----计算更新鼠标相对容器的位置
	const calculateChange = (e: any, container: any, skip?: any) => {
		!skip && e.preventDefault()
		const containerWidth = container.clientWidth
		const containerHeight = container.clientHeight
		const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
		const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
		let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
		let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

		if (left < 0) {
			left = 0
		} else if (left > containerWidth) {
			left = containerWidth
		}

		if (top < 0) {
			top = 0
		} else if (top > containerHeight) {
			top = containerHeight
		}

		return {
			x: left,
			y: top
		}
	}

	//----按缩放程度修改数据存储面板数据（坐标点转换过程）
	const ReplaceAnnotateMemory = () => {
		const labelResultList = cloneDeep(currentInfoRef.current.labelResultList)
		const { x, y, scale } = currentInfoRef.current.imageInfo
		currentInfoRef.current.imageAnnotateMemory = labelResultList.map((item: any) => {
			let content: any = []
			item.content.forEach((contents: any) => {
				content.push({
					x: (contents.x - x) / scale,
					y: (contents.y - y) / scale
				})
			})
			let rectMask = {
				xMin: (item.rectMask.xMin - x) / scale,
				yMin: (item.rectMask.yMin - y) / scale,
				width: item.rectMask.width / scale,
				height: item.rectMask.height / scale
			}
			return {
				...item,
				content,
				rectMask
			}
		})
	}

	//----按缩放程度修改数据展示面板数据（坐标点转换过程）
	const ReplaceAnnotateShow = () => {
		const labelResultList = currentInfoRef.current.imageAnnotateMemory
		const { x, y, scale } = currentInfoRef.current.imageInfo
		currentInfoRef.current.labelResultList = labelResultList.map((item: any) => {
			const content: any = []
			item.content.forEach((contents: any) => {
				content.push({
					x: contents.x * scale + x,
					y: contents.y * scale + y
				})
			})
			let rectMask = {
				xMin: item.rectMask.xMin * scale + x,
				yMin: item.rectMask.yMin * scale + y,
				width: item.rectMask.width * scale,
				height: item.rectMask.height * scale
			}
			return {
				...item,
				content,
				rectMask
			}
		})
		// setLabelResultList(currentInfoRef.current.labelResultList)
	}

	return (
		<div className="canvas-box">
			<LeftSideTool imageAnnotateMemory={() => currentInfoRef.current.imageAnnotateMemory} />
			<div className="canvas-content-box">
				<canvas id="canvas"></canvas>
			</div>
			<RightSideTool />
		</div>
	)
}
