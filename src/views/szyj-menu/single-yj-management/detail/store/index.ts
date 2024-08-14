/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const BASE_INFO = 'BASE_INFO'
export const IMAGE_INFO = 'IMAGE_INFO'
export const PARAM_INFO = 'PARAM_INFO'
export const DEPLOY_INFO = 'DEPLOY_INFO'
export const DETAIL_INFO = 'DETAIL_INFO'
export const INDATA = 'INDATA'
export const OUTDATA = 'OUTDATA'

/***
 * 初始化state
 */
export const initialState = {
	baseInfo: {},
	imageInfo: {},
	paramInfo: {},
	deployInfo: {},
	detailInfo: {},
	inData: [],
	outData: []
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
		case DETAIL_INFO:
			state.detailInfo = action.detailInfo
			break
		case OUTDATA:
			state.outData = action.outData
			break
		case INDATA:
			state.inData = action.inData
			break
		default:
			return state
	}
})
