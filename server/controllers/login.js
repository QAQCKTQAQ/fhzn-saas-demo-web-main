// 登录
const { login } = require('../service/user')
// const { reportLoginLog } = require('../service/loginLog')
module.exports = async ctx => {
	try {
		const { username, password } = ctx.request.body
		const res = await login({ username, password }, ctx)
		const { status, data } = res || {}
		if (status === 200 && data.code === 0) {
			// 保存用户nickname在session中
			ctx.session.nickname = username
			// reportLoginLog(ctx)
		}
		ctx.body = data
	} catch (err) {
		console.log('err', err)
		ctx.session = null
		ctx.body = { code: '9999', message: err?.message || '系统异常，请稍后重试！' }
	}
}
