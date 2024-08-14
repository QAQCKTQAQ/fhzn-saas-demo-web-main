/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

// 选择的字典分类
export const SELECT_TYPE = 'SELECT_TYPE'

/***
 * 初始化state
 */
export const initialState = {
	selectType: []
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case SELECT_TYPE:
			state.selectType = action.selectType
			break
		default:
			return state
	}
})
