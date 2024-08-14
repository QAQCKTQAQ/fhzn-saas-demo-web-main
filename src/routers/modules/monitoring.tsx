import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// 系统设置模块
const settingRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/monitoring/login-log',
				element: lazyLoad(React.lazy(() => import('@/views/monitoring/login-log/index'))),
				meta: {
					requiresAuth: true,
					title: '登录日志',
					key: '/monitoring/login-log'
				}
			},
			{
				path: '/monitoring/handle-log',
				element: lazyLoad(React.lazy(() => import('@/views/monitoring/handle-log/index'))),
				meta: {
					requiresAuth: true,
					title: '业务日志',
					key: '/monitoring/handle-log'
				}
			}
		]
	}
]

export default settingRouter
