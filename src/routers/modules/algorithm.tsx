/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-31 09:44:36
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-24 15:39:56
 */
import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// 算法训练模块
const algrithRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/algorithm/model',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model/list/index'))),
				meta: {
					requiresAuth: true,
					title: '模型管理',
					key: '/algorithm/model'
				}
			},
			{
				path: '/algorithm/model-experiment',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model-experiment/index'))),
				meta: {
					requiresAuth: true,
					title: '模型测试',
					key: '/algorithm/model-experiment'
				}
			},
			{
				path: '/algorithm/model-experiment-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model-experiment-detail/index'))),
				meta: {
					requiresAuth: true,
					title: '模型测试详情',
					key: '/algorithm/model-experiment-detail/:id'
				}
			},
			{
				path: '/algorithm/model-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model/detail/index'))),
				meta: {
					requiresAuth: true,
					title: '模型版本详情',
					key: '/algorithm/model-detail'
				}
			},
			{
				path: '/algorithm/code',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/code/list/index'))),
				meta: {
					requiresAuth: true,
					title: '算法管理',
					key: '/algorithm/code'
				}
			},
			{
				path: '/algorithm/training-task',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/training-task/index'))),
				meta: {
					requiresAuth: true,
					title: '训练任务',
					key: '/algorithm/training-task'
				}
			},
			{
				path: '/algorithm/task-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/task-detail/index'))),
				meta: {
					requiresAuth: true,
					title: '训练任务详情',
					key: '/algorithm/task-detail/:id'
				}
			},
			{
				path: '/algorithm/model-image',
				meta: {
					requiresAuth: true,
					title: '镜像管理',
					key: '/algorithm/model-image'
				}
			},
			{
				path: '/algorithm/model-image/images',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model-image/images/index'))),
				meta: {
					requiresAuth: true,
					title: '镜像列表',
					key: '/algorithm/model-image/images'
				}
			},
			{
				path: '/algorithm/model-image/build-images',
				element: lazyLoad(React.lazy(() => import('@/views/algorithm/model-image/builds/index'))),
				meta: {
					requiresAuth: true,
					title: '构建列表',
					key: '/algorithm/model-image/build-images'
				}
			}
		]
	}
]

export default algrithRouter
