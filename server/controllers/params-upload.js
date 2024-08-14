// 文件上传
const { pickBy } = require('lodash')
const { upload } = require('../service/params-upload')

module.exports = async ctx => {
	try {
		const { file } = ctx.request.files
		const { serviceDefinitionId, configId } = ctx.request.body
		const fields = pickBy({ serviceDefinitionId, configId }, value => value)
		// 格式处理
		const res = await upload({ fields, files: { file } }, ctx)
		const { data } = res || {}
		ctx.body = data
	} catch (err) {
		console.log('err', err)
		ctx.body = { code: '9999', message: '系统异常，请稍后重试！' }
	}
}
