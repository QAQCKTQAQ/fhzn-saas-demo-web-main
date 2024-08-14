/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const BASE_INFO = 'BASE_INFO'
/***
 * 初始化state
 */
export const initialState = {
	baseInfo: {}
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case BASE_INFO:
			state.baseInfo = action.baseInfo
			break
		default:
			return state
	}
})
