/***
 * mock数据
 */

// 列表
export const tasks = {
	items: [
		{
			name: '图片训练',
			createdTime: '2022-08-03 16:56:57',
			id: 22017,
			runtime: '3h',
			status: 1,
			comment: '个人数据空间',
			creator: '司朋辉',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57',
			envImageId: '图片识别',
			command: 'docker run -d -p 8080:8080 fhzn-saas-web:v1.0.0',
			algorithm: {
				id: '图片识别算法',
				version: 'v1.0.0'
			},
			dataset: {
				train: {
					id: '火箭数据集',
					version: 'v1.0.0'
				}
			},
			resources: {
				cpu: 1,
				gpu: 1,
				memory: 4
			}
		},
		{
			name: '视频训练',
			createdTime: '2022-08-04 16:56:57',
			id: 22018,
			runtime: '9h',
			type: '训练任务',
			status: 2,
			comment: '个人数据空间',
			creator: '司朋辉',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57',
			envImageId: '视频识别',
			command: 'docker run -d -p 8080:8080 fhzn-saas-web:v1.0.0',
			algorithm: {
				id: '视频识别算法',
				version: 'v1.0.0'
			},
			dataset: {
				train: {
					id: '火箭数据集',
					version: 'v1.0.0'
				}
			},
			resources: {
				cpu: 1,
				gpu: 1,
				memory: 4
			}
		},
		{
			name: '船只识别',
			createdTime: '2022-08-05 16:56:57',
			id: 22019,
			runtime: '2h',
			status: 3,
			comment: '个人数据空间',
			creator: '司朋辉',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57',
			envImageId: '图片识别',
			command: 'docker run -d -p 8080:8080 fhzn-saas-web:v1.0.0',
			algorithm: {
				id: '图片识别算法',
				version: 'v1.0.0'
			},
			dataset: {
				train: {
					id: '火箭数据集',
					version: 'v1.0.0'
				}
			},
			resources: {
				cpu: 1,
				gpu: 1,
				memory: 4
			}
		},
		{
			name: '算法训练',
			createdTime: '2022-08-06 16:56:57',
			id: 22020,
			runtime: '6h',
			status: 4,
			comment: '个人数据空间',
			creator: '司朋辉',
			modifier: '飞航智能',
			updatedTime: '2022-03-29 16:56:57',
			envImageId: '图片识别',
			command: 'docker run -d -p 8080:8080 fhzn-saas-web:v1.0.0',
			algorithm: {
				id: '图片识别算法',
				version: 'v1.0.0'
			},
			dataset: {
				train: {
					id: '火箭数据集',
					version: 'v1.0.0'
				}
			},
			resources: {
				cpu: 1,
				gpu: 1,
				memory: 4
			}
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 4
}

export const models = ['model_out/1.pt', 'model_out/2.pt', 'model_out/epoch/best.pt']
