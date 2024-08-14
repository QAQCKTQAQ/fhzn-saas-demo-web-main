import { createContext, useReducer } from 'react'
import {
	CANVAS_CROSS_ON_ACTION,
	IMAGE_DRAG_ACTION,
	LABEL_RECT_ON_ACTION,
	LABEL_RECT_RESULT_LIST_ACTION,
	initialState,
	reducer
} from './index'
interface ContextProps {
	state?: any
	extraInfo?: any
	setDrag?: any
	setRectOn?: any
	setLabelResultList?: any
	setCrossOn?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const { extraInfo } = props

	const [state, dispatch] = useReducer(reducer, initialState)

	// 设置拖动
	const setDrag = (drag: boolean) => {
		dispatch({
			type: IMAGE_DRAG_ACTION,
			drag
		})
	}

	// 设置rect框
	const setRectOn = (rectOn: boolean) => {
		dispatch({
			type: LABEL_RECT_ON_ACTION,
			rectOn
		})
	}

	// 设置标注信息列表
	const setLabelResultList = (labelResultList: any) => {
		dispatch({
			type: LABEL_RECT_RESULT_LIST_ACTION,
			labelResultList
		})
	}

	// 设置全屏
	const setCrossOn = (crossOn: boolean) => {
		dispatch({
			type: CANVAS_CROSS_ON_ACTION,
			crossOn
		})
	}
	return (
		<Context.Provider value={{ state, setDrag, setRectOn, setLabelResultList, setCrossOn, extraInfo }}>
			{props.children}
		</Context.Provider>
	)
}
