/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-12 15:46:38
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-26 17:29:55
 */

import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import 'echarts/extension/bmap/bmap'
// import { TOPOLOGY_DRAWER_KEY } from '../../const'
import leida from '@/assets/images/tpt/leida.png'
import guangxue from '@/assets/images/tpt/guangxue.png'
import suanfa from '@/assets/images/tpt/suanfa.png'
import juece from '@/assets/images/tpt/juece.png'
import kongzhizhongxin from '@/assets/images/tpt/kongzhizhongxin.png'
import './index.less'
import taishiganzhi from '@/assets/images/tpt/taishiganzhi2.png'
// import { treeData } from '@/views/szyj-menu/visual-data/components/code-data/const'
// import PubSub from 'pubsub-js'
import dd from '@/assets/images/tpt/dd.png'
import { useTranslation } from 'react-i18next'

const codeToIntegratedSchedulingKeys = '19-41-42-43-44-45-46-48-50-51-52-53-55-57'

const integratedSchedulingToCodeKeys = '17-28-29-30-31-32-33-35-37-38-39-40-54-56'

const nodes: any = [
	{
		x: 10,
		y: 300,
		nodeName: 'LD样机',
		icon: `image://${leida}`,
		symbolSize: 40
	},
	{
		x: 10,
		y: 900,
		nodeName: 'GXYJ',
		icon: `image://${guangxue}`,
		symbolSize: 40
	},
	// 中间
	{
		x: 500,
		y: 605,
		nodeName: 'GZDD',
		icon: `image://${taishiganzhi}`,
		symbolSize: 140
	},
	{
		x: 500,
		y: 30,
		nodeName: 'TD',
		icon: `image://${dd}`,
		symbolSize: 140
	},
	// 算法
	{
		x: 75,
		y: 400,
		nodeName: 'ZN',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 225,
		y: 400,
		nodeName: 'ZZCG',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 375,
		y: 400,
		nodeName: 'XT融合识别',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 0,
		y: 450,
		nodeName: 'XT管控',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 150,
		y: 450,
		nodeName: 'LD被动识别',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 300,
		y: 450,
		nodeName: 'MBSB',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 700,
		y: 450,
		nodeName: 'DCLY',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 850,
		y: 450,
		nodeName: 'HRRP',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 1000,
		y: 450,
		nodeName: 'JBKGR',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 625,
		y: 400,
		nodeName: 'SARMBSB',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 775,
		y: 400,
		nodeName: 'FBSLH',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	{
		x: 925,
		y: 400,
		nodeName: 'REDSB',
		icon: `image://${suanfa}`,
		symbolSize: 20
	},
	// 右边
	{
		x: 990,
		y: 300,
		nodeName: 'KZ',
		icon: `image://${kongzhizhongxin}`,
		symbolSize: 40
	},
	{
		x: 990,
		y: 900,
		nodeName: 'JC',
		icon: `image://${juece}`,
		symbolSize: 40
	}
]
const charts: any = {
	nodes: [],
	linesData: [
		// GX样机-感知调度
		{
			key: '9-10',
			coords: [
				[15, 900],
				[480, 900],
				[480, 670]
			]
		},
		// 感知调度-GX样机
		{
			key: '15-16',
			coords: [
				[460, 670],
				[460, 890],
				[15, 890]
			]
		},
		// 决策-感知调度
		{
			key: '3-4',
			coords: [
				[965, 900],
				[526, 900],
				[526, 670]
			]
		},
		// 感知调度-决策
		{
			key: '11-12',
			coords: [
				[546, 670],
				[546, 890],
				[965, 890]
			]
		},
		// LD样机-感知调度
		{
			key: '5-6-7-8',
			coords: [
				[10, 300],
				[480, 300],
				[480, 545]
			]
		},
		// 感知调度-LD样机
		{
			key: '13-14',
			coords: [
				[460, 545],
				[460, 310],
				[10, 310]
			]
		},
		// 控制/他D-感知调度
		{
			key: '1-21-22-23-24-25-26-27',
			coords: [
				[960, 300],
				[526, 300],
				[526, 545]
			]
		},
		// 感知调度-控制/他D
		{
			key: '1-21-22-23-24-25-26-27',
			coords: [
				[546, 545],
				[546, 310],
				[960, 310]
			]
		},

		// XT管控-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[0, 450],
				[0, 650],
				[410, 650]
			]
		},
		// 感知调度-XT管控
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[410, 640],
				[10, 640],
				[10, 450]
			]
		},
		// 智能-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[65, 400],
				[65, 630],
				[410, 630]
			]
		},
		// 感知调度-智能
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[410, 620],
				[75, 620],
				[75, 400]
			]
		},
		// LD被动识别-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[150, 450],
				[150, 610],
				[410, 610]
			]
		},
		// 感知调度-LD被动识别
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[410, 600],
				[160, 600],
				[160, 450]
			]
		},
		// 子阵重构-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[225, 400],
				[225, 590],
				[410, 590]
			]
		},
		// 感知调度-子阵重构
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[410, 580],
				[235, 580],
				[235, 400]
			]
		},
		// 红外目标识别-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[300, 450],
				[300, 570],
				[410, 570]
			]
		},
		// 感知调度-红外目标识别
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[420, 560],
				[310, 560],
				[310, 450]
			]
		},
		// XT融合识别-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[375, 400],
				[375, 550],
				[430, 550]
			]
		},
		// 感知调度-XT融合识别
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[450, 540],
				[385, 540],
				[385, 400]
			]
		},
		// 感知调度-SAR目标识别
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[550, 540],
				[615, 540],
				[615, 400]
			]
		},
		// SAR目标识别-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[625, 400],
				[625, 550],
				[560, 550]
			]
		},
		// 多处理域抗干扰-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[700, 450],
				[700, 570],
				[570, 570]
			]
		},
		// 感知调度-多处理域抗干扰
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[570, 560],
				[690, 560],
				[690, 450]
			]
		},
		// 分布式联合-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[775, 400],
				[775, 590],
				[590, 590]
			]
		},
		// 感知调度-分布式联合
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[590, 580],
				[765, 580],
				[765, 400]
			]
		},
		// HRRP-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[850, 450],
				[850, 610],
				[590, 610]
			]
		},
		// 感知调度-HRRP
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[590, 600],
				[840, 600],
				[840, 450]
			]
		},
		// 红外目标识别-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[925, 400],
				[925, 630],
				[590, 630]
			]
		},
		// 感知调度-红外目标识别
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[590, 620],
				[915, 620],
				[915, 400]
			]
		},
		// 捷变抗干扰-感知调度
		{
			key: codeToIntegratedSchedulingKeys,
			coords: [
				[1000, 450],
				[1000, 650],
				[590, 650]
			]
		},
		// 感知调度-捷变抗干扰
		{
			key: integratedSchedulingToCodeKeys,
			coords: [
				[590, 640],
				[990, 640],
				[990, 450]
			]
		},
		// x: 500,
		// y: 605,
		// 感知调度-他D
		{
			key: '1-21-22-23-24-25-26-27',
			coords: [
				[500, 545],
				[500, 100]
			]
		},
		// 他D-感知调度
		{
			key: '1-21-22-23-24-25-26-27',
			coords: [
				[510, 100],
				[510, 545]
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
			color: '#fffff',
			fontSize: '8px'
		}
	}
	charts.nodes.push(node)
}
const formatterHover = (params: any) => {
	let currData = params.data
	if (params.dataType === 'node') {
		//鼠标到节点
		return currData.nodeName
	} else {
		// PubSub.publish(TOPOLOGY_DRAWER_KEY, currData?.key)
		//鼠标到线条
		return currData.key
	}
}

const Communitation = () => {
	const { t } = useTranslation()
	useEffect(() => {}, [])
	// 获取YJ通信配置信息

	// echarts配置
	let option: echarts.EChartsOption = {
		tooltip: {
			show: true,
			enterable: true, //鼠标是否可进入提示框浮层中
			formatter: formatterHover, //修改鼠标悬停显示的内容
			triggerOn: 'click'
		},
		events: {},
		legend: [
			{
				data: charts.nodes.map((a: any) => {
					return t(a.nodeName)
				})
			}
		],
		xAxis: {
			min: 0,
			max: 1200,
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
					color: '#FFFFFF',
					formatter: (item: any) => {
						return t(item.data.nodeName)
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
					color: '#77FF00',
					curveness: 0.3
				},
				effect: {
					show: true,
					trailLength: 0.1,
					symbol: 'arrow',
					color: '#77FF00',
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

export default Communitation
