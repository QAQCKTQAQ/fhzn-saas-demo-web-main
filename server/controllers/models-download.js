// 下载
const { modelsDownLoad } = require('../service/download')

module.exports = async ctx => {
	try {
		const res = await modelsDownLoad(ctx.query, ctx)
		const disposition = res.headers['content-disposition'] || ''
		const filename = disposition.split("filename*=UTF-8''")[1]
		ctx.status = 200
		ctx.set('Content-Type', 'application/octet-steam;charset=UTF-8')
		ctx.set('Content-Disposition', 'attachment; filename=' + Buffer.from(filename || 'file').toString('binary'))
		ctx.body = res.data
	} catch (err) {
		console.log('err', err)
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
