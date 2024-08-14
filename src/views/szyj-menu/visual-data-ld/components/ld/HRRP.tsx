/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 10:03:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-19 15:12:44
 */
// 一维距离像
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function HRRP(props: any) {
	let { data } = props
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat()
	}, [])

	const func = () => {
		const a = []
		for (let i = 0; i < 200; i++) {
			a.push(Math.random() * 20)
		}
		return a
	}

	// mock数据
	const generateData = () => {
		data = func()
		let dataNew = []
		let space: any = Number((200 / data.length).toFixed(2))
		for (let i = 0; i <= data.length; i += 1) {
			dataNew.push([i * space + space, data[i]])
		}
		return dataNew
	}

	const drawChat = () => {
		const option = {
			animation: false,
			grid: {
				top: 40,
				left: 50,
				right: 40,
				bottom: 50
			},
			xAxis: {
				name: '点数',
				minorTick: {
					show: false
				},
				minorSplitLine: {
					show: false
				},
				max: 200
			},
			yAxis: {
				tooltip: {
					show: true
				},
				name: 'dBm²',
				interval: 1,
				minorTick: {
					show: true
				},
				minorSplitLine: {
					show: true
				}
			},
			dataZoom: [
				{
					show: true,
					type: 'inside',
					filterMode: 'none',
					xAxisIndex: [0]
				},
				{
					show: true,
					type: 'inside',
					filterMode: 'none',
					yAxisIndex: [0]
				}
			],
			series: [
				{
					type: 'line',
					showSymbol: false,
					clip: true,
					data: generateData() || []
				}
			]
		}

		option && chartRef.current.setOption(option)
	}

	return <div className="HRRP-info-canvas" ref={echartsRef}></div>
}
