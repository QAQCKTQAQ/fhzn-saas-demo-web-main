/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 10:35:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-11 13:40:09
 */
/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */

import produce from 'immer'

//上传图片信息
export const IMAGE_DATA = 'IMAGE_DATA'

/***
 * 初始化state
 */
export const initialState = {
	imageData: {
		cropped: false,
		cropping: false,
		loaded: false,
		name: '',
		previousUrl: '',
		type: '',
		url: ''
	}
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case IMAGE_DATA:
			state.imageData = action.imageData
			break
		default:
			return state
	}
})
