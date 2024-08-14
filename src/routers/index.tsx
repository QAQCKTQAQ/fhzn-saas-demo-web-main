import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from '@/routers/interface'
import Login from '@/views/login/index'
import lazyLoad from '@/routers/utils/lazyLoad'
import React from 'react'

// * 导入所有router
const metaRouters: any = import.meta.glob('./modules/*.tsx', { eager: true })

// * 处理路由
export const routerArray: RouteObject[] = []
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key])
	})
})

export const rootRouter: any[] = [
	{
		path: '/login',
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: '登录页',
			key: 'login'
		}
	},
	{
		path: '/szyj-menu/visual-data',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-data/index'))),
		meta: {
			requiresAuth: false,
			title: '试验可视化',
			key: '/szyj-menu/visual-data'
		}
	},
	{
		path: '/szyj-menu/visual-data/ld',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-data-ld/index'))),
		meta: {
			requiresAuth: false,
			title: 'LD可视化',
			key: '/szyj-menu/visual-data/ld'
		}
	},
	{
		path: '/szyj-menu/visual-data/dygz',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-data-dygz/index'))),
		meta: {
			requiresAuth: false,
			title: 'DYGZ可视化',
			key: '/szyj-menu/visual-data/dygz'
		}
	},
	{
		path: '/szyj-menu/visual-data/gzdw',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-data-gzdw/index'))),
		meta: {
			requiresAuth: false,
			title: 'GZDW可视化',
			key: '/szyj-menu/visual-data/gzdw'
		}
	},
	{
		path: '/szyj-menu/visual-data/code',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-data-code/index'))),
		meta: {
			requiresAuth: false,
			title: '数据列表',
			key: '/szyj-menu/visual-data/code'
		}
	},
	{
		path: '/szyj-menu/visual-more',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/visual-more/index'))),
		meta: {
			requiresAuth: false,
			title: '可视化详情',
			key: '/szyj-menu/visual-more'
		}
	},
	{
		path: '/szyj-menu/params-config',
		element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/params-config/index'))),
		meta: {
			requiresAuth: false,
			title: '参数配置',
			key: '/szyj-menu/params-config'
		}
	},
	...routerArray,
	{
		path: '*',
		element: <Navigate to="/404" />
	}
]

const Router = () => {
	const routes = useRoutes(rootRouter)
	return routes
}

export default Router
