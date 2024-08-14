// 散点图
import { useEcharts } from '@/hooks/useEcharts'
import { useEffect, useState } from 'react'

export default function Scatter(props: any) {
	const [data, setData] = useState([])
	const { xyData } = props

	useEffect(() => {
		setData(xyData)
	}, [xyData])

	const option = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			left: '8%',
			right: '8%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			name: '时间戳',
			data: xyData?.times || []
		},
		yAxis: {
			name: '信噪比'
		},
		series: [
			{
				type: 'line',
				data: xyData?.xinzaobis || []
			}
		]
	}
	const [echartsRef]: any = useEcharts(option, data)
	return <div className="canvas-scatter" ref={echartsRef}></div>
}
