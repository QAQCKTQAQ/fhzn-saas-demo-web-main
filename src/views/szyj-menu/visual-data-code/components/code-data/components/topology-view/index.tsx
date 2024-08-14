/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-15 16:01:16
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-11 12:08:18
 */

import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import 'echarts/extension/bmap/bmap'
// import ld from '@/assets/images/szyj/ld.png'
import lda from '@/assets/images/szyj/lda.png'
import ldb from '@/assets/images/szyj/ldb.png'
import ldh from '@/assets/images/szyj/ldh.png'
import rh from '@/assets/images/szyj/rh.png'
import sfa from '@/assets/images/szyj/sfa.png'
import xta from '@/assets/images/szyj/xta.png'
import './index.less'
const nodes: any = [
	{
		x: 10,
		y: 100,
		nodeName: 'FZTY平台',
		icon: `image://${ldb}`
	},
	{
		x: 10,
		y: 400,
		nodeName: 'XT算法',
		icon: `image://${sfa}`
	},
	{
		x: 10,
		y: 700,
		nodeName: '回波模型',
		icon: `image://${ldh}`
	},
	{
		x: 10,
		y: 1000,
		nodeName: 'JCYJ',
		icon: `image://${ldb}`
	},
	// 左侧topic
	// {
	// 	x: 200,
	// 	y: 800,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// {
	// 	x: 200,
	// 	y: 600,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// {
	// 	x: 200,
	// 	y: 400,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// {
	// 	x: 200,
	// 	y: 200,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// 中间
	{
		x: 400,
		y: 550,
		nodeName: 'LDYJ',
		icon: `image://${lda}`
	},
	// 右侧topic
	// {
	// 	x: 600,
	// 	y: 700,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// {
	// 	x: 600,
	// 	y: 500,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// {
	// 	x: 600,
	// 	y: 300,
	// 	nodeName: 'topic',
	// 	symbolSize: 10
	// },
	// 右边
	{
		x: 700,
		y: 200,
		nodeName: '回波模型',
		icon: `image://${ldh}`
	},
	{
		x: 700,
		y: 550,
		nodeName: '多源感知融合YJ',
		icon: `image://${rh}`
	},
	{
		x: 700,
		y: 800,
		nodeName: 'XT算法',
		icon: `image://${xta}`
	}
]
const charts: any = {
	nodes: [],
	linesData: [
		{
			coords: [
				[10, 100],
				[300, 100],
				[300, 550],
				[400, 550]
			]
		},
		{
			coords: [
				[10, 400],
				[300, 400],
				[300, 550],
				[400, 550]
			]
		},
		{
			coords: [
				[10, 700],
				[300, 700],
				[300, 550],
				[400, 550]
			]
		},
		{
			coords: [
				[10, 1000],
				[300, 1000],
				[300, 550],
				[400, 550]
			]
		},
		{
			coords: [
				[400, 550],
				[500, 550],
				[500, 800],
				[700, 800]
			]
		},
		{
			coords: [
				[400, 550],
				[500, 550],
				[700, 550]
			]
		},
		{
			coords: [
				[400, 550],
				[500, 550],
				[500, 200],
				[700, 200]
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
		symbolSize: symbolSize || 20,
		symbol: icon,
		itemStyle: {
			color: '#FFFFFF',
			fontSize: '8px'
		}
	}
	charts.nodes.push(node)
}
const formatterHover = (params: any) => {
	let currData = params.data
	console.log('formatterHover', params)
	console.log('currData', currData)
	if (params.dataType === 'node') {
		//鼠标到节点
		return currData.nodeName
	} else {
		//鼠标到线条
		return currData.nodeName
	}
}

const TopologyView = () => {
	useEffect(() => {}, [])
	// 获取YJ通信配置信息

	// echarts配置
	let option: echarts.EChartsOption = {
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
		</>
	)
}

export default TopologyView
