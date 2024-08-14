/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-09-12 15:19:36
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-12 15:52:33
 */
import React from 'react'
import { message } from 'antd'
export default function StatusToast(props: any) {
	const { statusData } = props

	console.log('statusData', statusData)
	const config_status: any = {
		'1': {
			title: 'LD工作状态',
			status: {
				'1': '主动搜索',
				'2': '主动截获',
				'3': '主动成像',
				'0': '主动关机'
			}
		},
		'2': {
			title: 'LD被动工作状态',
			status: {
				'1': '被动搜索',
				'2': '被动截获',
				'3': '被动关机',
				'4': '被动协同干扰'
			}
		},
		'3': {
			title: 'LD协同工作状态',
			status: {
				'1': '单弹',
				'2': '协同'
			}
		},
		'4': {
			title: 'HW成像',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'5': {
			title: '多模***成算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'6': {
			title: '主动雷达舰船*****识别算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'7': {
			title: '子阵****算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'8': {
			title: '分布式*****决策算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'9': {
			title: '复杂电*****同侦查算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'10': {
			title: '干扰行为*****算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'11': {
			title: '多源异构*****目标融合算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'12': {
			title: '固定****智能算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'13': {
			title: '单弹红外****别算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'14': {
			title: '单***舰船目标****识别算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		},
		'15': {
			title: 'SAR与可见****匹配算法',
			status: {
				'0': '关闭',
				'1': '开启'
			}
		}
	}

	return (
		<>
			{[
				{ type: '3', timeSlice: '222', status: 1 },
				{ type: '10', timeSlice: '222', status: 0 },
				{ type: '15', timeSlice: '222', status: 1 }
			].map((item: any, index: any) => {
				const { timeSlice, type, status } = item
				timeSlice
				index
				const itemObj = config_status[type]
				message.success(`${timeSlice} - ${itemObj?.title || ''} - ${itemObj.status[status]}`)
			})}
		</>
	)
}
