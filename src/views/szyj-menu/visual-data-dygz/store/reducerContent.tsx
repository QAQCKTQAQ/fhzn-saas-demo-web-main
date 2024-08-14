import { createContext, useEffect, useReducer, useRef } from 'react'
import { DD_LIST, initialState, reducer, SELECT_DD_ID, SELECT_TIME } from './index'
import { getDDListApi, getTimeListApi } from '@/api/modules/visual-data'
import { useSearchParams } from 'react-router-dom'

interface ContextProps {
	state?: any
	setSelectDdId?: any
	testId?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [params] = useSearchParams()
	const testId: any = params.get('id') // 试验id

	const setTimeRef: any = useRef()

	const setSelectDdId = (selectDdId: any) => {
		dispatch({ type: SELECT_DD_ID, selectDdId })
	}

	useEffect(() => {
		clearTimeout(setTimeRef.current)
		initSelectTime()
		getDDList()
		return () => clearTimeout(setTimeRef.current)
	}, [])

	const initSelectTime = async () => {
		const selectTimeList: any = await getTimeList()
		// 当前最新时间戳
		const selectTime = (selectTimeList && selectTimeList[0]) || ''
		dispatch({ type: SELECT_TIME, selectTime })
		// 定时200ms 刷新数据
		setTimeRef.current = setTimeout(() => {
			initSelectTime()
		}, 200)
	}

	// 获取DD列表
	const getDDList = async () => {
		const dDList: any = await getDDListApi({ id: testId })
		dispatch({ type: DD_LIST, dDList })
		const selectDd = dDList?.length ? dDList[0] : {}
		setSelectDdId(selectDd)
	}

	// 获取时间戳列表
	const getTimeList = async () => {
		const res: any = await getTimeListApi(testId, {})
		const selectTimeList = res?.items || []
		return selectTimeList
	}

	return <Context.Provider value={{ state, setSelectDdId, testId }}>{props.children}</Context.Provider>
}
