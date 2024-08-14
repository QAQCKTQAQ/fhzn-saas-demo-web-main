/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'
import { filesQueryApi } from '@/api/modules/data-manage'

const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'
//列表选中
export const SELECTEDROWKEYS = 'SELECTEDROWKEYS'
// 文件类型
export const FOLDER_TYPE = 'FOLDER_TYPE'

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
	filesQueryApi(newParams)
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
	selectedRowKeys: [],
	folderType: '' // 当前目录的类型
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
		case SELECTEDROWKEYS:
			state.selectedRowKeys = action.selectedRowKeys
			break
		case FOLDER_TYPE:
			state.folderType = action.folderType
			break
		default:
			return state
	}
})
