/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-15 16:01:16
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-25 15:55:27
 */

import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import 'echarts/extension/bmap/bmap'
import { ASYNC_SUBSCRIBE_TOPIC_DRAW } from '../const'
import ld from '@/assets/images/szyj/ld.png'
import lda from '@/assets/images/szyj/lda.png'
import ldb from '@/assets/images/szyj/ldb.png'
import ldh from '@/assets/images/szyj/ldh.png'
import rh from '@/assets/images/szyj/rh.png'
import sfa from '@/assets/images/szyj/sfa.png'
import RightTopicDraw from './right-topic-draw'
import PubSub from 'pubsub-js'
import xta from '@/assets/images/szyj/xta.png'
import { getYjDefinitionsConfig, getYjDefinitionsSchema } from '@/api/modules/szyj-manage'

const nodes: any = [
	{
		x: 100,
		y: 200,
		nodeName: 'FZTY平台',
		icon: `image://${ldb}`
	},
	{
		x: 100,
		y: 400,
		nodeName: '协同数据算法',
		icon: `image://${sfa}`
	},
	{
		x: 100,
		y: 600,
		nodeName: '回波模型',
		icon: `image://${ldh}`
	},
	{
		x: 100,
		y: 800,
		nodeName: 'JCYJ',
		icon: `image://${ld}`
	},
	// 左侧topic
	{
		x: 200,
		y: 800,
		nodeName: 'topic',
		symbolSize: 10
	},
	{
		x: 200,
		y: 600,
		nodeName: 'topic',
		symbolSize: 10
	},
	{
		x: 200,
		y: 400,
		nodeName: 'topic',
		symbolSize: 10
	},
	{
		x: 200,
		y: 200,
		nodeName: 'topic',
		symbolSize: 10
	},
	// 中间
	{
		x: 400,
		y: 500,
		nodeName: 'LDYJ',
		icon: `image://${lda}`
	},
	// 右侧topic
	{
		x: 600,
		y: 700,
		nodeName: 'topic',
		symbolSize: 10
	},
	{
		x: 600,
		y: 500,
		nodeName: 'topic',
		symbolSize: 10
	},
	{
		x: 600,
		y: 300,
		nodeName: 'topic',
		symbolSize: 10
	},
	// 右边
	{
		x: 700,
		y: 300,
		nodeName: '回波模型',
		icon: `image://${ldh}`
	},
	{
		x: 700,
		y: 500,
		nodeName: '多源感知融合YJ',
		icon: `image://${rh}`
	},
	{
		x: 700,
		y: 700,
		nodeName: '协同数据算法',
		icon: `image://${xta}`
	}
]
const charts: any = {
	nodes: [],
	linesData: [
		{
			coords: [
				[100, 200],
				[300, 200],
				[300, 500],
				[400, 500]
			]
		},
		{
			coords: [
				[100, 400],
				[300, 400],
				[300, 500],
				[400, 500]
			]
		},
		{
			coords: [
				[100, 600],
				[300, 600],
				[300, 500],
				[400, 500]
			]
		},
		{
			coords: [
				[100, 800],
				[300, 800],
				[300, 500],
				[400, 500]
			]
		},
		{
			coords: [
				[400, 500],
				[500, 500],
				[500, 700],
				[700, 700]
			]
		},
		{
			coords: [
				[400, 500],
				[500, 500],
				[700, 500]
			]
		},
		{
			coords: [
				[400, 500],
				[500, 500],
				[500, 300],
				[700, 300]
			]
		}
	]
}
for (let j = 0; j < nodes.length; j++) {
	const { x, y, nodeName, svgPath, icon, symbolSize } = nodes[j]
	svgPath
	let node = {
		nodeName,
		value: [x, y],
		symbolSize: symbolSize || 50,
		symbol: icon,
		itemStyle: {
			color: '#000000'
		}
	}
	charts.nodes.push(node)
}
const formatterHover = (params: any) => {
	let currData = params.data
	console.log('formatterHover', params)
	console.log('currData', currData)
	if (params.dataType === 'node') {
		if (currData.nodeName === 'topic') {
			PubSub.publish(ASYNC_SUBSCRIBE_TOPIC_DRAW)
		}
		//鼠标到节点
		return currData.nodeName
	} else {
		//鼠标到线条
		return currData.nodeName
	}
}

const Demo = () => {
	useEffect(() => {
		getYjCommConfig({ levelId: 10 })
		getYjCommSchema({ levelId: 10 })
	}, [])
	// 获取YJ通信配置信息
	const getYjCommConfig = (levelId: any) => {
		getYjDefinitionsConfig(levelId).then((res: any) => {
			const data = res || {}
			console.log(data)
		})
	}
	// 获取topic信息
	const getYjCommSchema = (levelId: any) => {
		getYjDefinitionsSchema(levelId).then((res: any) => {
			const data = res || {}
			console.log(data)
		})
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
			<RightTopicDraw />
		</>
	)
}

export default Demo
