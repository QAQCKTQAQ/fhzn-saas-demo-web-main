/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-09 09:37:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-09 17:06:39
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, BASE_INFO, IMAGE_INFO, PARAM_INFO, DEPLOY_INFO, DETAIL_INFO, OUTDATA, INDATA } from './index'
import { useParams } from 'react-router-dom'
import { getMkyjDetail, getYjDefinitionsConfig, getYjDefinitionsSchema } from '@/api/modules/szyj-manage'
interface ContextProps {
	state?: any
	setBaseInfo?: any
	setImageInfo?: any
	setParamInfo?: any
	setDeployInfo?: any
	setOutData?: any
	setInData?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			getDetailData(id)
			// getYjCommConfig(10)
			// getYjCommSchema(10)
		}
	}, [id])

	const getDetailData = (id: any) => {
		getMkyjDetail(id).then((res: any) => {
			const data = res || {}
			dispatch({ type: DETAIL_INFO, detailInfo: data })
			setBaseInfo(data)
		})
	}

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
	// 设置yj输入
	const setInData = (inData: any) => {
		dispatch({
			type: INDATA,
			inData
		})
	}
	// 设置yj输出
	const setOutData = (outData: any) => {
		dispatch({
			type: OUTDATA,
			outData
		})
	}
	// 获取YJ通信配置信息
	const getYjCommConfig = (levelId: any) => {
		getYjDefinitionsConfig({ levelId: levelId }).then((res: any) => {
			const data = res || []
			let yjList: any = data
			yjList.map((item: any) => {
				let yjOutputList: any = []
				let yjInputList: any = []
				let outData: any = []
				let inData: any = []
				if (item.id == id) {
					yjOutputList = item.outputs
					yjInputList = item.inputs
					// 获取yj输入
					inData = findArr(yjOutputList, yjList, 'in')
					// 获取yj输出
					outData = findArr(yjInputList, yjList, 'out')
					setOutData(outData)
					setInData(inData)
					console.log(outData, 'outData')
					console.log(inData, 'inData')
				}
			})
		})
	}
	// 匹配当前yj的输入输出
	const findArr = (cur: any, pos: any, type: any) => {
		let arr: any = []
		pos.map((item: any, index: any) => {
			let data = type === 'in' ? item.inputs : item.outputs
			for (let i = 0; i <= data.length - 1; i++) {
				for (let j = 0; j <= cur.length - 1; j++) {
					if (cur[j].name == data[i].name) {
						arr.push(item)
					}
				}
			}
		})
		return arr
	}
	// 获取topic信息
	const getYjCommSchema = (levelId: any) => {
		getYjDefinitionsSchema({ levelId: levelId }).then((res: any) => {
			const data = res || {}
			console.log(data)
		})
	}

	return (
		<Context.Provider value={{ state, setBaseInfo, setImageInfo, setParamInfo, setDeployInfo, setInData, setOutData }}>
			{props.children}
		</Context.Provider>
	)
}
