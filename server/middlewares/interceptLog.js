/***
 * 针对客户端的日志报上接口，新增公用参数
 */
const removePrefix = require('../utils/remove-prefix')
const config = require('../config')
const { logCommonParams } = require('../utils/index')

module.exports = function () {
	return async (ctx, next) => {
		const path = removePrefix(ctx.path, config.apiPrefix)
		// 业务日志上报，拦截处理
		if (`/aicp/logs/record` === path) {
			ctx.request.body = {
				...logCommonParams(ctx),
				nickname: ctx.session.nickname,
				...(ctx.request.body || {})
			}
		}
		return next()
	}
}
