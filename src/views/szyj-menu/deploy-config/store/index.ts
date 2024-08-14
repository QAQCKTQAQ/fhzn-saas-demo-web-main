/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

/***
 * 初始化state
 */
export const initialState = {}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		default:
			return state
	}
})
