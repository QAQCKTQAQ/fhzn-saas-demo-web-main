const { getAccessPermission } = require('../service/user')

module.exports = async ctx => {
	const { nickname } = ctx.session
	if (!nickname) {
		return (ctx.body = {
			code: 599,
			message: '登录过期，请重新登录！'
		})
	}
	// 获取权限
	try {
		const res = await getAccessPermission(ctx)
		ctx.body = res.data
	} catch (e) {
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
