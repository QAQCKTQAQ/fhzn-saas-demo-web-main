import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'
// import { createNoise2D } from 'simplex-noise'

export default function Doppler() {
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat()
	}, [])
	// const noise2D = createNoise2D()
	let valMin = Infinity
	let valMax = -Infinity
	const generateData = () => {
		const data = []
		for (let i = 0; i <= 50; i++) {
			for (let j = 0; j <= 50; j++) {
				let value: any = Math.random() * 10
				valMax = Math.max(valMax, value)
				valMin = Math.min(valMin, value)
				data.push([i, j, value * 2 + 4])
			}
		}
		return data
	}
	let data = generateData()

	const drawChat = () => {
		const option = {
			visualMap: {
				show: false,
				min: 0,
				max: 10,
				inRange: {
					color: [
						'#313695',
						'#4575b4',
						'#74add1',
						'#abd9e9',
						'#e0f3f8',
						'#ffffbf',
						'#fee090',
						'#fdae61',
						'#f46d43',
						'#d73027',
						'#a50026'
					]
				}
			},
			xAxis3D: {
				type: 'value'
			},
			yAxis3D: {
				type: 'value'
			},
			zAxis3D: {
				type: 'value'
			},
			grid3D: {
				axisLine: {
					lineStyle: { color: '#fff' }
				},
				axisPointer: {
					lineStyle: { color: '#fff' }
				},
				viewControl: {
					// autoRotate: true
				},
				light: {
					main: {
						shadow: true,
						quality: 'ultra',
						intensity: 1.5
					}
				}
			},
			series: [
				{
					type: 'surface',
					data: data,
					shading: 'lambert',
					label: {
						formatter: function (param: any) {
							return param.value[2].toFixed(1)
						}
					}
				}
			]
		}

		option && chartRef.current.setOption(option)
	}

	return (
		<div className="sar-box box">
			<div className="inner-content-box">
				<div className="title-box">
					<div className="title">RD图</div>
				</div>
				<div className="sar-img-box sar-img-box-doppler">
					<div className="doppler-info-canvas" ref={echartsRef}></div>
				</div>
			</div>
		</div>
	)
}
