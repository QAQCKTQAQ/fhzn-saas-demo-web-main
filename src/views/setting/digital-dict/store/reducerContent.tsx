import { createContext, useReducer } from 'react'

import { initialState, reducer, SELECT_TYPE } from './index'

interface ContextProps {
	state?: any
	setSelectType?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)

	// 设置选中字典分类
	const setSelectType = (selectType: any) => {
		dispatch({
			type: SELECT_TYPE,
			selectType
		})
	}

	return <Context.Provider value={{ state, setSelectType }}>{props.children}</Context.Provider>
}
