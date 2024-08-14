import { AlgorithmTraining } from '@/api/config/servicePort'
import http from '@/api'
// 资源列表
export const getSoftResourceListApi = (params: any) => {
	return new Promise(resolve => {
		let items = [
			{
				id: 15,
				type: 1,
				name: 'Ubuntu',
				comment: '',
				version: '',
				creator: '万月月',
				modifier: '万月月',
				createdTime: '2023-11-09 11:40:17',
				updatedTime: '2023-11-09 11:40:17'
			},
			{
				id: 14,
				type: 2,
				name: 'PypI',
				comment: '',
				version: 'V4',
				creator: '顾天伟',
				modifier: '顾天伟',
				createdTime: '2023-11-07 10:55:54',
				updatedTime: '2023-11-07 17:47:37'
			},
			{
				id: 13,
				type: 1,
				name: 'Centos',
				comment: 'xx',
				version: 'V7',
				creator: '黄雨澳',
				modifier: '黄雨澳',
				createdTime: '2023-10-19 10:55:54',
				updatedTime: '2023-10-19 11:26:00'
			}
		]
		return resolve({ items })
	})
	return http.get(AlgorithmTraining + `/model/list`, params)
}
// 资源版本列表
export const getSoftResourceVersionListApi = (params: any) => {
	return new Promise(resolve => {
		let data = [
			{
				id: 15,
				type: 1,
				name: 'Ubuntu',
				comment: '',
				version: '',
				creator: '万月月',
				modifier: '万月月',
				createdTime: '2023-11-09 11:40:17',
				updatedTime: '2023-11-09 11:40:17'
			},
			{
				id: 14,
				type: 2,
				name: 'PypI',
				comment: '',
				version: 'V4',
				creator: '顾天伟',
				modifier: '顾天伟',
				createdTime: '2023-11-07 10:55:54',
				updatedTime: '2023-11-07 17:47:37'
			},
			{
				id: 13,
				type: 1,
				name: 'Centos',
				comment: 'xx',
				version: 'V7',
				creator: '黄雨澳',
				modifier: '黄雨澳',
				createdTime: '2023-10-19 10:55:54',
				updatedTime: '2023-10-19 11:26:00'
			}
		]
		return resolve({ data })
	})
	return http.get(AlgorithmTraining + `/tags/dicts/classify/list`, params)
}
// 创建资源信息
export const createResourceBaseInfoApi = (params: any) => {
	return new Promise(resolve => {
		let data = {}
		return resolve(data)
	})
	return http.get(AlgorithmTraining + `/tags/dicts/classify/list`, params)
}
// 上传资源包
export const submitSoftResourcePackage = (params: any) => {
	return new Promise(resolve => {
		let data = {}
		return resolve(data)
	})
	return http.get(AlgorithmTraining + `/tags/dicts/classify/list`, params)
}
