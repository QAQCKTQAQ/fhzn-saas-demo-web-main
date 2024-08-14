import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, query, DICT, BASE_INFO } from './index'
import { transitionArrKey, transitionArrToMap } from '@/utils/util'
import { dataSetVersionDetailApi } from '@/api/modules/data-set'
import { useSearchParams } from 'react-router-dom'
import { getTagsDicts } from '@/api/modules/common'
interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
	setBaseInfo?: any
	getVersionDetail?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [search] = useSearchParams()
	const id = search.get('id')
	const version = search.get('version')
	const name = search.get('name')
	const [state, dispatch] = useReducer(reducer, initialState)

	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}

	useEffect(() => {
		getVersionDetail()
		getDataSetTagsToState()
	}, [])

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

	// 设置版本基础信息
	const setBaseInfo = (baseInfo: any) => {
		dispatch({
			type: BASE_INFO,
			baseInfo
		})
	}

	const getVersionDetail = () => {
		dataSetVersionDetailApi({ id, version }).then((res: any) => {
			const data = res || {}
			setBaseInfo({ ...data, name })
		})
	}
	return (
		<Context.Provider value={{ state, dispatch, queryList, getVersionDetail, setBaseInfo }}>{props.children}</Context.Provider>
	)
}
