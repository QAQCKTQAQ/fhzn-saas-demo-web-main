import { ZHYJListData, tagList } from '../mock/szyj-manage'
import { commonService, thirdPartService } from '../config/servicePort'
import http from '@/api'

// * 获取试验管理列表
export const queryDataExperimentList = (params: any) => {
	console.log('params', params)
	return http.get(`${commonService}/experiments/list`, params)
}
// 试验管理编辑基础信息
export const editBasicExperimentApi = (data: any) => {
	return http.post(commonService + `/experiments/update`, data)
}
// 试验管理编辑基础信息上传图片
export const editBasicPictureApi = (data: any) => {
	return http.post(commonService + `/experiments/files`, data)
}
// 获取模块YJ列表
export const queryMKSZYJListApi = (params: any) => {
	return http.get(`${commonService}/service-definitions/list`, params)
}

// 创建模块样机
export const createMkyjApi = (data: any) => {
	return http.post(commonService + `/service-definitions/add`, data)
}

// 获取模块yj详情
export const getMkyjDetail = (id: any) => {
	return http.get(`${commonService}/service-definitions/detail/${id}`)
}

// 获取样机的通信配置
export const getYjDefinitionsConfig = (params: any) => {
	return http.get(`${commonService}/service-definitions/interfaces/query`, params)
}

// 获取配置信息
export const getYjDefinitionsSchema = (params: any) => {
	return http.get(`${commonService}/service-definitions/schema`, params)
}

// 更新服务基本信息
export const updateMkyjBaseApi = (data: any) => {
	return http.post(`${commonService}/service-definitions/update-basic`, data)
}

// 更新服务定义镜像信息
export const updateImageInfoApi = (data: any) => {
	return http.post(`${commonService}/service-definitions/update-image`, data)
}

// 获取组合YJ列表
export const queryZHSZYJListApi = (params: any) => {
	// return http.get(commonService + `/files`, params)
	console.log('params', params)
	return new Promise(resolve => {
		return resolve(ZHYJListData)
	})
}

// 标签列表
export const queryTagsList = (params: any) => {
	console.log('params', params)
	return new Promise(resolve => {
		return resolve(tagList)
	})
}

// 获取配置参数信息
export const getConfigParamsApi = (params: any) => {
	return http.get(`${thirdPartService}/service-definitions/configs/query`, params)
}
// 获取层级信息
export const getLevelRelation = (type: any) => {
	return http.get(`${commonService}/tags/levels`, { type })
}
// 修改层级信息
export const updateLevelApi = (data: any) => {
	return http.post(`${commonService}/tags/levels/update`, data)
}
// 修改配置信息
export const saveConfigParamsApi = (data: any) => {
	return http.post(`${thirdPartService}/service-definitions/configs/update`, data)
}

// 特性信息列表
export const characterInfoListApi = (params: any) => {
	return http.get(`${commonService}/properties/list`, params)
}

// 新增/编辑特性信息
export const addUpdatecharacterInfoApi = (data: any) => {
	return http.post(`${commonService}/properties/update`, data)
}

// 删除特性信息
export const deleteCharacterInfoApi = (data: any) => {
	return http.get(`${commonService}/properties/remove`, data)
}

// 特性信息版本列表
export const characterInfoVersionListApi = (id: any) => {
	return http.get(`${commonService}/properties/${id}/versions`)
}

// 获取特性基础信息信息
export const getCharacterBasicInfoApi = (id: any) => {
	return http.get(`${commonService}/properties/${id}`)
}

// 获取特性设置信息
export const getCharacterSettingInfoApi = (data: any) => {
	const { id, ...params } = data || {}
	return http.get(`${commonService}/properties/${id}/version-detail`, params)
}

// 更新设置特性信息
export const addUpdatecharacterSettingInfoApi = (data: any) => {
	return http.post(`${commonService}/properties/versions/update`, data)
}

// 层级关系的列表
export const getTagsLevels = (params: any) => {
	return http.post(`${commonService}/tags/levels`, params)
}
