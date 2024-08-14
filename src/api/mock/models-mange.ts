/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-03 13:19:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-04-12 14:42:00
 */
// 模型管理列表
export const listData = {
	items: [
		{
			id: 5,
			name: 'model_detect',
			frameType: '2',
			modelType: '1',
			modelDescription: 'model_detect_train',
			modelAddress: '/model/1/20230403093446700whb5/',
			version: 'V0001',
			modelResource: 0,
			totalNum: 1,
			teamId: null,
			createUserId: 1,
			createUserName: 'admin',
			updateUserId: 1,
			createTime: '2023-03-22 08:57:09',
			updateTime: '2023-03-22 08:57:09',
			originUserId: 1,
			packaged: 0,
			tags: null,
			servingModel: true,
			structName: null,
			modelSize: 224,
			modelClassName: '201'
		},
		{
			id: 4,
			name: 'car_model_detect',
			frameType: '2',
			modelType: '1',
			modelDescription: 'car_model_detect',
			modelAddress: '/train-manage/1/train-1-20230322011443-v0018/model-out/out/car.pt',
			version: 'V0001',
			modelResource: 0,
			totalNum: 0,
			teamId: null,
			createUserId: 1,
			createUserName: 'admin',
			updateUserId: 1,
			createTime: '2023-03-23 08:57:09',
			updateTime: '2023-03-23 08:57:09',
			originUserId: 1,
			packaged: 0,
			tags: null,
			servingModel: true,
			structName: null,
			modelSize: 224,
			modelClassName: '101'
		},
		{
			id: 3,
			name: 'fire_model_detect',
			frameType: '2',
			modelType: '1',
			modelDescription: 'fire_model_detect_train',
			modelAddress: '/train-manage/1/train-1-20230322011443-v0017/model-out/out/best.pt',
			version: 'V0002',
			modelResource: 0,
			totalNum: 2,
			teamId: null,
			createUserId: 1,
			createUserName: 'admin',
			updateUserId: 1,
			createTime: '2023-03-24 08:57:09',
			updateTime: '2023-03-24 08:57:09',
			originUserId: 1,
			packaged: 0,
			tags: null,
			servingModel: true,
			structName: null,
			modelSize: 224,
			modelClassName: '101'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
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
			value: 1,
			sort: '1',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 131,
			label: '目标检测',
			value: 2,
			sort: '2',
			dictId: 8,
			createTime: '2023-03-24 08:57:09',
			updateTime: null
		},
		{
			id: 132,
			label: '语义分割',
			value: 3,
			sort: '3',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 134,
			label: '目标跟踪',
			value: 4,
			sort: '4',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 133,
			label: '文本分类',
			value: 5,
			sort: '5',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 135,
			label: '中文分词',
			value: 6,
			sort: '6',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 136,
			label: '命名实体识别',
			value: 7,
			sort: '7',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 137,
			label: '音频分类',
			value: 8,
			sort: '8',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 143,
			label: '模型优化',
			value: 9,
			sort: '13',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 139,
			label: '自定义',
			value: 10,
			sort: '13',
			dictId: 8,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		}
	],
	createTime: '2023-03-22 08:57:09'
}
// 框架名称
export const frameTypesData = {
	id: 6,
	name: 'frame_type',
	remark: '框架名称',
	dictDetails: [
		{
			id: 21,
			label: 'Pytorch',
			value: 1,
			sort: '3',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 20,
			label: 'Tensorflow',
			value: 2,
			sort: '2',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 23,
			label: 'Caffe',
			value: 3,
			sort: '5',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 29,
			label: 'Theano',
			value: 4,
			sort: '5',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 33,
			label: 'MXNet',
			value: 5,
			sort: '5',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 35,
			label: 'PaddlePaddle',
			value: 6,
			sort: '5',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 38,
			label: 'ONNX',
			value: 7,
			sort: '5',
			dictId: 6,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		}
	],
	createTime: '2023-03-22 08:57:09'
}
// 模型格式
export const modelTypesData = {
	id: 7,
	name: 'model_type',
	remark: '模型格式',
	dictDetails: [
		{
			id: 26,
			label: 'pt',
			value: 1,
			sort: '1',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 27,
			label: 'pth',
			value: 2,
			sort: '2',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 28,
			label: 'onnx',
			value: 3,
			sort: '3',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 29,
			label: 'pb',
			value: 4,
			sort: '4',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 30,
			label: 'pbtxt',
			value: 5,
			sort: '5',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 31,
			label: 'h5',
			value: 6,
			sort: '6',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 32,
			label: 'keras',
			value: 7,
			sort: '7',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 33,
			label: 'tflite',
			value: 8,
			sort: '8',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		},
		{
			id: 34,
			label: 'paddle',
			value: 9,
			sort: '9',
			dictId: 7,
			createTime: '2023-03-22 08:57:09',
			updateTime: null
		}
	],
	createTime: '2023-03-22 08:57:09'
}
