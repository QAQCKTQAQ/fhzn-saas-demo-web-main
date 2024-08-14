/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-27 14:54:37
 */
// ? 全局不动配置项 只做导出不做修改
import { cipher_text } from './ciphertext'
import { plain_text } from './plaintext'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// * 首页地址（默认）
export const HOME_URL: string = '/'

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址，暂时没用）
export const TABS_BLACK_LIST: string[] = ['/403', '/404', '/500', '/layout', '/login', '/dataScreen']

// * 高德地图key
export const MAP_KEY: string = ''
// 修改 by ckt
export const baseURL = import.meta.env.VITE_API_URL as string
export const wsUrl = 'ws://192.168.8.197:9999/ws'

const resources = {
	cipher: {
		// 加密
		translation: cipher_text
	},
	plain: {
		// 明文
		translation: plain_text
	}
}
i18n.use(initReactI18next).init({
	resources,
	lng: 'cipher',
	interpolation: {
		escapeValue: false
	}
})
export default i18n
