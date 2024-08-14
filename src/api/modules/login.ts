import { Login } from '@/api/interface/index'
// import { routerConfig } from '@/routers/config'
import http from '@/api'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/bff/login`, params)
}

// * 获取菜单列表
export const getMenuList = () => {
	return http.get(`/bff/auth/query`)
}

// * 退出
export const logoutApi = () => {
	return http.get(`/bff/logout`)
}
