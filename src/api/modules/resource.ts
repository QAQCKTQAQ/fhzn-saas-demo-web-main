/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 14:58:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-20 15:10:42
 */
import { AuthService } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 资源管理
 */
// * 获取资源列表
export const queryResourceList = (params: any) => {
	return http.get(AuthService + `/resource/query`, params)
}

// * 新建资源
export const addNewReosurce = (data: any) => {
	return http.post(AuthService + `/v2/resource/add`, data)
}
// * 更新资源
export const updateReosurce = (data: any) => {
	return http.post(AuthService + `/v2/resource/update`, data)
}
