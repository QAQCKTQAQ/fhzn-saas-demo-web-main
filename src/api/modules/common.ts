/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-10 14:29:32
 * @LastEditors: ZeroSi
 * @LastEditTime: 2023-11-06 13:41:04
 */
import http from '@/api'
import { commonService } from '@/api/config/servicePort'

// 根据算法id 获取详情
export const getCodeDetailApi = (id: any) => {
	return http.get(`${commonService}/training/code/${id}`)
}

// 根据算法id 获取详情
export const getImageDetailApi = (id: any) => {
	return http.get(`${commonService}/training/image/${id}`)
}

// 根据算法id 获取详情
export const getDataSetDetailApi = (id: any) => {
	return http.get(`${commonService}/dataset/${id}`)
}
// 获取模型详情
export const getModeltDetailApi = (id: any, version: any) => {
	return http.get(`${commonService}/training/model-version/${id}/versions/${version}`)
}
// 获取模型测试指标信息
export const getModelTestIndicatorsApi = (id: any) => {
	return http.get(`${commonService}/training/model/${id}/indicators`)
}

// 获取训练任务指标信息
export const getTestIndicatorsApi = (id: any) => {
	return http.get(`${commonService}/training//${id}/indicators`)
}
// 字典/标签列表
export const getTagsDicts = (params: any) => {
	return http.get(`${commonService}/tags/dicts`, params)
}

// 业务日志上报
export const reportLogApi = (data: any) => {
	return http.post(`${commonService}/logs/record`, data)
}

// 操作日志查询
export const queryLogApi = (params: any) => {
	return http.get(`${commonService}/logs/list`, params)
}
