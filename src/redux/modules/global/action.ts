import * as types from '@/redux/mutation-types'
import { ThemeConfigProp } from '@/redux/interface/index'

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
})

// 设置用户信息
export const setUserInfo = (userInfo: any) => ({
	type: types.SET_USER_INFO,
	userInfo
})

// * setAssemblySize
export const setAssemblySize = (assemblySize: string) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize
})

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
})

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig
})
