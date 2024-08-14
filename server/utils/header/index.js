// const config = require('../../config/index')
//修改 by ckt
module.exports = ctx => {
	const xLoginUser = ctx.session?.nickname ? { 'X-Login-User': ctx.session.nickname } : {}
	return {
		...xLoginUser,
		'X-APP-CODE': 'xxx'
	}
}
