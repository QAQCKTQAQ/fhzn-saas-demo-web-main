/* eslint-disable prettier/prettier */
/***
 * 文件上传
 */

const API = require('../utils/api-map')
const axios = require('axios')
const uploader = require('../utils/transforFormData')
const getHeaders = require('../utils/header')

module.exports = {
	// 上传文件
	imageUpload: async (data, ctx) => {
		const formData = uploader.getFormData(data)
		return axios({
			method: 'post',
			url: API('/aicp/training/image/upload'),
			data: formData,
			headers: getHeaders(ctx),
			maxBodyLength: Infinity
		})
	}
}
