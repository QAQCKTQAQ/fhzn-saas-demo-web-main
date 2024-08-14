/***
 * 文件下载
 */

const API = require('../utils/api-map')
const axios = require('axios')
const getHeaders = require('../utils/header')
module.exports = {
	// 下载文件
	downloadCode: (data, ctx) => {
		return axios({
			method: 'get',
			url: API(`/aicp/files/${data}/url`),
			data,
			headers: getHeaders(ctx)
		})
	},
	// 下载文件 fileCode + relativeFilePath
	downloadRelativeFilePathCode: (data, ctx) => {
		const { fileCode, ...rest } = data
		return axios({
			method: 'get',
			url: API(`/aicp/files/${fileCode}/relativeFilePath/url`),
			params: rest,
			headers: getHeaders(ctx)
		})
	},
	download: (url, ctx) => {
		return axios({
			method: 'get',
			url,
			responseType: 'stream',
			headers: getHeaders(ctx),
			maxBodyLength: Infinity
		})
	},
	// 训练模型
	modelsDownLoad: (data, ctx) => {
		let { id, paths } = data
		paths = decodeURIComponent(paths).split(',')
		return axios({
			// timeout: 60000,
			method: 'post',
			url: API('/aicp/training/outputs/download'),
			data: { id, paths },
			responseType: 'stream',
			headers: getHeaders(ctx),
			maxBodyLength: Infinity
		})
	}
}
