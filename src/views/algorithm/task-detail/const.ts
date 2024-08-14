/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-25 13:15:49
 */
// 弹框发布订阅key
export const ASYNC_SUBSCRIBE_MODAL = 'ASYNC_SUBSCRIBE_MODAL'
// 权限分配弹框 key
export const ASYNC_SUBSCRIBE_MODEL_MODAL = 'ASYNC_SUBSCRIBE_MODEL_MODAL'
// 查看日志
export const ASYNC_SUBSCRIBE_CHECK_LOG_MODAL = 'ASYNC_SUBSCRIBE_CHECK_LOG_MODAL'

// 任务状态没举值
export const TASK_STATUS_ENUM = {
	UNHANDLE: 1,
	PENDING: 5, // 运行中
	FINISHED: 6,
	FAILED: 7,
	CREATED_FAILED: 4,
	STOP: 8
}

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
