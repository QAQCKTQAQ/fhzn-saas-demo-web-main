const koaConnect = require('koa-connect')
const vite = require('vite')
const app = require('./app')
const render = require('./middlewares/render')
const isProd = process.env.NODE_ENV === 'production'
const checkLogin = require('./middlewares/check-login')

;(async () => {
	let viteServer = null
	// 开发环境 - 创建 vite 服务
	if (!isProd) {
		viteServer = await vite.createServer({
			root: process.cwd(),
			logLevel: 'error',
			server: {
				middlewareMode: 'ssr'
			}
		})
		// 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
		app.use(koaConnect(viteServer.middlewares))
	}
	app.use(checkLogin())

	// 服务端渲染
	app.use(render(viteServer))

	app.listen(8080, () => {
		console.log('server is listening in 8080')
	})
})()
