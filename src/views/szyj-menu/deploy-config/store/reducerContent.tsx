import { createContext, useReducer } from 'react'
import { initialState, reducer } from './index'
interface ContextProps {
	state?: any
	dispatch?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
}
