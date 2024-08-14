/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-06 11:30:55
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-04 15:14:03
 */
import { AlgorithmTraining } from '@/api/config/servicePort'
import http from '@/api'
import { modelClassesData } from '../mock/algorithm-manage'

/**
 * 获取模型管理管理列表
 */
export const algorithmListQery = (params: any) => {
	return http.get(AlgorithmTraining + `/code/list`, params)
}

// 获取模型类别
export const getModelClassesData = (params: any) => {
	console.log('params', params)
	return new Promise(resolve => {
		return resolve({ modelClassesData })
	})
}
// 新增/更新算法
export const algorithmAddAndUpdate = (data: any) => {
	return http.post(AlgorithmTraining + `/code/saveOrUpdate`, data)
}
// 历史算法列表
export const algorithmHistoryListQery = (id: any, params?: any) => {
	return http.get(AlgorithmTraining + `/code/${id}/versions`, params)
}

// 新增算法版本
export const algorithmHistoryAddAndUpdate = (data: any) => {
	return http.post(AlgorithmTraining + `/code/versions`, data)
}
// gitlab链接换filecode
export const gitlabChangeCode = (data: any) => {
	return http.post(AlgorithmTraining + `/gitlab/download`, data)
}
// 删除算法
export const algorithmDelete = (data: any) => {
	return http.post(AlgorithmTraining + `/code/del`, data)
}

// 获取github项目列表
export const getGitHubsFetch = (params: any) => {
	return http.get(AlgorithmTraining + `/gitlab/projects`, params)
}

// 获取github分支列表
export const getGitHubBranchsApi = (params: any) => {
	return http.get(AlgorithmTraining + `/gitlab/branches`, params)
}

// 获取github分支列表
export const getBranchedCommmitApi = (params: any) => {
	return http.get(AlgorithmTraining + `/gitlab/commits`, params)
}
