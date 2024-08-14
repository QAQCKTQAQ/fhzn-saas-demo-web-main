/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const EDITABLE = 'EDITABLE'
export const CONFIG_INFO = 'CONFIG_INFO'

/***
 * 初始化state
 */
export const initialState = {
	editable: false,
	configInfo: []
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case EDITABLE:
			state.editable = action.editable
			break
		case CONFIG_INFO:
			state.configInfo = action.configInfo
			break
		default:
			return state
	}
})
