// 方向天线
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function AntennaDirection() {
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat()
	}, [])

	const data: any = []
	for (let i = 0; i <= 360; i++) {
		let t = (i / 180) * Math.PI
		let r = Math.sin(2 * t) * Math.cos(2 * t)
		data.push([r, i])
	}

	const drawChat = () => {
		const option = {
			polar: {
				center: ['50%', '50%']
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},
			angleAxis: {
				type: 'value',
				startAngle: 0
			},
			radiusAxis: {
				min: 0
			},
			series: [
				{
					coordinateSystem: 'polar',
					name: 'line',
					type: 'line',
					showSymbol: false,
					data: data
				}
			],
			animationDuration: 2000
		}

		option && chartRef.current.setOption(option)
	}

	return <div className="antenna-direction-canvas box" ref={echartsRef}></div>
}
