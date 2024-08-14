/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-06 18:05:36
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-08 20:01:54
 */
// 折线图
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import './bxjb-chart.less'

export default function BXJBChart(props: any) {
	const { data, xname = '', yname = '' } = props
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat(data)
	}, [data])

	const isTwoArray = (data: any) => {
		return data.every((items: any) => {
			return Array.isArray(items)
		})
	}

	const drawChat = (data: any) => {
		const xAxisData = isTwoArray(data)
			? data[0].map((item: any, index: number) => {
					return index + 1
			  })
			: data.map((item: any, index: number) => {
					return index + 1
			  })

		const series: any = isTwoArray(data)
			? data.map((item: any) => {
					return {
						data: item || [],
						type: 'line'
					}
			  })
			: [
					{
						data: data,
						type: 'line'
					}
			  ]
		const option = {
			xAxis: {
				data: xAxisData,
				name: xname || '',
				nameLocation: 'end',
				nameTextStyle: {
					fontSize: '10'
				}
			},
			yAxis: {
				name: yname || '',
				nameLocation: 'end'
			},
			series
		}

		option && chartRef.current.setOption(option)
	}

	return <div className="bxjb-chart-canvas" ref={echartsRef}></div>
}
