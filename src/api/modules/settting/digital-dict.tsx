import { commonService } from '@/api/config/servicePort'
import http from '@/api'

/**
 * 数字字典分类查询
 */
export const getDictTypeListApi = () => {
	return http.get(commonService + `/tags/dicts/classify/list`)
}

/**
 * 字典列表查询
 */
export const getDictListApi = (params: any) => {
	return http.get(commonService + `/tags/dicts`, params)
}

/**
 * 更新字典/标签配置
 */
export const addUpdateDictListApi = (data: any) => {
	return http.post(commonService + `/tags/dicts`, data)
}

/**
 * 删除字典枚举
 */
export const deleteDictApi = (params: any) => {
	console.log('params', params)
	return http.post(commonService + `/tags/delete`, params)
}
