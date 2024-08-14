/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-25 15:59:54
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-05 15:49:48
 */

import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { ASYNC_SUBSCRIBE_TOPIC_DRAW } from '../const'
import ldh from '@/assets/images/szyj/ldh.png'
import RightTopicDraw from './right-topic-draw'
import PubSub from 'pubsub-js'
import { useState } from 'react'

const YjCombination = (props: any) => {
	const { currentData = [], inData = [], outData = [], schemaData } = props
	const [topics, setTopics] = useState([])

	const formatterHover = (params: any) => {
		let currData = params.data
		const topics = currData?.topic || []
		if (params.dataType === 'node') {
			if (currData.nodeName === 'topic') {
				setTopics(topics)
				PubSub.publish(ASYNC_SUBSCRIBE_TOPIC_DRAW)
			}
			//鼠标到节点
			return currData.nodeName
		} else {
			setTopics(topics)
			//鼠标到线条
			PubSub.publish(ASYNC_SUBSCRIBE_TOPIC_DRAW)
		}
	}

	const charts: any = {
		nodes: [],
		linesData: [
			{
				coords: [
					[200, 200],
					[200, 400],
					[200, 600],
					[200, 800],
					[200, 1000]
				]
			}
		]
	}
	// 当前yj
	const currentDataNew: any = (currentData || []).map((element: any) => {
		return { ...element, y: 500, x: 500 }
	})
	// 输出yj
	const outDataNew = outData.map((element: any, index: any) => {
		if (index == parseInt((outData.length / 2).toString())) {
			return { ...element, x: 800, y: 500 }
		}
		if (index < parseInt((outData.length / 2).toString())) {
			return { ...element, x: 800, y: 100 + index * 100 }
		}
		return { ...element, x: 800, y: 900 - index * 100 }
	})
	// 输入yj
	const inDataNew: any = inData.map((element: any, index: any) => {
		if (index == parseInt((inData.length / 2).toString())) {
			return { ...element, x: 200, y: 500 }
		}
		if (index < parseInt((inData.length / 2).toString())) {
			return { ...element, x: 200, y: 100 + index * 100 }
		}
		return { ...element, x: 200, y: 900 - index * 100 }
	})
	let newData: any = inDataNew.concat(currentDataNew).concat(outDataNew)
	for (let j = 0; j < newData.length; j++) {
		const { id, x = 100, y = 200, icon, symbolSize } = newData[j]
		let node = {
			nodeName: 'yj' + id,
			value: [x, y],
			symbolSize: symbolSize || 50,
			symbol: icon || `image://${ldh}`,
			itemStyle: {
				color: '#000000'
			}
		}
		charts.nodes.push(node)
	}
	// 匹配当前yj输入输出topic
	const getIntOuttopic = (data: any, cur: any) => {
		let arr: any = []
		cur.map((item: any) => {
			for (let i = 0; i <= cur.length - 1; i++) {
				for (let j = 0; j <= data.length - 1; j++) {
					if (data[j].topic == cur[i].topic) {
						arr.push(item.name)
					}
				}
			}
		})
		return arr
	}
	// 输入画线
	for (let j = 0; j < inDataNew.length; j++) {
		let start: any = []
		const data: any = []
		start.push(inDataNew[j].x)
		start.push(inDataNew[j].y)
		data.push(start)
		let end: any = []
		end.push(currentDataNew[0].x)
		end.push(currentDataNew[0].y)
		data.push(end)
		let topic: any = getIntOuttopic(inDataNew[j].outputs, currentDataNew[0].inputs)
		charts.linesData[j] = {
			topic: topic,
			coords: data
		}
	}
	// 输出画线
	for (let j = 0; j < outDataNew.length; j++) {
		let start: any = []
		const data: any = []
		let end: any = []
		end.push(currentDataNew[0].x)
		end.push(currentDataNew[0].y)
		data.push(end)
		start.push(outDataNew[j].x)
		start.push(outDataNew[j].y)
		data.push(start)
		let topic: any = getIntOuttopic(outDataNew[j].outputs, currentDataNew[0].outputs)
		charts.linesData[j + inDataNew.length] = {
			topic: topic,
			coords: data
		}
	}

	// echarts配置
	let option: echarts.EChartsOption = {
		backgroundColor: '#ffffff',
		tooltip: {
			show: true,
			enterable: true, //鼠标是否可进入提示框浮层中
			formatter: formatterHover //修改鼠标悬停显示的内容
		},
		legend: [
			{
				data: charts.nodes.map((a: any) => {
					return a.nodeName
				})
			}
		],
		xAxis: {
			min: 0,
			max: 1000,
			show: false,
			type: 'value'
		},
		yAxis: {
			min: 0,
			max: 1000,
			show: false,
			type: 'value'
		},
		series: [
			{
				type: 'graph',
				coordinateSystem: 'cartesian2d',
				label: {
					show: true,
					position: 'bottom',
					color: '#000000',
					formatter: (item: any) => {
						return item.data.nodeName
					}
				},
				data: charts.nodes
			},
			{
				type: 'lines',
				polyline: true,
				// label: {
				// 	show: true
				// },
				coordinateSystem: 'cartesian2d',
				lineStyle: {
					type: 'solid',
					width: 1,
					color: '#005DE5',
					curveness: 0.3
				},
				effect: {
					show: true,
					trailLength: 0.1,
					symbol: 'arrow',
					color: '#005DE5',
					symbolSize: 8
				},
				data: charts.linesData
			}
		]
	}

	const [echartsRef]: any = useEcharts(option)
	return (
		<>
			<div id="canvas" className="topology_content" ref={echartsRef}></div>
			<RightTopicDraw schemaData={schemaData || {}} topics={topics} />
		</>
	)
}

export default YjCombination
