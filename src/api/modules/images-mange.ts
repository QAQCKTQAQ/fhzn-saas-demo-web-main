/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-03 13:17:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-31 17:14:45
 */
import { AlgorithmTraining } from '@/api/config/servicePort'
import http from '@/api'
/**
 * 获取镜像管理列表
 */
export const imagesListQery = (params: any) => {
	return http.get(AlgorithmTraining + `/image/list`, params)
}

/**
 * 获取构建镜像列表
 */
export const buildImagesListApi = (params: any) => {
	return http.get(AlgorithmTraining + `/image/build/list`, params)
}

// 镜像新增、更新
export const addOrUpdateImages = (data: any) => {
	return http.post(AlgorithmTraining + `/image/saveOrUpdate`, data)
}

//构建镜像 新增、更新
export const addOrUpdateBuildImages = (data: any) => {
	return http.post(AlgorithmTraining + `/image/build`, data)
}

// filecode换harbor
export const changeHarborUrl = (data: any) => {
	return http.post(AlgorithmTraining + `/image/upload`, data)
}
// 删除镜像
export const imagesDelete = (data: any) => {
	return http.post(AlgorithmTraining + `/image/del`, data)
}
