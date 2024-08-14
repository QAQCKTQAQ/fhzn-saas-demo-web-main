/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-29 11:17:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-17 16:18:31
 */
import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// 数据管理模块
const dataManageRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/data-manage/space',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/space/index'))),
				meta: {
					requiresAuth: true,
					title: '文件目录',
					key: 'space'
				}
			},
			{
				path: '/data-manage/data-space',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/data-space/index'))),
				meta: {
					requiresAuth: true,
					title: '数据空间',
					key: 'space'
				}
			},
			{
				path: '/data-manage/folder-file/file-detail/:id',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/file-detail/index'))),
				meta: {
					requiresAuth: true,
					title: '数据查看',
					key: '/data-manage/folder-file/file-detail/:id'
				}
			},
			{
				path: '/data-manage/folder-file/:id',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/folder-file/index'))),
				meta: {
					requiresAuth: true,
					title: '',
					key: '/data-manage/folder-file/:id'
				}
			},
			{
				path: '/data-manage/data-query/multiple',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/data-query/multiple/index'))),
				meta: {
					requiresAuth: true,
					title: '多维度检索',
					key: '/data-manage/data-query/multiple'
				}
			},
			{
				path: '/data-manage/data-query/earth',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/data-query/earth/index'))),
				meta: {
					requiresAuth: true,
					title: '数字地球',
					key: '/data-manage/data-query/earth'
				}
			},
			{
				path: '/data-manage/ds',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/ds/index'))),
				meta: {
					requiresAuth: true,
					title: '数据集管理',
					key: '/data-manage/ds'
				}
			},
			{
				path: '/data-manage/data-tool/data-mark',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/data-mark/index'))),
				meta: {
					requiresAuth: true,
					title: '数据标注',
					key: '/data-manage/data-tool/data-mark'
				}
			},
			{
				path: '/data-manage/data-tool/data-augmentation',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/data-augmentation/index'))),
				meta: {
					requiresAuth: true,
					title: '数据增广',
					key: '/data-manage/data-tool/data-augmentation'
				}
			},
			{
				path: '/data-manage/ds-version',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/ds-version/index'))),
				meta: {
					requiresAuth: true,
					title: '数据集版本管理',
					key: '/data-manage/ds-version'
				}
			},
			{
				path: '/data-manage/ds-detail-image',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/ds-detail-image/index'))),
				meta: {
					requiresAuth: true,
					title: '文件详情',
					key: '/data-manage/ds-detail-image'
				}
			},
			{
				path: '/data-manage/ds-version-details-item',
				element: lazyLoad(React.lazy(() => import('@/views/data-manage/ds-version-details-item/index'))),
				meta: {
					requiresAuth: true,
					title: '文件详情',
					key: '/data-manage/ds-version-details-item'
				}
			}
		]
	}
]

export default dataManageRouter
