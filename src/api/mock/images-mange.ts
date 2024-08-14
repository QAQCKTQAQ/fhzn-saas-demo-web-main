/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-03 13:19:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-04-06 17:09:13
 */
export const listData = {
	items: [
		{
			id: 1,
			name: 'yolov1_train',
			url: 'harbor.fhzny.com:60002/yolo/yolov1_train:v1.2',
			types: [1, 2], // 用途。1：训练；2：部署；
			tag: 'v1.2',
			comment: 'yolo数据集训练镜像',
			creator: 'wanyueyue',
			createdTime: '2022-03-28 16:56:57',
			modifier: 'wanyueyue',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			id: 2,
			name: 'yolov2_train',
			url: 'harbor.fhzny.com:60002/yolo/yolov2_train:v1.2',
			types: [1, 2], // 用途。1：训练；2：部署；
			tag: 'v1.2',
			comment: 'yolo数据集训练镜像更新版本',
			creator: 'wanyueyue',
			createdTime: '2022-03-27 16:56:57',
			modifier: 'wanyueyue',
			updatedTime: '2022-04-01 16:56:57'
		},
		{
			id: 3,
			name: 'yolov3_train',
			url: 'harbor.fhzny.com:60002/yolo/yolov3_train:v1.2',
			types: [1, 2], // 用途。1：训练；2：部署；
			tag: 'v1.1',
			comment: 'yolo数据集训练镜像新版本V1.1',
			creator: 'wanyueyue',
			createdTime: '2022-03-31 16:56:57',
			modifier: 'wanyueyue',
			updatedTime: '2022-04-03 16:56:57'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}
