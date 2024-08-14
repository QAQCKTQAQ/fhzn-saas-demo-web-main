/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-25 14:17:28
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-25 14:47:56
 */
export const CHANGE_LANGUAGE = 'change_language'

export const changeLanguageActionCreator = (languageCode: any) => {
	return {
		type: CHANGE_LANGUAGE,
		payload: languageCode
	}
}
