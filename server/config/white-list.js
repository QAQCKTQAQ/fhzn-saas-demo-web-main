module.exports = {
	// 自定义接口路由白名单
	whiteList: ['/bff/auth/query', '/bff/login'],
	// 外部页面不做接口等校验
	outInterfaces: ['/szyj-menu/visual-more', '/szyj-menu/visual-data', '/szyj-menu/params-config', '/api/aicp/third-party'] // '/api/aicp/third-party'前缀为三方请求，不做登录校验
}
