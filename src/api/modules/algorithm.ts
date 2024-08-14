import { commonService } from '@/api/config/servicePort'
import http from '@/api'
/**
 * @name 训练任务模块
 */

// 获取训练任务列表
export const taskQueryApi = (params: any) => {
	return http.get(commonService + `/training`, params)
}

// 创建任务
export const createTaskApi = (data: any) => {
	return http.post(commonService + `/training/add`, data)
}

// 删除训练任务
export const taskDeleteApi = (data: any) => {
	return http.post(commonService + `/training/delete`, data)
}

// 终止训练任务
export const taskStopApi = (data: any) => {
	return http.post(commonService + '/training/stop', data)
}

// 更新训练任务
export const algorithmUpdate = (data: any) => {
	return http.post(commonService + `/training/update`, data)
}

// 获取训练任务产出的模型 tree
export const getModalsByTrainIdApi = (trainId: any) => {
	return http.get(commonService + `/training/${trainId}/outputs`)
}

// 模型下载
export const modelsDownloadApi = (data: any) => {
	return http.post(commonService + `/training/models/download`, data)
}

// 保存模型
export const saveModelsApi = (params: any) => {
	return http.post(commonService + `/training/model-version/import`, params)
}

// 训练任务详情
export const getTrainDetailApi = (trainId: any) => {
	return http.get(commonService + `/training/${trainId}`)
}
// 训练日志
export const getTrainingLogApi = (trainId: any, params: any) => {
	return http.get(commonService + `/training/${trainId}/logs`, params)
}
