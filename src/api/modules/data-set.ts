/**
 * @name 资源管理
 */
import { DataSetService } from '@/api/config/servicePort'
import http from '@/api'
import { AuthService } from '@/api/config/servicePort'

// * 获取数据集列表
export const queryDataSetList = (params: any) => {
	return http.get(DataSetService, params)
}

// * 删除数据集
export const deleteDataSet = (data: any) => {
	console.log(data)
	return http.post(AuthService + `/v2/resource/add`, data)
}

// * 创建数据集
export const createDataSet = (data: any) => {
	return http.post(DataSetService + `/update`, data)
}

// * 发布数据集
export const publishDataSet = (data: any) => {
	return http.post(DataSetService + `/publish`, data)
}
// 数据集版本发布
export const publishVersionDataSet = (data: any) => {
	return http.post(DataSetService + `/versions/publish`, data)
}

// * 获取下一版本数据集
export const getNextVersionDataSet = (id: any) => {
	return http.get(DataSetService + `/${id}/next-version`, {})
}

// 文件保存为数据集
export const importFileDataSetApi = (data: any) => {
	return http.post(DataSetService + `/files/import`, data)
}

// 数据集版本列表
export const dataSetDetailsMap = (id: any, param: any) => {
	return http.get(DataSetService + `/${id}/versions`, param)
}

// 数据集下 图片列表
export const dataSetImgMap = (id: any, version: any, param: any) => {
	console.log(id, version, param)
	return http.get(DataSetService + `/${id}/versions/${version}/files`, param)
}

// 数据集基础信息
export const dataSetBasicInformation = (id: any, param: any) => {
	return http.get(DataSetService + `/${id}`, param)
}

// 数据集下 文件数量
export const dataSetAnnotationCount = (id: any, version: any, param: any) => {
	return http.get(DataSetService + `/${id}/${version}/annotation-count`, param)
}

// 向数据集增加数据
export const dataSetAdd = (data: any) => {
	return http.post(DataSetService + `/version/save-one`, data)
}

// 保存为数据集
export const dataSetSave = (data: any) => {
	return http.post(DataSetService + `/save-one`, data)
}

// 数据集版本详情
export const dataSetVersionDetailApi = (data: any) => {
	const { id, version } = data
	console.log(id, version)
	return http.get(`${DataSetService}/${id}/versions/${version}`)
}

// 编辑版本信息
export const dataSetVersionUpdateApi = (data: any) => {
	console.log(data)
	return http.post(`${DataSetService}/versions/update`, data)
}

// 导入文件到数据集版本
export const fileImportToDataSetApi = (data: any) => {
	console.log(data)
	return http.post(`${DataSetService}/versions/files/import`, data)
}

// 删除数据集版本下的文件
export const removeFilesInVersionApi = (data: any) => {
	console.log(data)
	return http.post(`${DataSetService}/versions/files/remove`, data)
}

// 获取数据集该版本数据数量
export const getVersionNum = (id: any, version: any, param: any) => {
	return http.get(DataSetService + `/${id}/versions/${version}/files/statistics`, param)
}
