import { useEcharts } from '@/hooks/useEcharts'
import { EChartsOption } from 'echarts'

interface ChartProp {
	value: string
	name: string
	percentage: string
}
const AgeRatioChart = () => {
	let data: any = [
		{
			value: 460,
			name: '图片',
			percentage: '36%'
		},
		{
			value: 140,
			name: '视频',
			percentage: '14%'
		},
		{
			value: 100,
			name: '文本',
			percentage: '10%'
		},
		{
			value: 280,
			name: '标注',
			percentage: '28%'
		},
		{
			value: 120,
			name: '属性',
			percentage: '12%'
		}
	]
	const colors = ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA']
	const option: EChartsOption = {
		color: colors,
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: '{b} <br/>占比：{d}%'
		},
		legend: {
			orient: 'vertical',
			right: '5%',
			top: '20%',
			itemGap: 15,
			itemWidth: 14,
			formatter: function (name) {
				let text = ''
				data.forEach((val: ChartProp) => {
					if (val.name === name) {
						text = ' ' + name + '　 ' + val.percentage
					}
				})
				return text
			},
			textStyle: {
				color: '#000'
			}
		},
		grid: {
			top: 'bottom',
			left: 10
		},
		series: [
			{
				zlevel: 1,
				name: '',
				type: 'pie',
				selectedMode: 'single',
				radius: [50, 90],
				center: ['35%', '50%'],
				startAngle: 60,
				// hoverAnimation: false,
				label: {
					position: 'inside',
					show: true,
					color: '#fff',
					formatter: function (params: any) {
						return params.data.percentage
					},
					rich: {
						b: {
							fontSize: 16,
							lineHeight: 30,
							color: '#fff'
						}
					}
				},
				itemStyle: {
					shadowColor: 'rgba(0, 0, 0, 0.2)',
					shadowBlur: 10
				},
				data: data.map((val: ChartProp, index: number) => {
					return {
						value: val.value,
						name: val.name,
						percentage: val.percentage,
						itemStyle: {
							borderWidth: 10,
							shadowBlur: 20,
							borderColor: colors[index],
							borderRadius: 10
						}
					}
				})
			},
			{
				name: '',
				type: 'pie',
				selectedMode: 'single',
				radius: [50, 90],
				center: ['35%', '50%'],
				startAngle: 60,
				data: [
					{
						value: 1000,
						name: '',
						label: {
							show: true,
							formatter: '{a|数据类型}',
							rich: {
								a: {
									align: 'center',
									color: 'rgb(98,137,169)',
									fontSize: 14
								}
							},
							position: 'center'
						}
					}
				]
			}
		]
	}
	const [echartsRef] = useEcharts(option, data)
	return <div ref={echartsRef} className="pie-echarts-canvas"></div>
}

export default AgeRatioChart
