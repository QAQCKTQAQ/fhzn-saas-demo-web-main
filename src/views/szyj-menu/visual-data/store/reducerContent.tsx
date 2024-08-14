import { createContext, useEffect, useReducer, useRef } from 'react'
import { DD_LIST, initialState, reducer, SELECT_TIME, ZZ_CG_ACTIVE } from './index'
import { getDDListApi, getTimeListApi } from '@/api/modules/visual-data'
import { useSearchParams } from 'react-router-dom'
import { isNull } from 'lodash'

interface ContextProps {
	state?: any
	testId?: any
	setZzCgActive?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [params] = useSearchParams()
	const testId: any = params.get('id') // 试验id

	const setTimeRef: any = useRef()
	useEffect(() => {
		clearTimeout(setTimeRef.current)
		initSelectTime()
		getDDList()
		return () => clearTimeout(setTimeRef.current)
	}, [])

	useEffect(() => {
		clearTimeout(setTimeRef.current)
		testId && initSelectTime()
	}, [testId])

	const initSelectTime = async () => {
		const selectTimeList: any = await getTimeList()
		// 当前最新时间戳
		const selectTime = (selectTimeList && selectTimeList[0]) || ''
		dispatch({ type: SELECT_TIME, selectTime })
		// 定时200ms 刷新数据
		// setTimeRef.current = setTimeout(() => {
		// 	initSelectTime()
		// }, 200)
	}

	// 设置zz活动面
	const setZzCgActive = (zzCgActive: any) => {
		dispatch({ type: ZZ_CG_ACTIVE, zzCgActive })
	}

	const handleDdList = (dDList: any) => {
		return dDList.map((item: any) => {
			const { instanceGroupId, isMain, groupId, isOffline } = item
			const isMainStr = isMain ? '主弹' : '从弹'
			const groupIdStr: any = groupId === undefined || isNull(groupId) ? '' : `群组编号(${groupId})-`

			return {
				value: `${instanceGroupId}`,
				label: `弹编号(${instanceGroupId})-${groupIdStr}${isMainStr}-${isOffline ? '下线' : '上线'}`,
				isOffline
			}
		})
	}

	// 获取DD列表
	const getDDList = async () => {
		const dDList: any = await getDDListApi({ id: testId })
		dispatch({ type: DD_LIST, dDList: handleDdList(dDList) })
	}

	// 获取时间戳列表
	const getTimeList = async () => {
		const res: any = await getTimeListApi(testId, {})
		const selectTimeList = res?.items || []
		return selectTimeList
	}

	return <Context.Provider value={{ state, testId, setZzCgActive }}>{props.children}</Context.Provider>
}
