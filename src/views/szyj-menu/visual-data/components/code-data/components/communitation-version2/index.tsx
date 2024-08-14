/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-12 15:46:38
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-01 14:30:35
 */

// import { useEcharts } from '@/hooks/useEcharts'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import 'echarts/extension/bmap/bmap'
import { chartLineData } from '../../const'
import leida from '@/assets/images/tpt/leida.png'
import guangxue from '@/assets/images/tpt/guangxue.png'
import suanfa from '@/assets/images/tpt/suanfa.png'
import juece from '@/assets/images/tpt/juece.png'
import kongzhizhongxin from '@/assets/images/tpt/kongzhizhongxin.png'
import './index.less'
import taishiganzhi from '@/assets/images/tpt/taishiganzhi_active.png'
import dd from '@/assets/images/tpt/dd.png'
import leidaActive from '@/assets/images/tpt/leida_active.png'
import suanfaActive from '@/assets/images/tpt/suanfa_active.png'

const CommunitationVersion2 = (props: any) => {
	const { command, statusData } = props
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current && chartRef.current.clear()
		chartRef.current = echarts.init(echartsRef.current)
		drawCharts()
	}, [])

	// 订阅chart-line新数据
	useEffect(() => {
		initNodes()
		drawCharts()
	}, [command, statusData])

	// 算法根据时显状态，展示是否激活当前icon
	const activeImgByStatus = (key: any) => {
		const lastItem = (statusData || []).findLast((item: any) => {
			return `${item?.type || ''}` === key
		})
		if (lastItem && `${lastItem.status || ''}` === '1') {
			return `image://${suanfaActive}`
		}
		return `image://${suanfa}`
	}

	// 算法根据时显状态，展示是否激活当前icon
	const activeImgByLdStatus = () => {
		// 主动
		const zDlastItem = (statusData || []).findLast((item: any) => {
			return `${item?.type || ''}` === '1'
		})
		// 被动
		const bDlastItem = (statusData || []).findLast((item: any) => {
			return `${item?.type || ''}` === '2'
		})
		const zDStatus = zDlastItem && zDlastItem?.status && `${zDlastItem.status}` !== '0'
		const bDStatus = bDlastItem && bDlastItem?.status && `${bDlastItem.status}` !== '3'

		if (zDStatus || bDStatus) {
			return `image://${leidaActive}`
		}
		return `image://${leida}`
	}

	const charts: any = {
		nodes: [],
		linesData: chartLineData
	}

	const initNodes = () => {
		const nodes: any = [
			{
				x: 0,
				y: 150,
				nodeName: 'LD样机',
				icon: activeImgByLdStatus(),
				symbolSize: 50
			},
			{
				x: 0,
				y: 1000,
				nodeName: '光学样机',
				icon: `image://${guangxue}`,
				symbolSize: 50
			},
			// 中间
			{
				x: 500,
				y: 530,
				nodeName: '感知调度',
				icon: `image://${taishiganzhi}`,
				symbolSize: 220
			},
			{
				x: 500,
				y: 0,
				nodeName: '他弹',
				icon: `image://${dd}`,
				symbolSize: 140
			},
			// 算法
			// {
			// 	x: 83,
			// 	y: 400,
			// 	nodeName: '智能',
			// 	icon: `image://${suanfa}`,
			// 	symbolSize: 40
			// },
			{
				x: 50,
				y: 300,
				nodeName: '子阵****综合算法',
				icon: activeImgByStatus('7'),
				symbolSize: 40
			},
			{
				x: 300,
				y: 300,
				nodeName: '多源异构****目标融合算法',
				icon: activeImgByStatus('11'),
				symbolSize: 40
			},
			{
				x: 20,
				y: 800,
				nodeName: '多模*****生成算法',
				icon: activeImgByStatus('5'),
				symbolSize: 40
			},
			{
				x: 180,
				y: 800,
				nodeName: '主动雷达****识别算法',
				icon: activeImgByStatus('6'),
				symbolSize: 40
			},
			{
				x: 340,
				y: 800,
				nodeName: '干扰行*****测算法',
				icon: activeImgByStatus('10'),
				symbolSize: 40
			},
			{
				x: 650,
				y: 800,
				nodeName: '分布****决策算法',
				icon: activeImgByStatus('8'),
				symbolSize: 40
			},
			{
				x: 970,
				y: 800,
				nodeName: '复杂电磁*****侦查算法',
				icon: activeImgByStatus('9'),
				symbolSize: 40
			},
			{
				x: 950,
				y: 300,
				nodeName: '固定*****智能算法',
				icon: activeImgByStatus('12'),
				symbolSize: 40
			},
			{
				x: 620,
				y: 300,
				nodeName: '单弹红外*****部位识别算法',
				icon: activeImgByStatus('14'),
				symbolSize: 40
			},
			{
				x: 800,
				y: 300,
				nodeName: '单弹*****标识别算法',
				icon: activeImgByStatus('13'),
				symbolSize: 40
			},
			{
				x: 800,
				y: 800,
				nodeName: 'SAR*****匹配算法',
				icon: activeImgByStatus('15'),
				symbolSize: 40
			},
			// 右边
			{
				x: 1000,
				y: 150,
				nodeName: '控制',
				icon: `image://${kongzhizhongxin}`,
				symbolSize: 40
			},
			{
				x: 1000,
				y: 1000,
				nodeName: '决策',
				icon: `image://${juece}`,
				symbolSize: 40
			},
			// 矩形
			{
				x: 0,
				y: 300,
				nodeName: '',
				icon: ``,
				symbolSize: 1,
				type: 'juxing'
			},
			{
				x: 1000,
				y: 300,
				nodeName: '',
				icon: ``,
				symbolSize: 1,
				type: 'juxing'
			},
			{
				x: 1000,
				y: 750,
				nodeName: '',
				icon: ``,
				symbolSize: 1,
				type: 'juxing'
			},
			{
				x: 0,
				y: 750,
				nodeName: '',
				icon: ``,
				symbolSize: 1,
				type: 'juxing'
			}
		]
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
	}

	const formatterHover = (params: any) => {
		let currData = params.data
		if (params.dataType === 'node') {
			//鼠标到节点
			return currData.nodeName
		} else {
			// console.log(params, 'pppppppp')
			// if (currData?.data?.length) {
			// 	PubSub.publish(TOPOLOGY_DRAWER_KEY, currData?.key)
			// }
			return
		}
	}

	// echarts配置
	const drawCharts = () => {
		const option = {
			tooltip: {
				show: true,
				enterable: true, //鼠标是否可进入提示框浮层中
				formatter: formatterHover, //修改鼠标悬停显示的内容
				triggerOn: 'click'
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
							return item.data.nodeName
						}
					},
					data: charts.nodes
				},
				{
					type: 'lines',
					polyline: true,
					coordinateSystem: 'cartesian2d',
					lineStyle: {
						type: 'solid',
						width: 2,
						color: (item: any) => {
							const key = item?.data?.key || ''
							return !key ? '#ffffff' : command && key.split('-').indexOf(`${command}`) > -1 ? '#77FF00' : '#A4A7AC'
						},
						curveness: 1
					},
					// effect: {
					// 	show: false,
					// 	trailLength: 0.1,
					// 	symbol: 'arrow',
					// 	color: '#77FF00',
					// 	symbolSize: 5
					// },
					data: charts.linesData
				}
			]
		}

		option && chartRef.current.setOption(option)
	}
	return (
		<>
			<div id="canvas" className="topology_content" ref={echartsRef}></div>
		</>
	)
}

export default CommunitationVersion2
