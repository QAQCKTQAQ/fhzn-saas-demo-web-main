/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const CHECKED_KEYS = 'CHECKED_KEYS'

/***
 * 初始化state
 */
export const initialState = {
	checkedKeys: [
		'0-0-2',
		'0-0-1-2',
		'0-0-2-1',
		'0-0-1-2-1',
		'0-0-1-2-2',
		'0-0-1-2-3',
		'0-0-1-2-4',
		'0-0-1-2-5',
		'0-0-2-1-1',
		'0-0-2-1-2',
		'0-0-2-1-3',
		'0-0-1-1-1',
		'0-0-1-1',
		'0-0-1',
		'0-0'
	] // 选中的YJ
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case CHECKED_KEYS:
			state.checkedKeys = action.checkedKeys
			break
		default:
			return state
	}
})
