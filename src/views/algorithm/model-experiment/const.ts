/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-15 17:20:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-16 14:03:25
 */
// 弹框发布订阅key
export const ASYNC_SUBSCRIBE_MODAL = 'ASYNC_SUBSCRIBE_MODAL'
// 保存/下载模型弹框 key
export const ASYNC_SUBSCRIBE_MODEL_MODAL = 'ASYNC_SUBSCRIBE_MODEL_MODAL'
// 编辑弹窗
export const ASYNC_SUBSCRIBE_EDIT_MODAL = 'ASYNC_SUBSCRIBE_EDIT_MODAL'
// 创建
export const ASYNC_SUBSCRIBE_CRAET_MODAL = 'ASYNC_SUBSCRIBE_CRAET_MODAL'
// 任务状态没举值
export const TASK_STATUS_ENUM = {
	UNHANDLE: 1,
	PENDING: 5, // 运行中
	FINISHED: 6,
	FAILED: 7,
	CREATED_FAILED: 4,
	STOP: 8
}

// 任务控制
// const startControl: any = [1]
// const suspendControl: any = [5]
// const suspendControl: any = [5]

export const TASK_STATUS_MAP = {
	[TASK_STATUS_ENUM.UNHANDLE]: '待处理',
	[TASK_STATUS_ENUM.PENDING]: '运行中',
	[TASK_STATUS_ENUM.FINISHED]: '运行完成',
	[TASK_STATUS_ENUM.FAILED]: '运行失败',
	[TASK_STATUS_ENUM.CREATED_FAILED]: '创建失败',
	[TASK_STATUS_ENUM.STOP]: '已终止'
}

export const TASK_STATUS_OPTIONS = [
	{
		label: '待处理',
		value: TASK_STATUS_ENUM.UNHANDLE
	},
	{
		label: '运行中',
		value: TASK_STATUS_ENUM.PENDING
	},
	{
		label: '运行完成',
		value: TASK_STATUS_ENUM.FINISHED
	},
	{
		label: '运行失败',
		value: TASK_STATUS_ENUM.FAILED
	},
	{
		label: '创建失败',
		value: TASK_STATUS_ENUM.CREATED_FAILED
	},
	{
		label: '已终止',
		value: TASK_STATUS_ENUM.STOP
	}
]

export const TASK_STATUS_TAG_COLOR = {
	[TASK_STATUS_ENUM.UNHANDLE]: 'default',
	[TASK_STATUS_ENUM.PENDING]: 'processing',
	[TASK_STATUS_ENUM.FINISHED]: 'success',
	[TASK_STATUS_ENUM.FAILED]: 'error',
	[TASK_STATUS_ENUM.CREATED_FAILED]: 'error'
}

// 运行命令配置
export const command_config = '--train_model_out=/workspace/model_out --train_out=/workspace/out'

export const task_control: any = [
	{ name: '开始', tag: 'start' },
	{ name: '暂停', tag: 'suspend' },
	{ name: '终止', tag: 'termination' }
]
export const tag_map: any = {
	start: [1],
	suspend: [5],
	termination: [5]
}
