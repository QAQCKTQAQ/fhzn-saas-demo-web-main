/* eslint-disable prettier/prettier */
// 文件上传
const { imageUpload } = require('../service/image-upload')

module.exports = async ctx => {
	try {
		const { file } = ctx.request.files
		// 格式处理
		const res = await imageUpload({ files: { file } }, ctx)
		const { data } = res || {}
		ctx.body = data
	} catch (err) {
		console.log('err==', err)
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
