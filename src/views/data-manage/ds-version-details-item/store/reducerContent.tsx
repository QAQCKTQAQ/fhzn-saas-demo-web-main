/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-19 14:45:38
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-07 14:29:36
 */
import { createContext, useEffect, useReducer } from 'react'
import {
	initialState,
	reducer,
	FILE_DETAIL_DATA,
	FILE_LABEL_DATA,
	// FILE_PREV_ID,
	// FILE_NEXT_ID,
	ORIGINAL_IMAGE_INFO,
	IMAGE_LABEL,
	FILE_LABEL_TYPE
} from './index'
import { useSearchParams } from 'react-router-dom'
import { fileDetaiilApi, spaceDetaiilApi } from '@/api/modules/data-manage'
// import { fileNextIdApi, filePrevIdApi } from '@/api/modules/data-manage'
interface ContextProps {
	state?: any
	setOriginalImageInfo?: any
	setImageLabel?: any
	setFileLabelData?: any
	setFileDetailData?: any
	setLabelType?: any
	from?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [params] = useSearchParams()
	const id = params.get('id') || ''
	const from = params.get('from') || ''
	const fileId = params.get('fileId') || ''
	const version = params.get('version') || ''

	// 初始化详情数据
	useEffect(() => {
		if (id) {
			// getFilePrevId()
			// getFileNextId()
			getFileDetail()
		}
	}, [id])

	// 获取当前文件信息
	const getFileDetail = () => {
		let getApi: any = from == 'space' ? spaceDetaiilApi(id) : fileDetaiilApi(id, version, fileId)
		getApi.then((res: any) => {
			setFileDetailData(res)
		})
	}

	const setFileDetailData = (fileDetailData: any) => {
		dispatch({ type: FILE_DETAIL_DATA, fileDetailData })
	}

	// 获取上一个文件信息
	// const getFilePrevId = () => {
	// 	filePrevIdApi(id, { parentId }).then(res => {
	// 		const { id: prevId } = res || {}
	// 		dispatch({ type: FILE_PREV_ID, prevId })
	// 	})
	// }
	// 获取下一个文件信息
	// const getFileNextId = () => {
	// 	fileNextIdApi(id, { parentId }).then(res => {
	// 		const { id: nextId } = res || {}
	// 		dispatch({ type: FILE_NEXT_ID, nextId })
	// 	})
	// }

	// reducer 设置原始图片信息
	const setOriginalImageInfo = (originalImageInfo: any) => {
		dispatch({ type: ORIGINAL_IMAGE_INFO, originalImageInfo })
	}

	// reducer 设置标注信息
	const setImageLabel = (imageLabel: any) => {
		dispatch({ type: IMAGE_LABEL, imageLabel })
	}

	// reducer 根据文件解析后保存标注信息
	const setFileLabelData = (fileLabelData: string) => {
		dispatch({ type: FILE_LABEL_DATA, fileLabelData })
	}

	// 设置标注文件类型
	const setLabelType = (labelType: any) => {
		dispatch({ type: FILE_LABEL_TYPE, labelType })
	}

	return (
		<Context.Provider
			value={{ state, setOriginalImageInfo, setFileDetailData, setImageLabel, setFileLabelData, setLabelType, from }}
		>
			{props.children}
		</Context.Provider>
	)
}
