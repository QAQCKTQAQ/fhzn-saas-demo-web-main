import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'
// import { createNoise2D } from 'simplex-noise'

export default function Doppler() {
	const echartsRef: any = useRef()
	const chartRef: any = useRef()

	useEffect(() => {
		chartRef.current = echarts.init(echartsRef.current)
		drawChat()
	}, [])

	const mockAr = () => {
		const zz = []
		for (let i = 0; i <= 1536; i++) {
			const iA = []
			for (let j = 0; j <= 64; j++) {
				iA.push(Math.random() * 10)
			}
			zz.push(iA)
		}
		return zz
	}
	// const noise2D = createNoise2D()
	// const x = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64]
	// const y = [
	// 	0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120,
	// 	124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220,
	// 	224, 228, 232, 236, 240, 244, 248, 252, 256, 260, 264, 268, 272, 276, 280, 284, 288, 292, 296, 300, 304, 308, 312, 316, 320,
	// 	324, 328, 332, 336, 340, 344, 348, 352, 356, 360, 364, 368, 372, 376, 380, 384, 388, 392, 396, 400, 404, 408, 412, 416, 420,
	// 	424, 428, 432, 436, 440, 444, 448, 452, 456, 460, 464, 468, 472, 476, 480, 484, 488, 492, 496, 500, 504, 508, 512, 516, 520,
	// 	524, 528, 532, 536, 540, 544, 548, 552, 556, 560, 564, 568, 572, 576, 580, 584, 588, 592, 596, 600, 604, 608, 612, 616, 620,
	// 	624, 628, 632, 636, 640, 644, 648, 652, 656, 660, 664, 668, 672, 676, 680, 684, 688, 692, 696, 700, 704, 708, 712, 716, 720,
	// 	724, 728, 732, 736, 740, 744, 748, 752, 756, 760, 764, 768, 772, 776, 780, 784, 788, 792, 796, 800, 804, 808, 812, 816, 820,
	// 	824, 828, 832, 836, 840, 844, 848, 852, 856, 860, 864, 868, 872, 876, 880, 884, 888, 892, 896, 900, 904, 908, 912, 916, 920,
	// 	924, 928, 932, 936, 940, 944, 948, 952, 956, 960, 964, 968, 972, 976, 980, 984, 988, 992, 996, 1000, 1004, 1008, 1012, 1016,
	// 	1020, 1024, 1028, 1032, 1036, 1040, 1044, 1048, 1052, 1056, 1060, 1064, 1068, 1072, 1076, 1080, 1084, 1088, 1092, 1096, 1100,
	// 	1104, 1108, 1112, 1116, 1120, 1124, 1128, 1132, 1136, 1140, 1144, 1148, 1152, 1156, 1160, 1164, 1168, 1172, 1176, 1180, 1184,
	// 	1188, 1192, 1196, 1200, 1204, 1208, 1212, 1216, 1220, 1224, 1228, 1232, 1236, 1240, 1244, 1248, 1252, 1256, 1260, 1264, 1268,
	// 	1272, 1276, 1280, 1284, 1288, 1292, 1296, 1300, 1304, 1308, 1312, 1316, 1320, 1324, 1328, 1332, 1336, 1340, 1344, 1348, 1352,
	// 	1356, 1360, 1364, 1368, 1372, 1376, 1380, 1384, 1388, 1392, 1396, 1400, 1404, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436,
	// 	1440, 1444, 1448, 1452, 1456, 1460, 1464, 1468, 1472, 1476, 1480, 1484, 1488, 1492, 1496, 1500, 1504, 1508, 1512, 1516, 1520,
	// 	1524, 1528, 1532
	// ]
	const zz = mockAr()
	const generateData = () => {
		const data = []
		for (let i = 0; i <= 64; i++) {
			for (let j = 0; j < 1536; j++) {
				const z = Number(zz[i][j])
				data.push([i, j, z])
			}
		}
		return data
	}
	let data = generateData()

	const drawChat = () => {
		const option = {
			visualMap: {
				show: false,
				inRange: {
					color: [
						'#313695',
						'#4575b4',
						'#74add1',
						'#abd9e9',
						'#e0f3f8',
						'#ffffbf',
						'#fee090',
						'#fdae61',
						'#f46d43',
						'#d73027',
						'#a50026'
					]
				}
			},
			xAxis3D: {
				type: 'value',
				max: 64,
				min: 0,
				name: '距离(km)'
			},
			yAxis3D: {
				type: 'value',
				max: 1536,
				min: 0,
				name: '多普勒'
			},
			zAxis3D: {
				type: 'value',
				axisLabel: {
					show: true
				},
				scale: true,
				name: '幅度(dB)',
				nameTextStyle: {
					fontSize: 12
				}
			},
			grid3D: {
				axisLine: {
					lineStyle: { color: '#fff' }
				},
				axisPointer: {
					lineStyle: { color: '#fff' }
				},
				viewControl: {
					distance: 230
					// autoRotate: true
				},
				light: {
					main: {
						shadow: true,
						quality: 'ultra',
						intensity: 1.0
					}
				}
			},
			series: [
				{
					type: 'surface',
					data: data,
					shading: 'lambert',
					symbolSize: 2,
					label: {
						formatter: function (param: any) {
							return param.value[2].toFixed(1)
						}
					},
					itemStyle: {
						color: 'red'
					}
				}
			]
		}

		option && chartRef.current.setOption(option)
	}

	return <div className="doppler-info-canvas" ref={echartsRef}></div>
}
