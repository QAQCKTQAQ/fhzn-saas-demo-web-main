/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-19 15:36:43
 */
/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

export const DD_LIST = 'DD_LIST'
export const SELECT_DD_ID = 'SELECT_DD_ID'
export const SELECT_TIME = 'SELECT_TIME'

/***
 * 初始化state
 */
export const initialState = {
	dDList: [],
	selectDdId: {},
	selectTime: ''
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case DD_LIST:
			state.dDList = action.dDList
			break
		case SELECT_DD_ID:
			state.selectDdId = action.selectDdId
			break
		case SELECT_TIME:
			state.selectTime = action.selectTime
			break
		default:
			return state
	}
})
