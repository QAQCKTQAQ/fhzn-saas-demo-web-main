import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, EDITABLE, CONFIG_INFO } from './index'
import { useSearchParams } from 'react-router-dom'
import { getConfigParamsApi } from '@/api/modules/szyj-manage'
import { pickBy } from 'lodash'
interface ContextProps {
	state?: any
	setEditable?: any
	serviceDefinitionId?: any
	setConfigInfo?: any
	configId?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [searchParams] = useSearchParams()
	const serviceDefinitionId = searchParams.get('serviceDefinitionId')
	const configId = searchParams.get('configId')
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		getConfigInfo({ serviceDefinitionId, configId })
	}, [serviceDefinitionId, configId])

	const getConfigInfo = (params: any) => {
		const data = pickBy(params, value => value)
		getConfigParamsApi(data).then((res: any) => {
			setConfigInfo(res || [])
		})
	}

	const setConfigInfo = (configInfo: any) => {
		dispatch({
			type: CONFIG_INFO,
			configInfo
		})
	}

	const setEditable = (editable: boolean) => {
		dispatch({
			type: EDITABLE,
			editable
		})
	}

	return (
		<Context.Provider value={{ state, setEditable, serviceDefinitionId, configId, setConfigInfo }}>
			{props.children}
		</Context.Provider>
	)
}
