/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-19 14:55:41
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-19 14:55:45
 */
// 标注文件弹框发布订阅key
export const ASYNC_SUBSCRIBE_LABEL_FILE_MODAL = 'ASYNC_SUBSCRIBE_LABEL_FILE_MODAL'
// 数据增广 弹框发布订阅key
export const ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL = 'ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL'
// 数据标注 弹框发布订阅key
export const ASYNC_SUBSCRIBE_FILE_MARK_MODAL = 'ASYNC_SUBSCRIBE_FILE_MARK_MODAL'

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
		const arr = item.split(' ')
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
	// console.log(labelData, naturalWidth, naturalHeight)
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
