import { createContext, useReducer } from 'react'

import { initialState, reducer, CHECKED_KEYS } from './index'

interface ContextProps {
	state?: any
	setCheckedKeys?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)

	// 设置左侧tree选中YJ
	const setCheckedKeys = (checkedKeys: string[]) => {
		dispatch({
			type: CHECKED_KEYS,
			checkedKeys
		})
	}

	return <Context.Provider value={{ state, setCheckedKeys }}>{props.children}</Context.Provider>
}
