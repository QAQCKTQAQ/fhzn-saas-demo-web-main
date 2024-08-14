/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-01 17:53:05
 */
import { createContext, useReducer, useEffect } from 'react'
import { initialState, reducer, query, DICT } from './index'
import { transitionArrKey, transitionArrToMap } from '@/utils/util'
import { getTagsDicts } from '@/api/modules/common'

interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	useEffect(() => {
		getTraningStatusTypeToState()
	}, [])
	const [state, dispatch] = useReducer(reducer, initialState)

	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}

	// 训练状态枚举值
	const getTraningStatusTypeToState = async () => {
		const res: any = await getTagsDicts({
			type: 'training-status',
			page: 1,
			pageSize: 1000
		})
		dispatch({
			type: DICT,
			dicts: {
				traningStatusTypes: transitionArrKey(res?.items || []),
				traningStatusTypeMap: transitionArrToMap(res?.items || [])
			}
		})
	}
	return <Context.Provider value={{ state, dispatch, queryList }}>{props.children}</Context.Provider>
}
