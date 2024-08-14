import * as types from '@/redux/mutation-types'

// * setAuthButtons
export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
})

// * setAuthRouter
export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
})

// * 设置当前路由信息
export const setCurrentRouter = (currentRoute: object) => ({
	type: types.SET_CURRENT_ROUTER,
	currentRoute
})
