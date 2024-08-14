/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-05 17:59:29
 */
/**
 * @name 数据管理模块
 */
import { commonService } from '@/api/config/servicePort'
import http from '@/api'

// 获取空间列表/文件夹/文件
export const filesQueryApi = (params: any) => {
	return http.get(commonService + `/files`, params)
}

// 新建空间/文件
export const addUpdateFilesApi = (data: any) => {
	return http.post(commonService + `/files/folders/update`, data)
}

// 数据空间新建空间
export const addUpdateDataSpaceApi = (data: any) => {
	return http.post(commonService + `/files/spaces/update`, data)
}

// 删除
export const deleteFilesApi = (data: any) => {
	return http.post(commonService + `/files/delete`, data)
}

// 关联的用户、组织架构、项目
export const queryPermitsApi = (buzType: string, buzId: string) => {
	return http.get(commonService + `/${buzType}/${buzId}/permits`)
}

// 设置的用户、组织架构、项目
export const updatePermitsApi = (data: any) => {
	return http.post(commonService + `/permits`, data)
}

// 获取该文件夹下文件类型
export const getFilesTypeApi = (folderId: any) => {
	return http.get(commonService + `/files/folders/${folderId}/files-type`)
}

// 导入文件到文件夹
export const importFileApi = (data: any) => {
	return http.post(commonService + `/files/import`, data)
}

// 数据空间文件详情
export const spaceDetaiilApi = (id: any) => {
	return http.get(commonService + `/files/${id}`)
}
// 数据集文件详情
export const fileDetaiilApi = (id: any, version: any, fileId: any) => {
	return http.get(commonService + `/dataset/${id}/versions/${version}/files/${fileId}`)
}

// 获取文件的上一个id
export const filePrevIdApi = (id: any, params: any) => {
	return http.get(commonService + `/files/${id}/previous`, params)
}

// 获取文件的下一个id
export const fileNextIdApi = (id: any, params: any) => {
	return http.get(commonService + `/files/${id}/next`, params)
}

// 文件重命名
export const fileNameUpdateApi = (data: any) => {
	return http.post(commonService + `/files/rename`, data)
}
// 获取层级信息
export const getDataSpaceTreeRelation = () => {
	return http.get(`${commonService}/files/spaces`)
}

// 增广文件保存
export const saveAugmentationFileApi = (data: any) => {
	return http.post(commonService + `/files/augmented`, data)
}

// 标注信息保存
export const saveMarkInfoApi = (data: any) => {
	return http.post(commonService + `/files/annotation`, data)
}
