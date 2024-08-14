/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-04 13:41:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-14 16:42:19
 */
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
				path: '/szyj-menu/combination-yj-management',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/combination-yj-management/index'))),
				meta: {
					requiresAuth: true,
					title: '组合实例样机管理',
					key: '/szyj-menu/combination-yj-management'
				}
			},
			{
				path: '/szyj-menu/combination-yj/:action',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/combination-yj-create/index'))),
				meta: {
					requiresAuth: true,
					title: '创建组合实例YJ',
					key: '/szyj-menu/combination-yj/:action'
				}
			},
			{
				path: '/szyj-menu/deploy-config',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/deploy-config/index'))),
				meta: {
					requiresAuth: true,
					title: '部署配置',
					key: '/szyj-menu/deploy-config'
				}
			},
			{
				path: '/szyj-menu/combination-yj-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/combination-yj-detail/index'))),
				meta: {
					requiresAuth: true,
					title: '组合实例YJ详情',
					key: '/szyj-menu/combination-yj-detail/:id'
				}
			},

			{
				path: '/szyj-menu/combination-config',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/combination-config/index'))),
				meta: {
					requiresAuth: true,
					title: '组合配置',
					key: '/szyj-menu/combination-config'
				}
			},
			{
				path: '/szyj-menu/single-yj-management',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/single-yj-management/list/index'))),
				meta: {
					requiresAuth: true,
					title: '模块样机管理',
					key: '/szyj-menu/single-yj-management'
				}
			},
			{
				path: '/szyj-menu/single-yj/:action',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/single-yj-management/create/index'))),
				meta: {
					requiresAuth: false,
					title: '创建模块YJ',
					key: '/szyj-menu/single-yj/:action'
				}
			},
			{
				path: '/szyj-menu/single-yj-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/single-yj-management/detail/index'))),
				meta: {
					requiresAuth: false,
					title: '模块YJ详情',
					key: '/szyj-menu/single-yj-detail/:id'
				}
			},
			{
				path: '/szyj-menu/tags-manage',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/tags-manage/index'))),
				meta: {
					requiresAuth: true,
					title: '标签管理',
					key: '/szyj-menu/tags-manage'
				}
			},
			{
				path: '/szyj-menu/communication-topology',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/communication-topology/index'))),
				meta: {
					requiresAuth: true,
					title: '通信',
					key: '/szyj-menu/communication-topology'
				}
			},
			{
				path: '/szyj-menu/material-manage',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/material-manage/index'))),
				meta: {
					requiresAuth: true,
					title: '资源管理',
					key: '/szyj-menu/material-manage'
				}
			},
			{
				path: '/szyj-menu/material-manage-creat-details',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/material-manage-creat-details/index'))),
				meta: {
					requiresAuth: true,
					title: '创建资源详情页',
					key: '/szyj-menu/material-manage-creat-details'
				}
			},
			{
				path: '/szyj-menu/character-info',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/character-info/list/index'))),
				meta: {
					requiresAuth: true,
					title: '特性信息',
					key: '/szyj-menu/character-info'
				}
			},
			{
				path: '/szyj-menu/character-info/detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/szyj-menu/character-info/detail/index'))),
				meta: {
					requiresAuth: true,
					title: '特性信息详情',
					key: '/szyj-menu/character-info/detail/:id'
				}
			}
		]
	}
]

export default szyjManageRouter
