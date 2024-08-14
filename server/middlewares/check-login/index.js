/**
 * 校验登录中间件 - 获取当前登录用户所属应用的权限数据
 * */
const { outInterfaces } = require('../../config/white-list')
module.exports = () => {
	return async (ctx, next) => {
		const { path } = ctx
		if (
			outInterfaces.find(p => {
				return path.startsWith(p)
			})
		) {
			return next()
		}
		// 登出
		if (path === '/login') {
			ctx.session = null
		}
		if (path !== '/login' && !ctx.session?.nickname) {
			return ctx.redirect('/login')
		}
		return next()
	}
}
