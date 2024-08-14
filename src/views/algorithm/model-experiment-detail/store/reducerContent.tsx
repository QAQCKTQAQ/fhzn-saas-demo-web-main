/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-13 14:17:28
 */
import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, DETAIL_DATA } from './index'
import { useParams } from 'react-router-dom'
import { getTrainDetailApi } from '@/api/modules/algorithm'
import {
	getCodeDetailApi,
	getImageDetailApi,
	getDataSetDetailApi,
	getModeltDetailApi,
	getModelTestIndicatorsApi
} from '@/api/modules/common'
interface ContextProps {
	state?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const { id } = useParams()
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		if (id) {
			getDetailData(id)
		}
	}, [id])

	const getDetailData = async (id: any) => {
		const deatilRes: any = await getTrainDetailApi(id)
		dispatch({ type: DETAIL_DATA, detailData: deatilRes })
		const { envImageId, dataset, algorithm, model } = deatilRes || {}
		const trainId = dataset?.id
		const codeId = algorithm?.id
		const modelId = model?.id
		const modelVersion = model?.version
		const resCode = await getCodeDetailApi(codeId)
		const resImage = await getImageDetailApi(envImageId)
		const resDataSet = await getDataSetDetailApi(trainId)
		const resModel = await getModeltDetailApi(modelId, modelVersion)
		const resIndicatorsDetails = await getModelTestIndicatorsApi(id)
		const codeName = resCode?.name || ''
		const imageName = resImage?.name || ''
		const dataSetName = resDataSet?.name || ''
		const modelName = resModel?.name || ''
		dispatch({
			type: DETAIL_DATA,
			detailData: { ...deatilRes, ...resIndicatorsDetails, codeName, imageName, dataSetName, modelName }
		})
	}

	return <Context.Provider value={{ state }}>{props.children}</Context.Provider>
}
