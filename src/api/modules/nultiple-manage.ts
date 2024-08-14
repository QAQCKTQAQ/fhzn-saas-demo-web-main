/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-12 13:30:20
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-16 16:33:43
 */
import { FilesSearch } from '@/api/config/servicePort'
import http from '@/api'
// 获取枚举值条件
export const getMultiDimensionalParams = (params: any) => {
	// return new Promise(resolve => {
	// 	return resolve({})
	// })
	return http.get(FilesSearch + `/fields`, params)
}
// 获取枚举值value
export const getMultiDimensionalValue = (field: any) => {
	return http.get(FilesSearch + `/fields/${field}/candidate-values`)
}
// 获取检索数据
export const getMultiDimensionalDataList = (data: any) => {
	return http.post(FilesSearch + `/query`, data)
}
