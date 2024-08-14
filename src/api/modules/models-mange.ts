/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-03 13:17:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-04-18 17:21:39
 */
import { AlgorithmTraining } from '@/api/config/servicePort'
import http from '@/api'
import { modelClassesData, frameTypesData, modelTypesData } from '../mock/models-mange'
/**
 * 获取模型管理管理列表
 */
export const modelsListQery = (params: any) => {
	return http.get(AlgorithmTraining + `/model/list`, params)
}
/**
 * 获取模型版本管理列表
 */
export const modelsHistoryListQery = (params: any) => {
	return http.get(AlgorithmTraining + `/model-version/list`, params)
}
/**
 * 新增/更新模型
 */
export const addOrUpdateModels = (data: any) => {
	return http.post(AlgorithmTraining + `/model/saveOrUpdate`, data)
}
// 模型版本新增/更新模型
export const submitModelsVersion = (data: any) => {
	return http.post(AlgorithmTraining + `/model-version/saveOrUpdate`, data)
}

/**
 * 获取模型版本管理列表
 */
export const getModelDetailApi = (id: any, version: any) => {
	return http.get(AlgorithmTraining + `/model-version/${id}/versions/${version}`)
}

// 获取模型类别
export const getModelClassesData = (params: any) => {
	console.log('params', params)
	return new Promise(resolve => {
		return resolve({ modelClassesData })
	})
}
// 获取框架名称
export const getFrameFormatData = (params: any) => {
	console.log('params', params)
	return new Promise(resolve => {
		return resolve({ frameTypesData })
	})
}
// 获取模型格式
export const getModelFormatData = (params: any) => {
	console.log('params', params)
	return new Promise(resolve => {
		return resolve({ modelTypesData })
	})
}
// 删除模型
export const modelsDelete = (data: any) => {
	return http.post(AlgorithmTraining + `/model/del`, data)
}
// 删除模型版本
export const modelsVersionDelete = (data: any) => {
	return http.post(AlgorithmTraining + `/model-version/del`, data)
}
// 下载文件
export const filesDown = (params: any) => {
	return http.get(`/bff/download`, params)
}
