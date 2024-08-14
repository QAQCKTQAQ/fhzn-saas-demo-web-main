/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 10:35:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-09 14:40:58
 */
/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'
import { dataSetDetailsMap } from '@/api/modules/data-set'
const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'
//列表选中
export const SELECTEDROWKEYS = 'SELECTEDROWKEYS'
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
	const { id, ...rest } = newParams
	dispatch({ type: FETCHING })
	dataSetDetailsMap(id, rest)
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
		page: 1
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
	selectedRowKeys: []
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case QUERY:
			state.list = action.payload
			state.loading = false
			break
		case FETCHING:
			state.loading = true
			break
		case REJECTED:
			state.loading = false
			break
		default:
			return state
	}
})
