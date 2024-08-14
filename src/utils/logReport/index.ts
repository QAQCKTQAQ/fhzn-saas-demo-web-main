/****
 * 公用的日志上报
 */

import { reportLogApi } from '@/api/modules/common'

// 设置业务模块到sessionStorage
export const setBusModule = (modules: any) => {
	sessionStorage.setItem('fhzn-bu-module', JSON.stringify(modules))
}
// 获取
export const getBusModule = () => {
	const module = sessionStorage.getItem('fhzn-bu-module')
	try {
		return (module && JSON.parse(module)) || []
	} catch (err) {
		return []
	}
}

/***
 * 上报日志接口
 * operation 上报操作
 * operationContent 操作内容
 * routerPath 当前路由
 */
export const LogReport = (operation: string, operationContent: string) => {
	try {
		const module = getBusModule()
		reportLogApi({ operation, operationContent, module: handleModuleToStr(module) })
	} catch (err) {
		console.log('err', err)
	}
}

// 业务模块对象处理为字符串
export const handleModuleToStr = (modules: any) => {
	const strArr = (modules || []).map((item: any) => item.title)
	return `【${strArr.join('-')}】`
}
