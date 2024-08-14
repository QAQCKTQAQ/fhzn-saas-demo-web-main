/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 10:35:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-20 10:35:16
 */
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
