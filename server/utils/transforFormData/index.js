const fs = require('fs')
const FormData = require('form-data')
const _ = require('lodash')
// 转为 formData
module.exports = {
	getFormData: ({ fields, files }) => {
		const form = new FormData()

		_.isObject(fields) &&
			Object.keys(fields).forEach(field => {
				field && form.append(field, fields[field])
			})

		_.isObject(files) &&
			Object.keys(files).forEach(fileName => {
				const filesGroup = files[fileName]
				;[].concat(filesGroup).forEach(file => {
					form.append(fileName, fs.createReadStream(file.filepath), file.originalFilename)
				})
			})

		return form
	}
}
