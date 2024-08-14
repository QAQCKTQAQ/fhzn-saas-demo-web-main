/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-30 18:07:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-04 14:40:16
 */
import { thirdPartService } from '../config/servicePort'
import http from '@/api'

// * 获取DD列表
export const getDDListApi = (params: any) => {
	const { id, ...rest } = params || {}
	return http.get(`${thirdPartService}/experiments/${id}/instanceGroups`, rest)
}

// 获取LD可视化相关信息
export const getLdInfoApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/LD`, rest)
}

// 获取DYRH相关信息
export const getDYRHInfoApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/XTRH`, rest)
}

// 获取波形捷变
export const getBXJBInfoApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/DCLYandLDJB`, rest)
}

// 获取多处理域抗干扰
export const getAreaDataApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/DCLY`, rest)
}

// 红外目标智能识别算法
export const getHwsbDataApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/HWSF`, rest)
}

// XTRZ侦察算法
export const getXTRZApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/XTRZ`, rest)
}

// 获链路数据相关信息
export const getCodeDataInfoApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/body`, rest)
}

// 获取时间戳列表
export const getTimeListApi = (id: any, params: any) => {
	return http.get(`${thirdPartService}/experiments/${id}/timeSlices`, params)
}

// FZ平台到 DYGZ
export const getFZPTLinkDYGZApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/GZDW/FZTY`, rest)
}

// JC到 DYGZ
export const getJCLinkDYGZApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/GZDW/JCYJ`, rest)
}

// 整体感知状态
export const getGZZTApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/GZZT`, rest)
}

// 分布式XT智能JC
export const getXTGRApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/XTGR`, rest)
}

// SAR与HW可见光可视化
export const getKJGSFApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/KJGSF`, rest)
}

// 多模****算法
export const getDMXHSCApi = (data: any) => {
	const { id, ...rest } = data || {}
	return http.get(`${thirdPartService}/experiments/${id}/DYGZ/LDGR`, rest)
}
