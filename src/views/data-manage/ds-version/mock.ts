/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-30 15:17:46
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-31 13:41:04
 */

/**
 * @name 资源管理
 */
// * 获取数据集列表
export const dataSource = [
	{
		id: 1,
		name: '人脸表情',
		type: 1,
		ifPublished: false,
		version: 'V1',
		nextVersion: 'V2',
		isCurrentVersion: false,
		tags: [],
		comment: '测试测试1',
		fileCount: 3,
		creator: 'yueyuewan',
		createdTime: '2023-04-23 15:00:20',
		updatedTime: '2023-04-23 15:00:20'
	},
	{
		id: 2,
		name: '水果',
		type: 1,
		ifPublished: false,
		version: 'V2',
		nextVersion: 'V3',
		isCurrentVersion: false,
		tags: [],
		comment: '测试测试2',
		fileCount: 3,
		creator: 'yueyuewan',
		createdTime: '2023-04-23 15:00:20',
		updatedTime: '2023-04-23 15:00:20'
	},
	{
		id: 3,
		name: '树叶',
		type: 2,
		ifPublished: true,
		version: 'V3',
		nextVersion: 'V4',
		isCurrentVersion: false,
		tags: [],
		comment: '测试测试3',
		fileCount: 3,
		creator: 'yueyuewan',
		createdTime: '2023-04-23 15:00:20',
		updatedTime: '2023-04-23 15:00:20'
	}
]

export const pageInfo = {
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}
// * 删除数据集
export const deleteDataSet = () => {
	// return http.post(AuthService + `/v2/resource/add`, data)
	return {
		code: 0,
		message: '删除成功',
		data: {}
	}
}
// * 创建数据集
export const createDataSet = () => {
	return {
		code: 0,
		message: '创建成功',
		data: {}
	}
}
// * 发布数据集
export const publishDataSet = () => {
	return {
		code: 0,
		message: '发布成功',
		data: {}
	}
}
// * 版本管理数据集
export const mangeDataSet = () => {
	return {
		code: 0,
		message: '',
		data: {}
	}
}
