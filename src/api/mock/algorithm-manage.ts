/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-06 11:29:28
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-04-06 17:01:38
 */
// 模型管理列表
export const listData = {
	items: [
		{
			id: 13,
			algorithmName: 'algorith_yolo',
			description: 'algorith_yolo_train',
			algorithmSource: 1,
			imageName: null,
			algorithmFileSize: null,
			imageTag: null,
			codeDir: '/algorithm-manage/1/20230406032027266ezos/',
			runCommand: '',
			algorithmUsage: '5001',
			accuracy: '',
			p4InferenceSpeed: null,
			isTrainModelOut: true,
			isTrainOut: true,
			isVisualizedLog: true,
			createUserId: 1,
			createTime: '2023-04-06 03:20:17',
			updateUserId: 1,
			updateTime: '2023-04-06 03:20:17',
			originUserId: 1
		},
		{
			id: 12,
			algorithmName: 'yolo_discriminate',
			description: 'yolo_discriminate_train',
			algorithmSource: 1,
			imageName: null,
			algorithmFileSize: null,
			imageTag: null,
			codeDir: '/algorithm-manage/1/20230406031753852qo2f/',
			runCommand: '',
			algorithmUsage: '2999',
			accuracy: '',
			p4InferenceSpeed: null,
			isTrainModelOut: true,
			isTrainOut: true,
			isVisualizedLog: true,
			createUserId: 1,
			createTime: '2023-04-06 03:17:54',
			updateUserId: 1,
			updateTime: '2023-04-06 03:17:54',
			originUserId: 1
		},
		{
			id: 11,
			algorithmName: 'car_dectect',
			description: 'car_dectect_train',
			algorithmSource: 1,
			imageName: null,
			algorithmFileSize: null,
			imageTag: null,
			codeDir: '/algorithm-manage/1/20230406031501588vov2/',
			runCommand: '',
			algorithmUsage: '2001',
			accuracy: '',
			p4InferenceSpeed: null,
			isTrainModelOut: true,
			isTrainOut: true,
			isVisualizedLog: false,
			createUserId: 1,
			createTime: '2023-04-06 03:15:02',
			updateUserId: 1,
			updateTime: '2023-04-06 03:15:02',
			originUserId: 1
		},
		{
			id: 10,
			algorithmName: 'FHZN_notebook',
			description: 'FHZN_notebook',
			algorithmSource: 1,
			imageName: null,
			algorithmFileSize: null,
			imageTag: null,
			codeDir: '/algorithm-manage/1/202211180222452119ra9/',
			runCommand: '',
			algorithmUsage: '1001',
			accuracy: '',
			p4InferenceSpeed: null,
			isTrainModelOut: true,
			isTrainOut: true,
			isVisualizedLog: false,
			createUserId: 1,
			createTime: '2023-03-22 08:57:09',
			updateUserId: 1,
			updateTime: '2023-03-22 08:57:09',
			originUserId: 1
		},
		{
			id: 9,
			algorithmName: 'yolo-detect',
			description: 'yolo-detect',
			algorithmSource: 1,
			imageName: null,
			algorithmFileSize: null,
			imageTag: null,
			codeDir: '/algorithm-manage/1/20230322011354375jgxz/',
			runCommand: '',
			algorithmUsage: '102',
			accuracy: '',
			p4InferenceSpeed: null,
			isTrainModelOut: true,
			isTrainOut: true,
			isVisualizedLog: false,
			createUserId: 1,
			createTime: '2023-03-22 01:13:56',
			updateUserId: 1,
			updateTime: '2023-03-27 02:11:00',
			originUserId: 1
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 5
}
// 模型分类
export const modelClassesData = {
	id: 8,
	name: 'model_class',
	remark: '模型分类',
	dictDetails: [
		{
			id: 130,
			label: '图像分类',
			value: '101',
			sort: '1',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 131,
			label: '目标检测',
			value: '102',
			sort: '2',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 132,
			label: '语义分割',
			value: '103',
			sort: '3',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 134,
			label: '目标跟踪',
			value: '201',
			sort: '4',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 133,
			label: '文本分类',
			value: '301',
			sort: '5',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 135,
			label: '中文分词',
			value: '302',
			sort: '6',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 136,
			label: '命名实体识别',
			value: '303',
			sort: '7',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 137,
			label: '音频分类',
			value: '401',
			sort: '8',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 138,
			label: '语音识别',
			value: '402',
			sort: '9',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 140,
			label: '器官分割',
			value: '1001',
			sort: '10',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 141,
			label: '肺结节检测',
			value: '2001',
			sort: '11',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 142,
			label: '其他病灶识别',
			value: '2999',
			sort: '12',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 139,
			label: '自定义',
			value: '10001',
			sort: '13',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		},
		{
			id: 143,
			label: '模型优化',
			value: '5001',
			sort: '13',
			dictId: 8,
			createTime: '2022-09-22T18:39:47.000+00:00',
			updateTime: null
		}
	],
	createTime: '2022-09-22T18:39:17.000+00:00'
}
