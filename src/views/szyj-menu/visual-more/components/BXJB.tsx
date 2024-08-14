/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-04 16:25:55
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-29 15:31:12
 */
// import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function generateData(count: number) {
	let baseValue = Math.random() * 1000
	let time = +new Date(2023, 0, 1)
	let smallBaseValue: number

	function next(idx: number) {
		smallBaseValue = idx % 30 === 0 ? Math.random() * 700 : smallBaseValue + Math.random() * 500 - 250
		baseValue += Math.random() * 20 - 10
		return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000)
	}

	const categoryData = []
	const valueData = []

	for (let i = 0; i < count; i++) {
		categoryData.push(echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false))
		valueData.push(next(i).toFixed(2))
		time += 1000
	}

	return {
		categoryData: categoryData,
		valueData: valueData
	}
}

const dataCount = 5e5
const data = generateData(dataCount)

export default function BXJB() {
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		DrawBXJB()
	}, [])

	const DrawBXJB = () => {
		let option: echarts.EChartsOption = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				bottom: 90
			},
			dataZoom: [
				{
					type: 'inside'
				},
				{
					type: 'slider'
				}
			],
			xAxis: {
				show: true,
				data: data.categoryData,
				silent: false,
				splitLine: {
					show: false
				},
				splitArea: {
					show: false
				}
			},
			yAxis: {
				splitArea: {
					show: false
				}
			},
			series: [
				{
					type: 'bar',
					data: data.valueData,
					// Set `large` for large data amount
					large: true
				}
			]
		}
		option && chartRef.current.setOption(option)
	}
	return <div ref={echartsRef} className="BXJB-info-canvas"></div>
}
