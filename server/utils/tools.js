const tools = {
	normalizePort: val => {
		const port = parseInt(val, 10)
		if (Number.isNaN(port)) {
			return val
		}
		if (port >= 0) {
			return port
		}
		return false
	},
	getFileNameByPath: function (path) {
		let index = path.lastIndexOf('/') // lastIndexOf("/")  找到最后一个  /  的位置
		const fileName = path.substr(index + 1) // substr() 截取剩余的字符，即得文件名xxx.doc
		return fileName
	},
	// 获取ip地址
	getUserIp: function (req) {
		return `${
			req?.headers['x-forwarded-for'] ||
			req?.connection?.remoteAddress ||
			req.socket?.remoteAddress ||
			req?.connection?.socket?.remoteAddress ||
			''
		}`.replace('::ffff:', '')
	}
}

module.exports = tools
