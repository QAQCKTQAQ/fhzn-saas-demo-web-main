import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function InputInfo() {
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat()
	}, [])

	const drawChat = () => {
		let base = +new Date(1988, 9, 3)
		let oneDay = 24 * 3600 * 1000
		let data = [[base, Math.random() * 300]]
		for (let i = 1; i < 20000; i++) {
			let now = new Date((base += oneDay))
			data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
		}
		const option = {
			xAxis: {
				type: 'time',
				boundaryGap: false
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				max: 2000, //设置最大值
				min: -2000
			},
			dataZoom: [
				{
					type: 'inside'
					// start: 0,
					// end: 20
				},
				{
					// start: 0,
					// end: 20
				}
			],
			series: [
				{
					name: 'Fake Data',
					type: 'line',
					smooth: true,
					symbol: 'none',
					areaStyle: {},
					data: data
				}
			]
		}

		option && chartRef.current.setOption(option)
	}

	return <div className="input-info-canvas" ref={echartsRef}></div>
}
