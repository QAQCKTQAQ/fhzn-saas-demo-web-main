// 代理中间件
const config = require('../../config/index')
module.exports =
	({ axios }) =>
	async ({ map, ctx }) => {
		const {
			method,
			path,
			request: { body },
			query
		} = ctx

		const headers = ctx.session?.nickname
			? {
					'X-Login-User': ctx.session.nickname
			  }
			: {}

		const opts = {
			method,
			url: map(path),
			params: query,
			data: body,
			headers: {
				...headers,
				'X-APP-CODE': config['X-APP-CODE']
			}
		}

		const contentType = ctx.get('content-type')
		if (contentType) {
			opts.headers = {
				...opts.headers,
				'content-type': contentType
			}
		}

		// 文件下载标识
		const isDownload = ctx.get('x-papaya-download') === 'download'
		if (isDownload) {
			opts.responseType = 'stream'
		}
		const res = await axios(opts)
		if (isDownload) {
			// 设置服务端返回的文件名和文件类型
			const fileContentDisposition = res.headers['content-disposition']
			const fileContentType = res.headers['content-type']

			if (fileContentDisposition) {
				ctx.set('content-disposition', fileContentDisposition)
			}
			if (fileContentType) {
				ctx.set('content-type', fileContentType)
			}
		}

		return res.data
	}
