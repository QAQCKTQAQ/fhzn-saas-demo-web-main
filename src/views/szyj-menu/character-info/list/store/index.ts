/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'
import { characterInfoListApi } from '@/api/modules/szyj-manage'
import { pickBy } from 'lodash'

const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'
// tree选中
export const TREE_SELECT_NODE = 'TREE_SELECT_NODE'
// 列表选中
export const SELECTEDROWKEYS = 'SELECTEDROWKEYS'
export const PROXYTYPEMAP = 'PROXYTYPEMAP'
export const PROXYTARGETTYPEMAP = 'PROXYTARGETTYPEMAP'
export const MODELFORMMAP = 'MODELFORMMAP'
export const MODELTYPEMAP = 'MODELTYPEMAP'

// 响应数据处理为state格式
const handleResToState = (data: any) => {
	const { items = [], params, ...rest } = data
	return {
		dataSource: items,
		params,
		pageInfo: rest,
		proxyTypeMap: {},
		proxyTargetTypeMap: {},
		modelFormMap: {},
		modelTypeMap: {}
	}
}

export const query = (params: any) => (dispatch: any, getState: any) => {
	let newParams = !params ? getDefaultParams() : { ...getState, ...params }
	dispatch({ type: FETCHING })
	characterInfoListApi(pickBy(newParams, value => value))
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
	selectNode: {},
	selectedRowKeys: []
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
		case TREE_SELECT_NODE:
			state.selectNode = action.selectNode
			break
		case SELECTEDROWKEYS:
			state.selectedRowKeys = action.selectedRowKeys
			break
		case PROXYTYPEMAP:
			state.proxyTypeMap = action.proxyTypeMap
			break
		case PROXYTARGETTYPEMAP:
			state.proxyTargetTypeMap = action.proxyTargetTypeMap
			break
		case MODELFORMMAP:
			state.modelFormMap = action.modelFormMap
			break
		case MODELTYPEMAP:
			state.modelTypeMap = action.modelTypeMap
			break
		default:
			return state
	}
})
