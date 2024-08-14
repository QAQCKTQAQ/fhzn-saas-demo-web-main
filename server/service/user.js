/***
 * 用户信息相关
 */
//修改 by ckt
const API = require('../utils/api-map')
const axios = require('axios')
const getHeaders = require('../utils/header')
module.exports = {
	// 用户登录接口
	login: data => {
		return axios({
			method: 'post',
			url: API('/auth-service/gateWay/user/passwordCheck'),
			data,
			headers: {
				'X-Login-User': 'your-username', // 直接指定 X-Login-User 的值
				'X-APP-CODE': 'your-app-code' // 直接指定 X-APP-CODE 的值
			}
		})
	},
	// 根据应用获取用户相关的角色权限
	getAccessPermission: ctx => {
		return axios({
			method: 'get',
			url: API('/auth-service/auth/query'),
			headers: getHeaders(ctx)
		})
	}
}
