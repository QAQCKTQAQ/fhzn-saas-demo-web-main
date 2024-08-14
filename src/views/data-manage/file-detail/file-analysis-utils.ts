/***
 * 标注文件解析工具类
 * JSON文件规范：
 * {
  "image": "513.jpg",
		"annotations": [
			{
				"label": "broke_insulator",
				"coordinates": {
					"x": 694.0,
					"y": 1214.0,
					"width": 284.0,
					"height": 292.0
				}
			},
			{
				"label": "broke_insulator",
				"coordinates": {
					"x": 960.0,
					"y": 1324.0,
					"width": 296.0,
					"height": 280.0
				}
			}
		]
	}
 * txt文件规范
 *  0 0.150608 0.351273 0.061632 0.084491
		0 0.208333 0.383102 0.064236 0.081019
 */

import { rdmRgbColor } from '@/utils/util'
// json标注文件 解析为canvas画图数据
export const jsonToCanvasData = (data: string) => {
	// 标注不同颜色
	const colors: any = {}
	const json: any = JSON.parse(data)
	const annotations: any[] = json?.annotations || []
	return annotations.map((item: any) => {
		const {
			label,
			coordinates: { x, y, width, height }
		} = item
		if (!colors[label]) {
			colors[label] = rdmRgbColor()
		}
		return {
			color: colors[label],
			label,
			x: x - width / 2,
			y: y - height / 2,
			width,
			height
		}
	})
}

// txt标注文件 解析为canvas画图数据
export const txtToCanvasData = (data: string) => {
	// 标注不同颜色
	const colors: any = {}
	const rowData: any[] = data.split('\n') || []
	const jsonData: any = []
	rowData.map((item: any) => {
		const arr = (item && item.split(' ')) || []
		if (arr.length === 5) {
			const label = arr[0]
			if (!colors[label]) {
				colors[label] = rdmRgbColor()
			}
			jsonData.push({
				label,
				color: colors[label],
				x: arr[1],
				y: arr[2],
				width: arr[3],
				height: arr[4]
			})
		}
	})
	return jsonData
}
// txt标注文件 返回的时候和原始长宽相关处理后的数据，需要我们还原
export const txtToCanvasDataByOriginalImageInfo = (labelData: any, originalImageInfo: any) => {
	const { naturalWidth, naturalHeight } = originalImageInfo
	console.log(labelData, naturalWidth, naturalHeight)
	return labelData.map((item: any) => {
		const { x, y, width, height, ...rest } = item
		return {
			x: (x - width / 2) * naturalWidth,
			y: (y - height / 2) * naturalHeight,
			width: width * naturalWidth,
			height: height * naturalHeight,
			...rest
		}
	})
}
