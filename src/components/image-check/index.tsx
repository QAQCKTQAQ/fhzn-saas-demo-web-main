// index.js
/**
 * @name ImageCode
 * @desc 滑动拼图验证
 * @author darcrand
 * @version 2019-02-26
 *
 * @param {String} imageUrl 图片的路径
 * @param {Number} imageWidth 展示图片的宽带
 * @param {Number} imageHeight 展示图片的高带
 * @param {Number} fragmentSize 滑动图片的尺寸
 * @param {Function} onReload 当点击'重新验证'时执行的函数
 * @param {Function} onMath 匹配成功时执行的函数
 * @param {Function} onError 匹配失败时执行的函数
 */
import React, { useEffect, useRef, useState } from 'react'

import './index.less'
import { Space } from 'antd'
import { ReloadOutlined, DragOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

const STATUS_LOADING = 0 // 还没有图片
const STATUS_READY = 1 // 图片渲染完成,可以开始滑动
const STATUS_MATCH = 2 // 图片位置匹配成功
const STATUS_ERROR = 3 // 图片位置匹配失败

// 生成裁剪路径
function createClipPath(ctx: any, size = 100, styleIndex = 0) {
	const styles = [
		[0, 0, 0, 0],
		[0, 0, 0, 1],
		[0, 0, 1, 0],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
		[0, 1, 0, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 1],
		[1, 0, 0, 0],
		[1, 0, 0, 1],
		[1, 0, 1, 0],
		[1, 0, 1, 1],
		[1, 1, 0, 0],
		[1, 1, 0, 1],
		[1, 1, 1, 0],
		[1, 1, 1, 1]
	]
	const style = styles[styleIndex]

	const r = 0.1 * size
	ctx.save()
	ctx.beginPath()
	// left
	ctx.moveTo(r, r)
	ctx.lineTo(r, 0.5 * size - r)
	ctx.arc(r, 0.5 * size, r, 1.5 * Math.PI, 0.5 * Math.PI, style[0])
	ctx.lineTo(r, size - r)
	// bottom
	ctx.lineTo(0.5 * size - r, size - r)
	ctx.arc(0.5 * size, size - r, r, Math.PI, 0, style[1])
	ctx.lineTo(size - r, size - r)
	// right
	ctx.lineTo(size - r, 0.5 * size + r)
	ctx.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, style[2])
	ctx.lineTo(size - r, r)
	// top
	ctx.lineTo(0.5 * size + r, r)
	ctx.arc(0.5 * size, r, r, 0, Math.PI, style[3])
	ctx.lineTo(r, r)

	ctx.clip()
	ctx.closePath()
}

const ImageCode = (props: any) => {
	const {
		imageUrl = '',
		imageWidth = 408,
		imageHeight = 204,
		fragmentSize = 40,
		onReloadCallBack = () => {},
		onMatch = () => {},
		onError = () => {}
	} = props

	const canvasRef: any = useRef({
		shadowCanvas: null,
		fragmentCanvas: null
	})

	const [isMovable, setIsMovable] = useState(false)
	const [offsetX, setOffsetX] = useState(0)
	const [offsetY, setOffsetY] = useState(0)
	const [startX, setStartX] = useState(0)
	const [oldX, setOldX] = useState(0)
	const [currX, setCurrX] = useState(0)
	const [status, setStatus] = useState(STATUS_LOADING)

	useEffect(() => {
		renderImage()
		onReloadCallBack('reset')
	}, [imageUrl])

	const renderImage = () => {
		// 初始化状态
		onReload()

		// 创建一个图片对象，主要用于canvas.context.drawImage()
		const objImage = new Image()

		objImage.addEventListener('load', () => {
			// 先获取两个ctx
			const ctxShadow = canvasRef.current.shadowCanvas.getContext('2d')
			const ctxFragment = canvasRef.current.fragmentCanvas.getContext('2d')

			// 让两个ctx拥有同样的裁剪路径(可滑动小块的轮廓)
			const styleIndex = Math.floor(Math.random() * 16)
			createClipPath(ctxShadow, fragmentSize, styleIndex)
			createClipPath(ctxFragment, fragmentSize, styleIndex)

			// 随机生成裁剪图片的开始坐标
			const clipX = Math.floor(fragmentSize + (imageWidth - 2 * fragmentSize) * Math.random())
			const clipY = Math.floor((imageHeight - fragmentSize) * Math.random())

			// 让小块绘制出被裁剪的部分
			ctxFragment.drawImage(objImage, clipX, clipY, fragmentSize, fragmentSize, 0, 0, fragmentSize, fragmentSize)

			// 让阴影canvas带上阴影效果
			ctxShadow.fillStyle = 'rgba(255, 255, 255, 0.8)'
			ctxShadow.fill()

			// 恢复画布状态
			ctxShadow.restore()
			ctxFragment.restore()

			// 设置裁剪小块的位置
			setOffsetX(clipX)
			setOffsetY(clipY)
			// 修改状态
			setStatus(STATUS_READY)
		})
		objImage.src = imageUrl
	}

	const onMoveStart = (e: any) => {
		if (status !== STATUS_READY) {
			return
		}
		// 记录滑动开始时的绝对坐标x
		setIsMovable(true)
		setStartX(e.clientX)
	}

	const onMoving = (e: any) => {
		if (status !== STATUS_READY || !isMovable) {
			return
		}
		const distance = e.clientX - startX
		let currX = oldX + distance

		const minX = 0
		const maxX = imageWidth - fragmentSize
		currX = currX < minX ? 0 : currX > maxX ? maxX : currX
		setCurrX(currX)
	}

	const onMoveEnd = () => {
		if (status !== STATUS_READY || !isMovable) {
			return
		}

		// 将旧的固定坐标x更新
		setIsMovable(false)
		setOldX((pre: any) => pre.currX)

		const isMatch = Math.abs(currX - offsetX) < 5
		if (isMatch) {
			setStatus(STATUS_MATCH)
			setOffsetX((pre: any) => pre.offsetX)
			onMatch(STATUS_MATCH)
		} else {
			setStatus(STATUS_ERROR)
			onReset()
			onError()
		}
	}

	const onReset = () => {
		const timer = setTimeout(() => {
			setOldX(0)
			setCurrX(0)
			setStatus(STATUS_READY)
			clearTimeout(timer)
		}, 1000)
	}

	const onReload = () => {
		if (status !== STATUS_READY && status !== STATUS_MATCH) {
			return
		}
		const ctxShadow = canvasRef.current.shadowCanvas.getContext('2d')
		const ctxFragment = canvasRef.current.fragmentCanvas.getContext('2d')

		// 清空画布
		ctxShadow.clearRect(0, 0, fragmentSize, fragmentSize)
		ctxFragment.clearRect(0, 0, fragmentSize, fragmentSize)
		setIsMovable(false)
		setOffsetX(0)
		setOffsetY(0)
		setStartX(0)
		setOldX(0)
		setCurrX(0)
		setStatus(STATUS_LOADING)
	}

	const renderStatus = () => {
		if (status === STATUS_MATCH) {
			return <CheckOutlined className="match" />
		}
		if (status === STATUS_ERROR) {
			return <CloseOutlined className="error" />
		}
		return <DragOutlined />
	}

	return (
		<div className="check-image-code" style={{ width: imageWidth }}>
			<div className="check-image-container" style={{ height: imageHeight, backgroundImage: `url("${imageUrl}")` }}>
				<canvas
					ref={ref => (canvasRef.current.shadowCanvas = ref)}
					className="canvas"
					width={fragmentSize}
					height={fragmentSize}
					style={{ left: offsetX + 'px', top: offsetY + 'px' }}
				/>
				<canvas
					ref={ref => (canvasRef.current.fragmentCanvas = ref)}
					className="canvas"
					width={fragmentSize}
					height={fragmentSize}
					style={{ top: offsetY + 'px', left: currX + 'px' }}
				/>
			</div>

			<div
				className="reload-wrapper"
				onClick={() => {
					onReload()
					onReloadCallBack()
				}}
			>
				<Space>
					<ReloadOutlined /> 刷新验证
				</Space>
			</div>

			<div className="slider-wrpper" onMouseMove={onMoving} onMouseLeave={onMoveEnd}>
				<div className="slider-bar">按住滑块，拖动完成拼图</div>
				<div className="slider-button" onMouseDown={onMoveStart} onMouseUp={onMoveEnd} style={{ left: currX + 'px' }}>
					{renderStatus()}
				</div>
			</div>
		</div>
	)
}

export default ImageCode
