import { createContext, useEffect, useReducer } from 'react'
import { initialState, reducer, IMAGE_DATA } from './index'
interface ContextProps {
	state?: any
	setImageData?: any
	imageInfo?: any
}

export const Context = createContext<ContextProps>({})

export function ReducerContent(props: any) {
	const { imageInfo } = props
	const [state, dispatch] = useReducer(reducer, initialState)

	const setImageData = (imageData: any) => {
		dispatch({
			type: IMAGE_DATA,
			imageData
		})
	}
	// 初始化一张图片
	useEffect(() => {
		setImageData({
			cropped: false,
			cropping: false,
			loaded: true,
			name: '',
			previousUrl: '',
			type: '',
			url: imageInfo?.url
		})
	}, [imageInfo])

	return <Context.Provider value={{ state, setImageData, imageInfo }}>{props.children}</Context.Provider>
}
