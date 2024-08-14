/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-09 09:37:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-26 10:28:09
 */
import { createContext, useReducer, useEffect } from 'react'
import { getTagsDicts } from '@/api/modules/common'
import {
	initialState,
	reducer,
	query,
	TREE_SELECT_NODE,
	FILE_FOLDER_ID_LIST,
	CHECK_BOX_LIST,
	DICT,
	PATH_ROUTE_LIST
} from './index'
import { transitionArrKey, transitionArrToMap } from '@/utils/util'
interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
	routerId?: string
	setSelectNode?: any
	setFileFolderIdList?: any
	setCheckBoxList?: any
	setPathRouteList?: any
	getDataSpaceTypeToState?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const { id: routerId } = props
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		getDataSpaceTypeToState()
	}, [])

	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}

	// 设置左侧目录选中Node
	const setSelectNode = (selectNode: any) => {
		dispatch({
			type: TREE_SELECT_NODE,
			selectNode
		})
	}
	// 设置点击的文件夹id
	const setFileFolderIdList = (fileFolderIdList: any) => {
		dispatch({
			type: FILE_FOLDER_ID_LIST,
			fileFolderIdList
		})
	}
	// 记录路由
	const setPathRouteList = (pathRouteList: any) => {
		dispatch({
			type: PATH_ROUTE_LIST,
			pathRouteList
		})
	}
	// 勾选文件
	const setCheckBoxList = (checkBoxList: any) => {
		dispatch({
			type: CHECK_BOX_LIST,
			checkBoxList
		})
	}
	// 空间类型枚举值
	const getDataSpaceTypeToState = async () => {
		const res: any = await getTagsDicts({
			type: 'data-space-type',
			page: 1,
			pageSize: 1000
		})
		dispatch({
			type: DICT,
			dicts: {
				dataSpaceTypes: transitionArrKey(res?.items || []),
				dataSpaceTypeMap: transitionArrToMap(res?.items || [])
			}
		})
	}
	return (
		<Context.Provider
			value={{
				state,
				routerId,
				dispatch,
				queryList,
				setSelectNode,
				setFileFolderIdList,
				setCheckBoxList,
				setPathRouteList
			}}
		>
			{props.children}
		</Context.Provider>
	)
}
