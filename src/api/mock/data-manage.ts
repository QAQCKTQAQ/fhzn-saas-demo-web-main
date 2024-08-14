/***
 * mock数据
 */

// 空间列表
export const files = {
	items: [
		{
			name: '个人数据',
			createdTime: '2022-08-03 16:56:57',
			id: 22017,
			parentId: '',
			comment: '个人数据空间',
			creator: '司朋辉',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: '三院三部10室A组',
			createdTime: '2022-08-03 16:56:57',
			id: 22018,
			parentId: '',
			comment: '数据空间',
			creator: '刘卓',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: '项目',
			createdTime: '2022-08-03 16:56:57',
			id: 22019,
			parentId: '',
			comment: '数据空间',
			creator: '刘卓',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}

// 文件夹
export const folders = {
	items: [
		{
			name: 'SHIP',
			createdTime: '2022-08-03 16:56:57',
			id: 1,
			parentId: '',
			type: 'folder',
			comment: '船只',
			length: '200M',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: 'APPLE',
			createdTime: '2022-08-03 16:56:57',
			id: 2,
			parentId: '',
			comment: '苹果',
			type: 'folder',
			length: '100M',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: 'CAR',
			createdTime: '2022-08-03 16:56:57',
			id: 3,
			parentId: '',
			type: 'folder',
			comment: '车辆',
			length: '/',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}

// 文件
export const file = {
	items: [
		{
			name: '轮船',
			createdTime: '2022-08-03 16:56:57',
			id: 1,
			parentId: '',
			type: 'image',
			comment: '船只',
			length: '200M',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: '客船',
			createdTime: '2022-08-03 16:56:57',
			id: 2,
			parentId: '',
			type: 'image',
			comment: '苹果',
			length: '100M',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		},
		{
			name: '货船',
			createdTime: '2022-08-03 16:56:57',
			id: 3,
			parentId: '',
			type: 'image',
			comment: '车辆',
			length: '/',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}

// 关联的用户、组织架构、项目
export const queryPermits = {
	users: [
		{
			id: '1',
			nickname: '司朋辉'
		},
		{
			id: '2',
			nickname: '刘卓'
		}
	],
	departments: [
		{
			id: '1',
			name: '智能云事业部'
		},
		{
			id: '2',
			name: '综合部'
		}
	],
	teams: [
		{
			id: '1',
			name: '前端项目组'
		},
		{
			id: '2',
			name: '后端项目组'
		}
	]
}
export const dataSet = {
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3,
	items: [
		{
			id: 1,
			name: '帆船',
			type: 1,
			ifPublished: false,
			version: 'V1',
			tags: [1, 2],
			comment: '帆船数据集',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 2,
			name: '火箭',
			type: 2,
			ifPublished: false,
			version: 'V2',
			tags: [3, 4],
			comment: '火箭数据集',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 3,
			name: '游轮',
			type: 3,
			ifPublished: true,
			version: 'V3',
			tags: [5, 6],
			comment: '游轮数据集',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		}
	]
}
export const dataSetShip = {
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3,
	items: [
		{
			id: 1,
			name: '帆船',
			type: 1,
			ifPublished: true,
			version: 'V1',
			tags: [1, 2],
			comment: '帆船数据集版本1',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 2,
			name: '帆船',
			type: 2,
			ifPublished: false,
			version: 'V2',
			tags: [1, 2],
			comment: '帆船数据集版本2',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 3,
			name: '帆船',
			type: 3,
			ifPublished: false,
			version: 'V3',
			tags: [1, 2],
			comment: '帆船数据集版本3',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		}
	]
}
export const dataSetRocket = {
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3,
	items: [
		{
			id: 1,
			name: '火箭',
			type: 1,
			ifPublished: false,
			version: 'V1',
			tags: [3, 4],
			comment: '火箭数据集版本1',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 2,
			name: '火箭',
			type: 1,
			ifPublished: true,
			version: 'V2',
			tags: [3, 4],
			comment: '火箭数据集版本2',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 3,
			name: '火箭',
			type: 1,
			ifPublished: false,
			version: 'V3',
			tags: [3, 4],
			comment: '火箭数据集版本3',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		}
	]
}
export const dataSetFighter = {
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3,
	items: [
		{
			id: 1,
			name: '游轮',
			type: 2,
			ifPublished: true,
			version: 'V1',
			tags: [5, 6],
			comment: '游轮数据集版本1',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 2,
			name: '游轮',
			type: 2,
			ifPublished: false,
			version: 'V2',
			tags: [5, 6],
			comment: '游轮数据集版本2',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		},
		{
			id: 3,
			name: '游轮',
			type: 2,
			ifPublished: false,
			version: 'V3',
			tags: [5, 6],
			comment: '游轮数据集版本3',
			fileCount: 3,
			creator: 'yueyuewan',
			createdTime: '2023-04-23 15:00:20',
			updatedTime: '2023-04-23 15:00:20'
		}
	]
}
export const dataTags = [
	{
		label: '计算机视觉',
		value: 1
	},
	{
		label: '目标检测',
		value: 2
	},
	{
		label: '语义分割',
		value: 3
	},
	{
		label: '实例分割',
		value: 4
	},
	{
		label: '图像分类',
		value: 5
	},
	{
		label: '关键点检测',
		value: 6
	},
	{
		label: 'OCR识别',
		value: 7
	},
	{
		label: '人体姿势估计',
		value: 8
	},
	{
		label: '图像超分辨率',
		value: 9
	},
	{
		label: '风格迁移',
		value: 10
	},
	{
		label: '图像翻译',
		value: 11
	},
	{
		label: '动作迁移',
		value: 12
	},
	{
		label: '生成',
		value: 13
	},
	{
		label: '人脸识别',
		value: 14
	},
	{
		label: '自然语言处理',
		value: 15
	},
	{
		label: '舆情分析',
		value: 16
	},
	{
		label: '智能问答',
		value: 17
	},
	{
		label: '对话系统',
		value: 18
	},
	{
		label: '观点抽取',
		value: 19
	},
	{
		label: '文本审核',
		value: 20
	},
	{
		label: '文章摘要',
		value: 21
	},
	{
		label: '文章标签',
		value: 22
	},
	{
		label: '文本纠错',
		value: 23
	},
	{
		label: '知识图谱',
		value: 24
	}
]
export const dataSetTypes = [
	{
		label: '图片',
		value: 1
	},
	{
		label: '视频',
		value: 2
	},
	{
		label: '文本',
		value: 3
	}
]
export const dataSetSource = [
	{
		label: '我创建的',
		value: 1
	},
	{
		label: '我共享的',
		value: 2
	},
	{
		label: '共享给我的',
		value: 3
	}
]
// 帆船图片数据集
export const shipSetImg = [
	{
		id: 102,
		type: 2,
		parentId: 94,
		name: 'abendstimmung-sunset-evening-sky-817715.jpg',
		comment: '',
		fileCode: '1xpwg4sMRWc',
		annotationCode: '',
		length: 271813,
		fileContent: {
			originFilename: 'abendstimmung-sunset-evening-sky-817715.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 95,
		type: 2,
		parentId: 94,
		name: 'activity-adventure-boat-cruise-3602690.jpg',
		comment: '',
		fileCode: '1xpwg1cXe2j',
		annotationCode: '',
		length: 46092,
		fileContent: {
			originFilename: 'activity-adventure-boat-cruise-3602690.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 112,
		type: 2,
		parentId: 94,
		name: 'albin-express-sailboat-regatta-top-mark--971506.jpg',
		comment: '',
		fileCode: '1xpwg5nPofd',
		annotationCode: '',
		length: 353526,
		fileContent: {
			originFilename: 'albin-express-sailboat-regatta-top-mark--971506.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 113,
		type: 2,
		parentId: 94,
		name: 'alpine-lake-beach-tops-the-alps-3565476.jpg',
		comment: '',
		fileCode: '1xpwg5qFnyF',
		annotationCode: '',
		length: 389835,
		fileContent: {
			originFilename: 'alpine-lake-beach-tops-the-alps-3565476.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 96,
		type: 2,
		parentId: 94,
		name: 'america-boat-flag-ocean-sailboat-sea-shi-1298037.jpg',
		comment: '',
		fileCode: '1xpwg2dGzmz',
		annotationCode: '',
		length: 96776,
		fileContent: {
			originFilename: 'america-boat-flag-ocean-sailboat-sea-shi-1298037.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 101,
		type: 2,
		parentId: 94,
		name: 'anchored-boats-ocean-nautical-sailboat-b-2047077.jpg',
		comment: '',
		fileCode: '1xpwg3aJYqP',
		annotationCode: '',
		length: 188115,
		fileContent: {
			originFilename: 'anchored-boats-ocean-nautical-sailboat-b-2047077.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 114,
		type: 2,
		parentId: 94,
		name: 'annapolis-maryland-bay-harbor-water-sail-89803.jpg',
		comment: '',
		fileCode: '1xpwg5nPofc',
		annotationCode: '',
		length: 323835,
		fileContent: {
			originFilename: 'annapolis-maryland-bay-harbor-water-sail-89803.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 107,
		type: 2,
		parentId: 94,
		name: 'archipelago-sailboat-mast-boats-434809.jpg',
		comment: '',
		fileCode: '1xpwg4OGxjl',
		annotationCode: '',
		length: 224731,
		fileContent: {
			originFilename: 'archipelago-sailboat-mast-boats-434809.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 100,
		type: 2,
		parentId: 94,
		name: 'architecture-buildings-city-cityscape-cl-1839097.jpg',
		comment: '',
		fileCode: '1xpwg3bjYUl',
		annotationCode: '',
		length: 154231,
		fileContent: {
			originFilename: 'architecture-buildings-city-cityscape-cl-1839097.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 104,
		type: 2,
		parentId: 94,
		name: 'astronira-sea-sailing-ship-gouache-paint-213674.jpg',
		comment: '',
		fileCode: '1xpwg5nPofa',
		annotationCode: '',
		length: 342476,
		fileContent: {
			originFilename: 'astronira-sea-sailing-ship-gouache-paint-213674.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 105,
		type: 2,
		parentId: 94,
		name: 'bahrain-sky-clouds-sailboats-sea-ocean-w-89828.jpg',
		comment: '',
		fileCode: '1xpwg4QpLuM',
		annotationCode: '',
		length: 216067,
		fileContent: {
			originFilename: 'bahrain-sky-clouds-sailboats-sea-ocean-w-89828.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 108,
		type: 2,
		parentId: 94,
		name: 'battleship-pirate-ship-sailboat-warship--1688093.jpg',
		comment: '',
		fileCode: '1xpwg5nPofe',
		annotationCode: '',
		length: 318238,
		fileContent: {
			originFilename: 'battleship-pirate-ship-sailboat-warship--1688093.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 99,
		type: 2,
		parentId: 94,
		name: 'bird-s-eye-view-yacht-sea-sailboats-wate-2133661.jpg',
		comment: '',
		fileCode: '1xpwg3ZBAKA',
		annotationCode: '',
		length: 142339,
		fileContent: {
			originFilename: 'bird-s-eye-view-yacht-sea-sailboats-wate-2133661.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 98,
		type: 2,
		parentId: 94,
		name: 'blue-boat-freedom-horizon-ocean-2878.jpg',
		comment: '',
		fileCode: '1xpwg3ZBAK9',
		annotationCode: '',
		length: 152645,
		fileContent: {
			originFilename: 'blue-boat-freedom-horizon-ocean-2878.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 103,
		type: 2,
		parentId: 94,
		name: 'blue-boat-freedom-horizon-ocean-84588.jpg',
		comment: '',
		fileCode: '1xpwg5Il8cd',
		annotationCode: '',
		length: 236274,
		fileContent: {
			originFilename: 'blue-boat-freedom-horizon-ocean-84588.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 110,
		type: 2,
		parentId: 94,
		name: 'boat-coast-island-nature-ocean-rocks-sai-1836542.jpg',
		comment: '',
		fileCode: '1xpwg5nPofb',
		annotationCode: '',
		length: 329774,
		fileContent: {
			originFilename: 'boat-coast-island-nature-ocean-rocks-sai-1836542.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 111,
		type: 2,
		parentId: 94,
		name: 'boat-dawn-dusk-mast-ocean-sailboat-saili-1867174.jpg',
		comment: '',
		fileCode: '1xpwg5J2jkf',
		annotationCode: '',
		length: 257666,
		fileContent: {
			originFilename: 'boat-dawn-dusk-mast-ocean-sailboat-saili-1867174.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 106,
		type: 2,
		parentId: 94,
		name: 'boat-docked-vessel-harbor-ocean-pier-sea-983899.jpg',
		comment: '',
		fileCode: '1xpwg5Il8cb',
		annotationCode: '',
		length: 287985,
		fileContent: {
			originFilename: 'boat-docked-vessel-harbor-ocean-pier-sea-983899.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 109,
		type: 2,
		parentId: 94,
		name: 'boat-fishing-ocean-sailboat-sailing-sea--1298033.jpg',
		comment: '',
		fileCode: '1xpwg5lQcl8',
		annotationCode: '',
		length: 263666,
		fileContent: {
			originFilename: 'boat-fishing-ocean-sailboat-sailing-sea--1298033.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	},
	{
		id: 97,
		type: 2,
		parentId: 94,
		name: 'boat-fog-marine-loneliness-nature-2333306.jpg',
		comment: '',
		fileCode: '1xpwg33xI13',
		annotationCode: '',
		length: 75844,
		fileContent: {
			originFilename: 'boat-fog-marine-loneliness-nature-2333306.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:29:24',
		updatedTime: '2023-04-21 16:29:24',
		haveAnnotation: false
	}
]
// 火箭图片数据集
export const rocketSetImg = [
	{
		id: 43,
		type: 2,
		parentId: 35,
		name: '00000000.jpg',
		comment: '',
		fileCode: '1xpoiRYfGYD',
		annotationCode: '1xpxUw39G4Y',
		length: 111747,
		fileContent: {
			originFilename: '00000000.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 16:40:51',
		haveAnnotation: true
	},
	{
		id: 40,
		type: 2,
		parentId: 35,
		name: '00000001.jpg',
		comment: '',
		fileCode: '1xpoiGtr5k1',
		annotationCode: '',
		length: 27501,
		fileContent: {
			originFilename: '00000001.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 44,
		type: 2,
		parentId: 35,
		name: '00000002.png',
		comment: '',
		fileCode: '1xpoiSRAFWc',
		annotationCode: '',
		length: 113481,
		fileContent: {
			originFilename: '00000002.png'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 47,
		type: 2,
		parentId: 35,
		name: '00000003.jpg',
		comment: '',
		fileCode: '1xpoieKtiaI',
		annotationCode: '',
		length: 392652,
		fileContent: {
			originFilename: '00000003.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 39,
		type: 2,
		parentId: 35,
		name: '00000004.jpeg',
		comment: '',
		fileCode: '1xpoiGIxEpe',
		annotationCode: '',
		length: 10521,
		fileContent: {
			originFilename: '00000004.jpeg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 48,
		type: 2,
		parentId: 35,
		name: '00000005.jpg',
		comment: '',
		fileCode: '1xpokRBG0mI',
		annotationCode: '',
		length: 22604,
		fileContent: {
			originFilename: '00000005.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:24',
		updatedTime: '2023-04-21 14:38:24',
		haveAnnotation: false
	},
	{
		id: 45,
		type: 2,
		parentId: 35,
		name: '00000006.jpg',
		comment: '',
		fileCode: '1xpoiZzWO93',
		annotationCode: '',
		length: 190142,
		fileContent: {
			originFilename: '00000006.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 41,
		type: 2,
		parentId: 35,
		name: '00000007.jpg',
		comment: '',
		fileCode: '1xpoiKbmB6I',
		annotationCode: '',
		length: 6119,
		fileContent: {
			originFilename: '00000007.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 46,
		type: 2,
		parentId: 35,
		name: '00000008.jpg',
		comment: '',
		fileCode: '1xpoibomL2o',
		annotationCode: '',
		length: 207559,
		fileContent: {
			originFilename: '00000008.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},
	{
		id: 42,
		type: 2,
		parentId: 35,
		name: '00000009.jpg',
		comment: '',
		fileCode: '1xpoiPET2TS',
		annotationCode: '',
		length: 49249,
		fileContent: {
			originFilename: '00000009.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:38:07',
		updatedTime: '2023-04-21 14:38:07',
		haveAnnotation: false
	},

	{
		id: 54,
		type: 2,
		parentId: 35,
		name: '00000011.jpg',
		comment: '',
		fileCode: '1xpolXtbU2c',
		annotationCode: '',
		length: 27070,
		fileContent: {
			originFilename: '00000011.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 53,
		type: 2,
		parentId: 35,
		name: '00000012.jpeg',
		comment: '',
		fileCode: '1xpoll1yeDh',
		annotationCode: '',
		length: 336293,
		fileContent: {
			originFilename: '00000012.jpeg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 60,
		type: 2,
		parentId: 35,
		name: '00000012.jpeg',
		comment: '',
		fileCode: '1xposj79P6X',
		annotationCode: '',
		length: 336293,
		fileContent: {
			originFilename: '00000012.jpeg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:41:43',
		updatedTime: '2023-04-21 14:41:43',
		haveAnnotation: false
	},
	{
		id: 51,
		type: 2,
		parentId: 35,
		name: '00000013.jpg',
		comment: '',
		fileCode: '1xpoldqKQ0Q',
		annotationCode: '',
		length: 54602,
		fileContent: {
			originFilename: '00000013.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 50,
		type: 2,
		parentId: 35,
		name: '00000014.jpg',
		comment: '',
		fileCode: '1xpolcuzRjO',
		annotationCode: '',
		length: 11489,
		fileContent: {
			originFilename: '00000014.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 56,
		type: 2,
		parentId: 35,
		name: '00000014.jpg',
		comment: '',
		fileCode: '1xposgP6s6L',
		annotationCode: '',
		length: 11489,
		fileContent: {
			originFilename: '00000014.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:41:43',
		updatedTime: '2023-04-21 14:41:43',
		haveAnnotation: false
	},
	{
		id: 57,
		type: 2,
		parentId: 35,
		name: '00000016.jpg',
		comment: '',
		fileCode: '1xposgrmMEt',
		annotationCode: '',
		length: 32953,
		fileContent: {
			originFilename: '00000016.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:41:43',
		updatedTime: '2023-04-21 14:41:43',
		haveAnnotation: false
	},
	{
		id: 52,
		type: 2,
		parentId: 35,
		name: '00000017.jpg',
		comment: '',
		fileCode: '1xpoleOOHcB',
		annotationCode: '',
		length: 55947,
		fileContent: {
			originFilename: '00000017.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 49,
		type: 2,
		parentId: 35,
		name: '00000019.jpg',
		comment: '',
		fileCode: '1xpola68Xbe',
		annotationCode: '',
		length: 67032,
		fileContent: {
			originFilename: '00000019.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:39:51',
		updatedTime: '2023-04-21 14:39:51',
		haveAnnotation: false
	},
	{
		id: 59,
		type: 2,
		parentId: 35,
		name: '00000019.jpg',
		comment: '',
		fileCode: '1xposhxu5SL',
		annotationCode: '',
		length: 67032,
		fileContent: {
			originFilename: '00000019.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 14:41:43',
		updatedTime: '2023-04-21 14:41:43',
		haveAnnotation: false
	}
]
// 游轮图片数据集
export const fighterSetImg = [
	{
		id: 127,
		type: 2,
		parentId: 115,
		name: 'adventure-of-the-seas-cruise-ship-caribb-1218316.jpg',
		comment: '',
		fileCode: '1xpwzJyg7da',
		annotationCode: '',
		length: 213395,
		fileContent: {
			originFilename: 'adventure-of-the-seas-cruise-ship-caribb-1218316.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 135,
		type: 2,
		parentId: 115,
		name: 'aida-driving-cruise-ship-sea-night-114556.jpg',
		comment: '',
		fileCode: '1xpwzZmp1mL',
		annotationCode: '',
		length: 329478,
		fileContent: {
			originFilename: 'aida-driving-cruise-ship-sea-night-114556.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 120,
		type: 2,
		parentId: 115,
		name: 'aida-port-palma-mallorca-spanish-3116976.jpg',
		comment: '',
		fileCode: '1xpwzea12xt',
		annotationCode: '',
		length: 361401,
		fileContent: {
			originFilename: 'aida-port-palma-mallorca-spanish-3116976.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 117,
		type: 2,
		parentId: 115,
		name: 'aida-ship-cruise-vacations-port-802359.jpg',
		comment: '',
		fileCode: '1xpwzcnsgUr',
		annotationCode: '',
		length: 347375,
		fileContent: {
			originFilename: 'aida-ship-cruise-vacations-port-802359.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 116,
		type: 2,
		parentId: 115,
		name: 'aida-ship-driving-cruise-ship-sea-144796.jpg',
		comment: '',
		fileCode: '1xpwzaTy3YA',
		annotationCode: '',
		length: 323080,
		fileContent: {
			originFilename: 'aida-ship-driving-cruise-ship-sea-144796.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 121,
		type: 2,
		parentId: 115,
		name: 'aida-ship-driving-cruise-ship-sea-51186.jpg',
		comment: '',
		fileCode: '1xpwzeZAFZi',
		annotationCode: '',
		length: 345766,
		fileContent: {
			originFilename: 'aida-ship-driving-cruise-ship-sea-51186.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 133,
		type: 2,
		parentId: 115,
		name: 'aida-sol-cruise-ship-port-ship-652338.jpg',
		comment: '',
		fileCode: '1xpwzXmD7g1',
		annotationCode: '',
		length: 285022,
		fileContent: {
			originFilename: 'aida-sol-cruise-ship-port-ship-652338.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 129,
		type: 2,
		parentId: 115,
		name: 'aidaluna-warnemnde-germany-cruise-ship--1435536.jpg',
		comment: '',
		fileCode: '1xpwzKBjfcY',
		annotationCode: '',
		length: 255963,
		fileContent: {
			originFilename: 'aidaluna-warnemnde-germany-cruise-ship--1435536.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 134,
		type: 2,
		parentId: 115,
		name: 'alaska-fjord-ship-cruise-landscape-2666217.jpg',
		comment: '',
		fileCode: '1xpwzYUUXy5',
		annotationCode: '',
		length: 286298,
		fileContent: {
			originFilename: 'alaska-fjord-ship-cruise-landscape-2666217.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 119,
		type: 2,
		parentId: 115,
		name: 'astor-cruise-ship-seafaring-cruise-3428016.jpg',
		comment: '',
		fileCode: '1xpwze8lYTi',
		annotationCode: '',
		length: 342757,
		fileContent: {
			originFilename: 'astor-cruise-ship-seafaring-cruise-3428016.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},

	{
		id: 128,
		type: 2,
		parentId: 115,
		name: 'auckland-new-zealand-dawn-princess-2369525.jpg',
		comment: '',
		fileCode: '1xpwzKAJfyD',
		annotationCode: '',
		length: 207629,
		fileContent: {
			originFilename: 'auckland-new-zealand-dawn-princess-2369525.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 130,
		type: 2,
		parentId: 115,
		name: 'balmoral-cruise-ship-cruise-ship-shippin-574704.jpg',
		comment: '',
		fileCode: '1xpwzKzyfdy',
		annotationCode: '',
		length: 259232,
		fileContent: {
			originFilename: 'balmoral-cruise-ship-cruise-ship-shippin-574704.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 126,
		type: 2,
		parentId: 115,
		name: 'beautiful-landscape-cruise-boat-sailing--1966730.jpg',
		comment: '',
		fileCode: '1xpwziNKVnN',
		annotationCode: '',
		length: 535580,
		fileContent: {
			originFilename: 'beautiful-landscape-cruise-boat-sailing--1966730.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 122,
		type: 2,
		parentId: 115,
		name: 'bilbao-port-ship-cruise-1216612.jpg',
		comment: '',
		fileCode: '1xpwzf3ovcf',
		annotationCode: '',
		length: 313097,
		fileContent: {
			originFilename: 'bilbao-port-ship-cruise-1216612.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 125,
		type: 2,
		parentId: 115,
		name: 'boat-cruise-liner-ocean-sea-ship-transpo-1296612.jpg',
		comment: '',
		fileCode: '1xpwzGLaDUP',
		annotationCode: '',
		length: 75472,
		fileContent: {
			originFilename: 'boat-cruise-liner-ocean-sea-ship-transpo-1296612.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 132,
		type: 2,
		parentId: 115,
		name: 'boat-cruise-ship-celebrity-top-106105.jpg',
		comment: '',
		fileCode: '1xpwzUEVb06',
		annotationCode: '',
		length: 234783,
		fileContent: {
			originFilename: 'boat-cruise-ship-celebrity-top-106105.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 118,
		type: 2,
		parentId: 115,
		name: 'boat-cruise-ship-travel-stop-3714690.jpg',
		comment: '',
		fileCode: '1xpwzdBizQI',
		annotationCode: '',
		length: 288902,
		fileContent: {
			originFilename: 'boat-cruise-ship-travel-stop-3714690.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 124,
		type: 2,
		parentId: 115,
		name: 'boat-litoral-fishermen-beach-2646175.jpg',
		comment: '',
		fileCode: '1xpwzGiI7ta',
		annotationCode: '',
		length: 105174,
		fileContent: {
			originFilename: 'boat-litoral-fishermen-beach-2646175.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 123,
		type: 2,
		parentId: 115,
		name: 'businessman-empire-wealth-giant-1156879.jpg',
		comment: '',
		fileCode: '1xpwzgbTkSP',
		annotationCode: '',
		length: 357012,
		fileContent: {
			originFilename: 'businessman-empire-wealth-giant-1156879.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	},
	{
		id: 131,
		type: 2,
		parentId: 115,
		name: 'cadiz-andalusia-spain-travel-sky-3197928.jpg',
		comment: '',
		fileCode: '1xpwzSLqSXa',
		annotationCode: '',
		length: 219398,
		fileContent: {
			originFilename: 'cadiz-andalusia-spain-travel-sky-3197928.jpg'
		},
		creator: 'ZeroSi',
		modifier: 'ZeroSi',
		createdTime: '2023-04-21 16:33:49',
		updatedTime: '2023-04-21 16:33:49',
		haveAnnotation: false
	}
]
