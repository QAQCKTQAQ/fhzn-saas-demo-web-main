import { AuthService } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 用户模块
 */
// * 用户查询
export const userQueryApi = (params: any) => {
	return http.get(AuthService + `/user/query`, params)
}

// * 用户新建
export const userAddApi = (data: any) => {
	return http.post(AuthService + `/v2/user/add`, data)
}

// * 用户编辑
export const userUpdateApi = (data: any) => {
	return http.post(AuthService + `/v2/user/update`, data)
}

// * 用户删除
export const userDeleteApi = (data: any) => {
	return http.post(AuthService + `/v2/user/delete`, data)
}

// * 获取用户角色
export const authRoleQueryApi = (params?: any) => {
	return http.get(AuthService + `/auth/query`, params)
}

// * 分配角色
export const authRoleToUserApi = (data: any) => {
	return http.post(AuthService + `/v2/user/addRole`, data)
}
//以上为user所使用的api
// * 查询用户密码
export const queryUserPassWordApi = (params: any) => {
	return http.get(AuthService + `/user/passwordSearch`, params)
}

// * 重置用户密码
export const resetUserPassWordApi = (data: any) => {
	return http.post(AuthService + `/v2/user/resetPassword`, data)
}

// * 修改用户密码
export const editUserPassWordApi = (data: any) => {
	return http.post(AuthService + `/v2/user/passwordModify`, data)
}
