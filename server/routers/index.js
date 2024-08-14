const KoaRouter = require('koa-router')
const papayaProxy = require('../utils/proxy')
const apiMap = require('../utils/api-map')
const config = require('../config/index')
const removePrefix = require('../utils/remove-prefix')

const proxy = papayaProxy({ map: apiMap })
const apiPrefix = config.apiPrefix
const router = new KoaRouter({ prefix: apiPrefix })
const customRouter = require('./router')
const { whiteList, outInterfaces } = require('../config/white-list')

router
	.post(`/bff/login`, require('../controllers/login'))
	.get('/bff/logout', async ctx => {
		ctx.session = null
		return (ctx.body = { code: 0 })
	})
	.use(customRouter.routes())
	.all(`*`, async (ctx, next) => {
		const path = removePrefix(ctx.path, apiPrefix)
		if (whiteList.includes(path)) {
			return next()
		}
		// 检测是否过期
		const isXmlHttpReq = ctx.get('x-requested-with') === 'XMLHttpRequest'
		if (
			isXmlHttpReq &&
			!ctx.session.nickname &&
			!outInterfaces.find(p => {
				return ctx.path.startsWith(p)
			})
		) {
			return (ctx.body = {
				code: 599,
				message: '登录过期，请重新登录！'
			})
		}
		const res = await proxy(ctx, next)
		ctx.body = res
	})

module.exports = router
