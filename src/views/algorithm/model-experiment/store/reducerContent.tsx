/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-09-06 10:09:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-08 13:43:58
 */
import { createContext, useReducer, useEffect } from 'react'
import { initialState, reducer, query, DICT } from './index'
import { getTagsDicts } from '@/api/modules/common'
import { transitionArrKey, transitionArrToMap } from '@/utils/util'
interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	useEffect(() => {
		getCodeTypeToState()
	}, [])
	// 算法类别
	const getCodeTypeToState = async () => {
		const res: any = await getTagsDicts({
			type: 'model-type',
			page: 1,
			pageSize: 1000
		})
		dispatch({
			type: DICT,
			dicts: {
				codeTypes: transitionArrKey(res?.items || []),
				codeTypesMap: transitionArrToMap(res?.items || [])
			}
		})
	}
	const [state, dispatch] = useReducer(reducer, initialState)
	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}
	return <Context.Provider value={{ state, dispatch, queryList }}>{props.children}</Context.Provider>
}
