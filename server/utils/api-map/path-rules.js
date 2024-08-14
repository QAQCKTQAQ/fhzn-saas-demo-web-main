const { backendMap, authMap } = require('../../config/index')
module.exports = [
	{
		match: path => {
			if (path && (path.startsWith('/auth-service/') || path.startsWith('/gateway/'))) {
				return true
			}
		},
		host: authMap
	},
	{
		match: path => {
			if (path && path.startsWith('/aicp/training')) {
				return true
			}
		},
		host: backendMap
	},
	{
		match: path => {
			if (path && path.startsWith('/dataset/')) {
				return true
			}
		},
		host: backendMap
	},
	{
		host: backendMap
	}
]
