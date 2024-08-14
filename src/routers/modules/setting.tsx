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
				path: '/setting/user',
				element: lazyLoad(React.lazy(() => import('@/views/setting/user/index'))),
				meta: {
					requiresAuth: true,
					title: '用户管理',
					key: 'user'
				}
			},
			{
				path: '/setting/role',
				element: lazyLoad(React.lazy(() => import('@/views/setting/role/index'))),
				meta: {
					requiresAuth: true,
					title: '角色管理',
					key: 'role'
				}
			},
			{
				path: '/setting/resource',
				element: lazyLoad(React.lazy(() => import('@/views/setting/resource/index'))),
				meta: {
					requiresAuth: true,
					title: '资源管理',
					key: 'resource'
				}
			},
			{
				path: '/setting/maintenance-resource',
				element: lazyLoad(React.lazy(() => import('@/views/setting/maintenance-resource/index'))),
				meta: {
					requiresAuth: true,
					title: '软件资源',
					key: 'maintenanceResource'
				}
			},
			{
				path: '/setting/password',
				element: lazyLoad(React.lazy(() => import('@/views/setting/password/index'))),
				meta: {
					requiresAuth: true,
					title: '密码管理',
					key: 'setting/password'
				}
			},
			{
				path: '/setting/digital-dict',
				element: lazyLoad(React.lazy(() => import('@/views/setting/digital-dict/index'))),
				meta: {
					requiresAuth: true,
					title: '数字字典',
					key: 'setting/digital-dict'
				}
			}
		]
	}
]

export default settingRouter
