/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'
import { userQueryApi } from '@/api/modules/user'
import { rsaDec } from '@/utils/util'

const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'

// 响应数据处理为state格式
const handleResToState = (data: any) => {
	const { items = [], params, ...rest } = data

	const decryptedItems = items.map((item: any) => {
		return {
			...item,
			password: item.password ? rsaDec(item.password) : item.password
		}
	})

	return {
		dataSource: decryptedItems,
		params,
		pageInfo: rest
	}
}

export const query = (params: any) => (dispatch: any, getState: any) => {
	let newParams = !params ? getDefaultParams() : { ...getState, ...params }
	dispatch({ type: FETCHING })
	userQueryApi(newParams)
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
	loading: false
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
		default:
			return state
	}
})
