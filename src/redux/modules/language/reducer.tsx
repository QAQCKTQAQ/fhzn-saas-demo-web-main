/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-25 15:14:15
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-27 14:53:37
 */
import { CHANGE_LANGUAGE } from './action'

const defaultState = {
	language: 'cipher',
	languageList: [
		{ name: '明文', code: 'plain' },
		{ name: '密文', code: 'cipher' }
	]
}

export default (state = defaultState, action: any) => {
	console.log(action, 'action')
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return {
				...state,
				language: action.payload
			}
		default:
			return state
	}
}
