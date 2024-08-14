import { createContext, useReducer } from 'react'
import { initialState, reducer, BASE_INFO } from './index'

interface ContextProps {
	state?: any
	dispatch?: any
	setBaseInfo?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)

	// 设置基础信息
	const setBaseInfo = (baseInfo: any) => {
		dispatch({
			type: BASE_INFO,
			baseInfo
		})
	}

	return <Context.Provider value={{ state, dispatch, setBaseInfo }}>{props.children}</Context.Provider>
}
