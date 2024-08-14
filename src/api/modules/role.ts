/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-17 13:32:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-27 10:31:36
 */
import { AuthService } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 角色模块
 */
// * 角色查询
export const roleQueryApi = (params: any) => {
	return http.get(AuthService + `/role/query`, params)
}

// * 角色新建
export const roleAddApi = (data: any) => {
	return http.post(AuthService + `/v2/role/add`, data)
}

// * 角色编辑
export const roleUpdateApi = (data: any) => {
	return http.post(AuthService + `/v2/role/update`, data)
}

// * 获取角色关联的用户列表
export const queryAssignedUsersApi = (params: any) => {
	return http.get(AuthService + `/role/pageQueryAssignedUsers`, params)
}

// * 绑定用户到角色
export const assignUsersToRoleApi = (data: any) => {
	return http.post(AuthService + `/v2/role/assignUsers`, data)
}

// * 获取角色关联的资源列表
export const getRoleRelateResource = (data: any) => {
	return http.get(AuthService + `/role/queryOne`, data)
}
// * 绑定权限到角色
export const configRoleResources = (data: any) => {
	return http.post(AuthService + `/v2/role/configResources`, data)
}
