const Koa2 = require('koa')
const path = require('path')
const KoaCors = require('@koa/cors')
const router = require('./routers')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const static = require('koa-static')
const compress = require('koa-compress')
const interceptLog = require('./middlewares/interceptLog')

// 静态资源路径
const clientBasePath = process.env.NODE_ENV !== 'production' ? '' : '../client'
const app = new Koa2({
	proxy: true
})

app.keys = ['fhzn-saas-web'] // cookie的签名
// session 管理
app.use(
	session(
		{
			key: 'koa:sess', //  cookie的key。 (默认是 koa:sess)
			maxAge: 86400000, // session 过期时间，以毫秒ms为单位计算 。
			autoCommit: true, // 自动提交到响应头。(默认是 true)
			overwrite: true, // 是否允许重写 。(默认是 true)
			httpOnly: true, // 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true)
			signed: true, // 是否签名。(默认是 true)
			rolling: true, // 是否每次响应时刷新Session的有效期。(默认是 false)
			renew: false // 是否在Session快过期时刷新Session的有效期。(默认是 false)
		},
		app
	)
)
// const logger = require("./logs/logs");
// const config = require("./config/index");

// 日志中间件
// app.use(async (ctx, next) => {
// 	const start = new Date();
// 	let ms;
// 	try {
// 		await next();
// 		ms = new Date() - start;
// 		// logger.accessLog(ctx, ms);
// 	} catch (error) {
// 		ms = new Date() - start;
// 		logger.errorLog(ctx, error, ms);
// 	}
// });
// 开启压缩
app.use(compress({ threshold: 2048 }))

// 加载静态资源
app.use(
	static(path.resolve(__dirname, clientBasePath), {
		index: false,
		gzip: true,
		maxage: 3600 * 24 * 30
	})
)

app.use(
	bodyParser({
		enableTypes: ['json', 'form', 'text'],
		encode: 'utf-8'
	})
)
// 跨域中间件
app.use(KoaCors())
// 业务日志上报
app.use(interceptLog())
// 路由中间件
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
