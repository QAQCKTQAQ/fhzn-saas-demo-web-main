/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const BASE_INFO = 'BASE_INFO'
export const IMAGE_INFO = 'IMAGE_INFO'
export const PARAM_INFO = 'PARAM_INFO'
export const DEPLOY_INFO = 'DEPLOY_INFO'

/***
 * 初始化state
 */
export const initialState = {
	baseInfo: {},
	imageInfo: {},
	paramInfo: {},
	deployInfo: {}
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case BASE_INFO:
			state.baseInfo = action.baseInfo
			break
		case IMAGE_INFO:
			state.imageInfo = action.imageInfo
			break
		case PARAM_INFO:
			state.paramInfo = action.paramInfo
			break
		case DEPLOY_INFO:
			state.deployInfo = action.deployInfo
			break
		default:
			return state
	}
})
