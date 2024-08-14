import { createContext, useReducer } from 'react'

import { initialState, reducer, query } from './index'

interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}
	return <Context.Provider value={{ state, dispatch, queryList }}>{props.children}</Context.Provider>
}
