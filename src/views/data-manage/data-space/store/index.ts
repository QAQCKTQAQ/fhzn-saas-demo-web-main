/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-21 14:59:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-27 14:42:08
 */
/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */
// import { dataBackfirst, dataBackSecond, dataBackThird, dataBackFourth } from '../data'
import produce from 'immer'
// import { queryMKSZYJListApi } from '@/api/modules/szyj-manage'
import { filesQueryApi } from '@/api/modules/data-manage'
// import { pickBy } from 'lodash'
const QUERY = 'QUERY'
const FETCHING = 'FETCHING'
const REJECTED = 'REJECTED'
// tree选中
export const TREE_SELECT_NODE = 'TREE_SELECT_NODE'

// 文件夹点击
export const FILE_FOLDER_ID_LIST = 'FILE_FOLDER_ID_LIST'

// 勾选文件
export const CHECK_BOX_LIST = 'CHECK_BOX_LIST'
// 空间类型枚举值
export const DICT = 'DICT'
// 路由记录
export const PATH_ROUTE_LIST = 'PATH_ROUTE_LIST'

// 响应数据处理为state格式
const handleResToState = (data: any) => {
	const { items = [], params, ...rest } = data
	items
	const { id, spaceId } = params
	spaceId
	id
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
		pageSize: 20,
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
	fileFolderIdList: [],
	checkBoxList: [],
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
		case TREE_SELECT_NODE:
			state.selectNode = action.selectNode
			break
		case FILE_FOLDER_ID_LIST:
			state.fileFolderIdList = action.fileFolderIdList
			break
		case CHECK_BOX_LIST:
			state.checkBoxList = action.checkBoxList
			break
		case PATH_ROUTE_LIST:
			state.pathRouteList = action.pathRouteList
			break
		case DICT:
			state.dicts = { ...state.dicts, ...action.dicts }
			break
		default:
			return state
	}
})
