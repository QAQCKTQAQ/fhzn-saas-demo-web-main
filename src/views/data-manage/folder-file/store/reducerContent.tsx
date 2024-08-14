import { createContext, useReducer } from 'react'
// import { useParams } from 'react-router-dom'
import { initialState, reducer, query, SELECTEDROWKEYS, FOLDER_TYPE } from './index'
interface ContextProps {
	state?: any
	dispatch?: any
	queryList?: any
	routerId?: string
	setSelectedRowKeys?: any
	setFolderType?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	// 由于文件夹,文件可以无限嵌套，通过监听路由中id的变化更新数据
	const { id: routerId } = props
	const [state, dispatch] = useReducer(reducer, initialState)
	const queryList = (params?: any) => {
		return query(params)(dispatch, state.list.params)
	}
	// 设置选中
	const setSelectedRowKeys = (selectedRowKeys: any[]) => {
		dispatch({ type: SELECTEDROWKEYS, selectedRowKeys })
	}
	// 设置文件类型
	const setFolderType = (folderType: string) => {
		dispatch({ type: FOLDER_TYPE, folderType })
	}

	return (
		<Context.Provider value={{ state, dispatch, queryList, setFolderType, routerId, setSelectedRowKeys }}>
			{props.children}
		</Context.Provider>
	)
}
