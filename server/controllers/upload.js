// 文件上传
const { upload } = require('../service/upload')

module.exports = async ctx => {
	try {
		const { file } = ctx.request.files
		const { source } = ctx.request.body
		// 格式处理
		const res = await upload({ fields: { source }, files: { file } }, ctx)
		const { data } = res || {}
		ctx.body = data
	} catch (err) {
		console.log('err', err)
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
