/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-17 14:39:17
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-17 15:05:25
 */
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { useEcharts } from '@/hooks/useEcharts'

const dataSource: any = [
	{
		name: '节点1',
		x: 300,
		y: 300
	},
	{
		name: '节点2',
		x: 800,
		y: 300
	},
	{
		name: '节点3',
		x: 550,
		y: 100
	},
	{
		name: '节点4',
		x: 550,
		y: 500
	}
]
const links: any = [
	{
		source: 0,
		target: 1,
		symbolSize: [5, 20],
		polyline: true,
		label: {
			show: true
		},
		lineStyle: {
			width: 5,
			curveness: 0.2
		}
	},
	{
		source: '节点2',
		target: '节点1',
		polyline: true,
		label: {
			show: true
		},
		lineStyle: {
			curveness: 0.2
		}
	},
	{
		source: '节点1',
		target: '节点3'
	},
	{
		source: '节点2',
		target: '节点3'
	},
	{
		source: '节点2',
		target: '节点4'
	},
	{
		source: '节点1',
		target: '节点4'
	}
]
const formatterHover = (params: any) => {
	let currData = params.data
	if (params.dataType === 'node') {
		//鼠标到节点
		return currData.name
	} else {
		//鼠标到线条
		return currData.name
	}
}
const DemoA = () => {
	let option: echarts.EChartsOption = {
		title: {
			text: '123'
		},
		tooltip: {
			//show: true,
			//enterable: true,//鼠标是否可进入提示框浮层中
			formatter: formatterHover //修改鼠标悬停显示的内容
		},
		legend: [
			{
				data: dataSource.map((a: any) => {
					return a.name
				})
			}
		],
		series: [
			{
				type: 'graph',
				layout: 'none', //none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置.'circular' 采用环形布局，'force' 采用力引导布局。
				symbolSize: 50,
				//categories: dataSource, //是否显示图例
				focusNodeAdjacency: true, //鼠标放置上去 显示当前的连接
				draggable: true, //是否支持拖拽   只有layout 为 force 的时候才可以用
				roam: true, //是否支持拖动和缩放
				animation: true, //是否需要加载
				animationDurationUpdate: 5000, //加载动画时间
				animationEasingUpdate: 'backIn', //动画类型
				label: {
					show: true, //是否显示标签。
					position: 'bottom' //标签的位置。['50%', '50%'] [x,y]   'inside'
				},
				itemStyle: {
					borderColor: '#fff',
					borderWidth: 1,
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.3)'
				},
				edgeSymbol: ['none', 'arrow'],
				data: dataSource,
				links: links,
				lineStyle: {
					opacity: 0.9,
					width: 2,
					curveness: 0,
					color: '#000000'
				},
				emphasis: {
					lineStyle: {
						width: 6
					}
				}
			}
		],
		markPoint: {}
	}
	const [echartsRef]: any = useEcharts(option)
	return <div id="canvas" style={{ width: '1000px', height: '700px' }} ref={echartsRef}></div>
}
export default DemoA
