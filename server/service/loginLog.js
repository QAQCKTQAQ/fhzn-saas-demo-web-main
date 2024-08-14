/***
 * 登录日志上报服务
 */

const API = require('../utils/api-map')
const axios = require('axios')
const getHeaders = require('../utils/header')
const { logCommonParams } = require('../utils/index')

module.exports = {
	// 上报登录日志
	reportLoginLog: async ctx => {
		const commonParams = logCommonParams(ctx)
		const data = {
			module: '登录',
			operationContent: '登录',
			operation: '登录',
			nickname: ctx.session.nickname,
			...commonParams
		}
		return axios({
			method: 'post',
			url: API('/aicp/logs/record'),
			data,
			headers: getHeaders(ctx)
		})
	}
}
