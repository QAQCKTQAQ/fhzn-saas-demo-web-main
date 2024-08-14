import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// 数据管理模块
const szyjManageRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/test/experiment-task-management',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/experiment-task-management/index'))),
				meta: {
					requiresAuth: true,
					title: '试验任务管理',
					key: '/szyj-menu/experiment-task-management'
				}
			},
			{
				path: '/test/experiment-task-create',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/experiment-task-create/index'))),
				meta: {
					requiresAuth: true,
					title: '创建试验任务',
					key: '/test/experiment-task-create'
				}
			},
			{
				path: '/test/experiment-task-init',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/experiment-task-init/index'))),
				meta: {
					requiresAuth: true,
					title: '初始化试验任务',
					key: '/test/experiment-task-init'
				}
			},
			{
				path: '/test/experiment-task-detail',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/experiment-task-detail/index'))),
				meta: {
					requiresAuth: true,
					title: '试验任务详情',
					key: '/test/experiment-task-detail'
				}
			}
		]
	}
]

export default szyjManageRouter
