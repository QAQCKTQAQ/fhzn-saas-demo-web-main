// 下载
const { downloadRelativeFilePathCode, download } = require('../service/download')
const tools = require('../utils/tools')
const API = require('../utils/api-map')

module.exports = async ctx => {
	try {
		const { fileCode, fileName, relativeFilePath } = ctx.query
		const res = await downloadRelativeFilePathCode({ fileCode, relativeFilePath }, ctx)
		const { status, data } = res || {}
		if (status === 200 && data.code === 0) {
			const { url, type } = data?.data || {}
			const urlPath = type === 'local' ? API(url) : url
			const pipeRes = await download(urlPath, ctx)
			const disposition = pipeRes.headers['content-disposition'] || ''
			let filename = disposition.split("filename*=UTF-8''")[1] || fileName || tools.getFileNameByPath(url)
			ctx.status = 200
			ctx.set('Content-Type', 'application/octet-steam;charset=UTF-8')
			ctx.set('Content-Disposition', 'attachment; filename=' + Buffer.from(filename || 'file').toString('binary'))
			ctx.body = pipeRes.data
		} else {
			ctx.body = res.data
		}
	} catch (err) {
		console.log('err', err)
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
