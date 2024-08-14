import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/',
				element: lazyLoad(React.lazy(() => import('@/views/home/index'))),
				meta: {
					requiresAuth: true,
					title: '首页',
					key: 'home'
				}
			},
			{
				path: '/demo',
				element: lazyLoad(React.lazy(() => import('@/views/demo/index'))),
				meta: {
					requiresAuth: false,
					title: '示例',
					key: 'home'
				}
			}
		]
	}
]

export default homeRouter
