import { createContext, useReducer } from 'react'

import {
	initialState,
	reducer,
	query,
	TREE_SELECT_NODE,
	SELECTEDROWKEYS,
	PROXYTYPEMAP,
	PROXYTARGETTYPEMAP,
	MODELFORMMAP,
	MODELTYPEMAP
} from './index'

interface ContextProps {
	state?: any
	setSelectedRowKeys?: any
	queryList?: any
	setSelectNode?: any
	setProxyTypeMap?: any
	setProxyTargetTypeMap?: any
	setModelFormMap?: any
	setModelTypeMap?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
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
	// 设置选中
	const setSelectedRowKeys = (selectedRowKeys: any[]) => {
		dispatch({ type: SELECTEDROWKEYS, selectedRowKeys })
	}

	const setProxyTypeMap = (proxyTypeMap: any[]) => {
		dispatch({ type: PROXYTYPEMAP, proxyTypeMap })
	}

	const setProxyTargetTypeMap = (proxyTargetTypeMap: any[]) => {
		dispatch({ type: PROXYTARGETTYPEMAP, proxyTargetTypeMap })
	}

	const setModelFormMap = (modelFormMap: any[]) => {
		dispatch({ type: MODELFORMMAP, modelFormMap })
	}

	const setModelTypeMap = (modelTypeMap: any[]) => {
		dispatch({ type: MODELTYPEMAP, modelTypeMap })
	}

	return (
		<Context.Provider
			value={{
				state,
				queryList,
				setSelectNode,
				setSelectedRowKeys,
				setProxyTypeMap,
				setProxyTargetTypeMap,
				setModelFormMap,
				setModelTypeMap
			}}
		>
			{props.children}
		</Context.Provider>
	)
}
