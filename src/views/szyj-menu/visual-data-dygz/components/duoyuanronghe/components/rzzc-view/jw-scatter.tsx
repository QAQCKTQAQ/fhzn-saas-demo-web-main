/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-04 18:44:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-05 11:23:10
 */
// 散点图
import { useEcharts } from '@/hooks/useEcharts'
import { CHART_TYPE_ENUM } from './const'
import { useEffect, useState } from 'react'

export default function JwScatter(props: any) {
	const { type, lats, longs } = props

	const [data, setData] = useState([])

	const config_tilte = {
		[CHART_TYPE_ENUM.gz_pl]: {
			title: '工作频率',
			xName: 'X轴',
			yName: 'Y轴'
		},
		[CHART_TYPE_ENUM.fu_du]: {
			title: '幅度',
			xName: 'X轴',
			yName: 'Y轴'
		},
		[CHART_TYPE_ENUM.mc_kd]: {
			title: '脉冲宽度',
			xName: 'X轴',
			yName: 'Y轴'
		},
		[CHART_TYPE_ENUM.jd_wd]: {
			title: '经纬度',
			xName: '经度',
			yName: '纬度'
		}
	}

	useEffect(() => {
		if (type) {
			setData(handleDataByType())
		}
	}, [type, lats, longs])

	// 根据type处理不同的数据
	const handleDataByType = () => {
		return (lats || []).map((la: any, index: any) => {
			return [la, longs[index]]
		})
		// return [
		// 	[0, 8.04],
		// 	[8.07, 6.95],
		// 	[13.0, 7.58],
		// 	[9.05, 8.81],
		// 	[11.0, 8.33],
		// 	[14.0, 7.66],
		// 	[13.4, 6.81],
		// 	[10.0, 6.33],
		// 	[14.0, 8.96],
		// 	[12.5, 6.82],
		// 	[9.15, 7.2],
		// 	[11.5, 7.2],
		// 	[3.03, 4.23],
		// 	[12.2, 7.83],
		// 	[2.02, 4.47],
		// 	[1.05, 3.33],
		// 	[4.05, 4.96],
		// 	[6.03, 7.24],
		// 	[12.0, 6.26],
		// 	[12.0, 8.84],
		// 	[7.08, 5.82],
		// 	[5.02, 5.68]
		// ]
	}

	const option = {
		title: {
			show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
			text: config_tilte[type]?.title,
			x: 'center',
			textStyle: {
				fontSize: 12
			}
		},
		xAxis: {
			name: config_tilte[type]?.xName
			// min: data?.length ? data[0][0] : 0,
			// max: data?.length ? data[data.length - 1][0] : 1000
		},
		yAxis: {
			name: config_tilte[type]?.yName
		},
		series: [
			{
				symbolSize: 4,
				data: data,
				type: 'scatter'
			}
		]
	}
	const [echartsRef]: any = useEcharts(option, data)
	return <div className="canvas-scatter" ref={echartsRef}></div>
}
