const parser = require('ua-parser-js')
const { getUserIp } = require('./tools')

module.exports = {
	/***
	 * 检验是否为手机端访问
	 */
	checkPhone: ctx => {
		let userAgent = ctx.request.header['user-agent'].toLowerCase()
		let patPhoneReg = /ipad|iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/
		return patPhoneReg.test(userAgent)
	},
	/***
	 * 获取日志上报的 公共参数
	 */
	logCommonParams: ctx => {
		const { header } = ctx
		const userAgent = parser(header['user-agent'])
		return {
			ipAddr: getUserIp(ctx.request),
			browser: (userAgent && userAgent.browser && userAgent.browser.name) || ''
		}
	},
	/***
	 * 错误上报数据 二次处理
	 */
	errorParamsHandle: ctx => {
		const { logType, logInfo = {} } = ctx.request.body || {}
		// 用户名
		logInfo['UserName'] = (ctx.session.userInfo && ctx.session.userInfo.userName) || ''
		return {
			measurement: 'metrics-mancai-pc-web', // 度量，可以理解为一张表
			fields: logInfo, // 度量字段，该字段通常会随时间变化
			tags: { ErrorCategory: 'web-error' }, // 度量标签，该字段一般不会随时间变化，如果需要做分组聚合等操作，都需要设置为tag
			exceptionLevel: logType || 'NORMAL'
		}
	}
}
