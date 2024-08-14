/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-01 10:56:20
 */
import { createContext, useEffect, useReducer } from 'react'
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
	const [state, dispatch] = useReducer(reducer, initialState)
	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}

	useEffect(() => {
		getDataSetTypesToState()
		getDataSetTagsToState()
	}, [])

	// 数据集类型
	const getDataSetTypesToState = async () => {
		const res: any = await getTagsDicts({
			type: 'dataset-type',
			page: 1,
			pageSize: 1000
		})
		dispatch({
			type: DICT,
			dicts: {
				dataSetTypes: transitionArrKey(res?.items || []),
				dataSettypeMap: transitionArrToMap(res?.items || [])
			}
		})
	}

	// 数据集标签
	const getDataSetTagsToState = async () => {
		const res: any = await getTagsDicts({
			type: 'dataset-tags',
			page: 1,
			pageSize: 1000
		})

		dispatch({
			type: DICT,
			dicts: {
				dataSetTags: transitionArrKey(res?.items || []),
				dataSetTagMap: transitionArrToMap(res?.items || [])
			}
		})
	}

	return <Context.Provider value={{ state, dispatch, queryList }}>{props.children}</Context.Provider>
}
