import { createContext, useReducer } from 'react'

import { initialState, reducer, query, TREE_SELECT_KEY } from './index'

interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
	setSelectKeys?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}

	// 设置左侧目录选中keys
	const setSelectKeys = (selectKeys: any) => {
		dispatch({
			type: TREE_SELECT_KEY,
			selectKeys
		})
	}
	return <Context.Provider value={{ state, dispatch, queryList, setSelectKeys }}>{props.children}</Context.Provider>
}
