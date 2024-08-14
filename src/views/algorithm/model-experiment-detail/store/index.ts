/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

// 详情数据
export const DETAIL_DATA = 'DETAIL_DATA'

/***
 * 初始化state
 */
export const initialState = {
	loading: false,
	detailData: {}
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case DETAIL_DATA:
			state.detailData = action.detailData
			break
		default:
			return state
	}
})
