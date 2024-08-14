const request = require('./request')
const axios = require('axios')
// 代理中间件
module.exports = options => {
	const { map } = options
	return async (ctx, next) => {
		if (typeof next === 'function') {
			await next()
		}
		return await request({ axios })({ map, ctx })
	}
}
