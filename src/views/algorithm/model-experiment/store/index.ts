/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-10 14:29:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-13 15:57:16
 */
/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'
import { taskQueryApi } from '@/api/modules/algorithm'

const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'
export const DICT = 'DICT'

// 响应数据处理为state格式
const handleResToState = (data: any) => {
	const { items = [], params, ...rest } = data
	return {
		dataSource: items,
		params,
		pageInfo: rest
	}
}

export const query = (params: any) => (dispatch: any, getState: any) => {
	let newParams = !params ? getDefaultParams() : { ...getState, ...params }
	dispatch({ type: FETCHING })
	taskQueryApi(newParams)
		.then(res => {
			dispatch({
				type: QUERY,
				payload: handleResToState({ ...(res || {}), params: newParams })
			})
		})
		.finally(() => {
			dispatch({ type: REJECTED })
		})
}

/***
 * 默认参数
 */
const getDefaultParams = () => {
	return {
		pageSize: 10,
		page: 1,
		type: 2
	}
}

/***
 * 初始化state
 */
export const initialState = {
	list: {
		params: getDefaultParams(),
		dataSource: [],
		pageInfo: {}
	},
	loading: false,
	dicts: {}
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case QUERY:
			state.list = action.payload
			break
		case FETCHING:
			state.loading = true
			break
		case REJECTED:
			state.loading = false
			break
		case DICT:
			state.dicts = { ...state.dicts, ...action.dicts }
			break
		default:
			return state
	}
})
