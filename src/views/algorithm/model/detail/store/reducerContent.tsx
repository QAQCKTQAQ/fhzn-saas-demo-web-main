import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, BASE_INFO, DICT } from './index'
import { transitionArrKey, transitionArrToMap } from '@/utils/util'
import { getTagsDicts } from '@/api/modules/common'

interface ContextProps {
	state?: any
	dispatch?: any
	setBaseInfo?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		getTraningStatusTypeToState()
	}, [])

	// 设置基础信息
	const setBaseInfo = (baseInfo: any) => {
		dispatch({
			type: BASE_INFO,
			baseInfo
		})
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

	return <Context.Provider value={{ state, dispatch, setBaseInfo }}>{props.children}</Context.Provider>
}
