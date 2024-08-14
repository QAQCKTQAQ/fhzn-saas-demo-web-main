/**
 * 服务端渲染中间件
 * */
const fs = require('fs')
const path = require('path')
const resolve = p => path.resolve(__dirname, p)
const isProd = process.env.NODE_ENV === 'production'

module.exports = viteServer => {
	return async ctx => {
		try {
			const path = isProd ? `../../../client/index.html` : '../../../index.html'
			let template = fs.readFileSync(resolve(path), 'utf-8')
			if (!isProd) {
				template = await viteServer.transformIndexHtml(ctx.path, template)
			}
			const html = template.replace(`<!--title-->`, '飞航智能云')
			ctx.type = 'text/html'
			ctx.body = html
		} catch (e) {
			viteServer && viteServer.ssrFixStacktrace(e)
			console.log(e.stack)
			ctx.throw(500, e.stack)
		}
	}
}
