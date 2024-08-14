/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-17 18:20:09
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-14 11:15:55
 */
// import { Viewer, PointPrimitiveCollection, PointPrimitive, Scene } from 'resium'
import { Cartesian3 } from 'cesium'
// import { Cartesian3 } from 'cesium'
import './index.less'
import * as Cesium from 'cesium'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/logo.png'
import { ASYNC_SUBSCRIBE_BOX_DATA } from '../../const'
import { Button } from 'antd'
import { ImageryProvider } from 'cesium'

const position = Cartesian3.fromDegrees(30.2741, 120.1552, 0)
position
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90)
Cesium.Ion.defaultAccessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZTFiNTdhNC04YzBkLTRmODgtODFlYi1iOTgwZDE2MzdjNWYiLCJpZCI6MTcwNTgwLCJpYXQiOjE2OTY3NDc0OTJ9.46qQY7r48IfKh6OgNNzcPC5iXEpQDZzu-di0Cp681pw'
let options: any = {
	name: '',
	show: true,
	position: Cesium.Cartesian3.fromDegrees(120.3, 35.9, 0),
	point: {
		// 点的大小（像素）
		pixelSize: 8,
		// 点位颜色，fromCssColorString 可以直接使用CSS颜色
		color: Cesium.Color.fromCssColorString('#ee0000'),
		// 边框颜色
		// 边框宽度(像素)
		outlineWidth: 4,
		// 是否显示
		show: true,
		material: `${logo}`,
		outlineColor: Cesium.Color.ORANGE,
		HeightReference: Cesium.HeightReference.CLAMP_TO_GROUND
	},
	description: `
		<p>这是entity的属性信息，entity的description里面可以写一段html</p>`
}
function EarthMap(props: any) {
	const { dataListMap } = props
	const CesiumRef: any = useRef()
	const [rectangleExist, setRectangleExist] = useState<any>(false)
	useEffect(() => {
		CesiumRef.current = new Cesium.Viewer('cesiumContainer', {
			animation: false, //隐藏掉时钟
			timeline: false, // 隐藏实时间轴
			baseLayerPicker: false, // 图层选择器
			fullscreenButton: false, // 隐藏全屏按钮
			geocoder: false, // 隐藏搜索按钮
			homeButton: false, // 隐藏home按钮
			navigationHelpButton: false, // 隐藏帮助按钮
			sceneModePicker: false, // 控制查看器的显示模式3d或平面
			creditContainer: document.createElement('div') //隐藏logo
		})
		// 默认请求本地资源，不需要的话直接注释
		CesiumRef.current.imageryLayers.addImageryProvider(
			new Cesium.UrlTemplateImageryProvider({
				url: '../../../../../../../public/source/tile/{z}/{x}/{y}.png'
			})
		)
		drawRectanglePoint()
	}, [])
	useEffect(() => {
		const viewer: any = CesiumRef.current
		viewer.entities.removeAll()
		if (dataListMap?.length) {
			const entity: any = dataListMap.map((items: any) => {
				let en: any = creatPoint(items.lon, items.lat, items.fileCode)
				viewer.entities.add(en)
			})
		} else {
			viewer.entities.removeAll()
		}
	}, [dataListMap])
	// 画点
	const creatPoint = (lan: any, lat: any, fileCode: any) => {
		const entity: any = new Cesium.Entity({
			...options,
			description: `<p>经度${lan}-纬度${lat}</p><img width="450" height="200" src='/api/bff/download?fileCode=${fileCode}'></img>`,
			position: new Cesium.CallbackProperty(function () {
				return Cesium.Cartesian3.fromDegrees(lan, lat, 0)
			}, false)
		})
		return entity
	}

	// 鼠标画框
	const drawRectanglePoint = () => {
		const viewer: any = CesiumRef.current
		//cesium默认右键为放大缩小，此处给zoomEventTypes设置新值
		viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK]
		//earthsdk默认右键为改变视角，此处禁止。
		viewer.scene.screenSpaceCameraController.lookEventTypes = []
		let flag = false
		//起点终点x,y
		let startX: string | number | null = null
		let startY: string | number | null = null
		let endX = null
		let endY = null
		//创建框选元素
		let selDiv: any = document.createElement('div')
		let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
		//右键按下事件，设置起点，div设置样式和位置，添加到页面
		handler.setInputAction(function (event: { position: { x: any; y: any } }) {
			flag = true
			startX = event.position.x
			startY = event.position.y
			selDiv.style.cssText =
				'position:absolute;width:0;height:0;font-size:0;margin:0;padding:0;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;'
			selDiv.id = 'selectDiv'
			selDiv.style.left = Number(startX) + 'px'
			selDiv.style.top = Number(startY) + 'px'
			document?.getElementById('cesiumContainer')?.appendChild(selDiv)
		}, Cesium.ScreenSpaceEventType.RIGHT_DOWN)
		//鼠标抬起事件，获取div左上和右下的x,y 转为经纬度坐标
		handler.setInputAction(function (event: any) {
			flag = false
			let l = parseInt(selDiv.style.left)
			let t = parseInt(selDiv.style.top)
			let w = parseInt(selDiv.style.width)
			let h = parseInt(selDiv.style.height)
			let earthPosition: any = viewer.camera.pickEllipsoid(
				{
					x: l,
					y: t,
					clone: function (result?: Cesium.Cartesian2 | undefined): Cesium.Cartesian2 {
						throw new Error('Function not implemented.')
					},
					equals: function (right?: Cesium.Cartesian2 | undefined): boolean {
						throw new Error('Function not implemented.')
					},
					equalsEpsilon: function (
						right?: Cesium.Cartesian2 | undefined,
						relativeEpsilon?: number | undefined,
						absoluteEpsilon?: number | undefined
					): boolean {
						throw new Error('Function not implemented.')
					}
				},
				viewer.scene.globe.ellipsoid
			)
			// WGS84弧度制的经纬度坐标
			let cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic())
			console.log('左上坐标为：' + [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)])
			let topLeft: any = { lon: Cesium.Math.toDegrees(cartographic.longitude), lat: Cesium.Math.toDegrees(cartographic.latitude) }
			earthPosition = viewer.camera.pickEllipsoid(
				{
					x: l + w,
					y: t + h,
					clone: function (result?: Cesium.Cartesian2 | undefined): Cesium.Cartesian2 {
						throw new Error('Function not implemented.')
					},
					equals: function (right?: Cesium.Cartesian2 | undefined): boolean {
						throw new Error('Function not implemented.')
					},
					equalsEpsilon: function (
						right?: Cesium.Cartesian2 | undefined,
						relativeEpsilon?: number | undefined,
						absoluteEpsilon?: number | undefined
					): boolean {
						throw new Error('Function not implemented.')
					}
				},
				viewer.scene.globe.ellipsoid
			)
			cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic())
			console.log('右下坐标为：' + [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)])
			let bottomRight: any = {
				lon: Cesium.Math.toDegrees(cartographic.longitude),
				lat: Cesium.Math.toDegrees(cartographic.latitude)
			}
			if (Cesium.Math.toDegrees(cartographic.longitude) && Cesium.Math.toDegrees(cartographic.longitude)) {
				// 存在框选行为调用接口
				PubSub.publish(ASYNC_SUBSCRIBE_BOX_DATA, {
					box: {
						topLeft: topLeft,
						bottomRight: bottomRight
					}
				})
			}
			setRectangleExist(true)
		}, Cesium.ScreenSpaceEventType.RIGHT_UP)
		//鼠标移动事件，处理位置css
		handler.setInputAction(function (event: { endPosition: { x: any; y: any } }) {
			if (flag) {
				endX = event.endPosition.x
				endY = event.endPosition.y
				selDiv.style.left = Math.min(endX, Number(startX)) + 'px'
				selDiv.style.top = Math.min(endY, Number(startY)) + 'px'
				selDiv.style.width = Math.abs(endX - Number(startX)) + 'px'
				selDiv.style.height = Math.abs(endY - Number(startY)) + 'px'
			}
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
	}
	const cancleRectanglePoint = () => {
		//删除框选div
		document?.getElementById('selectDiv')?.parentNode?.removeChild(document?.getElementById('selectDiv') as HTMLElement)
		// 存在框选行为调用接口
		PubSub.publish(ASYNC_SUBSCRIBE_BOX_DATA, {
			box: null
		})
		setRectangleExist(false)
	}

	return (
		<div className="list-box">
			<div className="content-box-earth">
				<div id="cesiumContainer" className="cesiumContainer"></div>
				{rectangleExist && (
					<Button
						type="primary"
						style={{ position: 'absolute', top: '10px', right: '24px' }}
						onClick={() => {
							cancleRectanglePoint()
						}}
					>
						取消框选
					</Button>
				)}
			</div>
		</div>
	)
}

export default EarthMap
