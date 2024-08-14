import { createContext, useReducer } from 'react'
import { initialState, reducer, BASE_INFO, IMAGE_INFO, PARAM_INFO, DEPLOY_INFO } from './index'
interface ContextProps {
	state?: any
	setBaseInfo?: any
	setImageInfo?: any
	setParamInfo?: any
	setDeployInfo?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)

	// 设置基础信息
	const setBaseInfo = (baseInfo: any) => {
		dispatch({
			type: BASE_INFO,
			baseInfo
		})
	}
	// 设置构建镜像信息
	const setImageInfo = (imageInfo: any) => {
		dispatch({
			type: IMAGE_INFO,
			imageInfo
		})
	}
	// 设置构建镜像信息
	const setParamInfo = (paramInfo: any) => {
		dispatch({
			type: PARAM_INFO,
			paramInfo
		})
	}

	// 设置构建镜像信息
	const setDeployInfo = (deployInfo: any) => {
		dispatch({
			type: DEPLOY_INFO,
			deployInfo
		})
	}

	return (
		<Context.Provider value={{ state, setBaseInfo, setImageInfo, setParamInfo, setDeployInfo }}>
			{props.children}
		</Context.Provider>
	)
}
