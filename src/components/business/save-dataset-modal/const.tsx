// 数据集划分 枚举值
export const DATA_SET_FILE_TYPE_ENUM = {
	TRAIN: 'train',
	VALIDATION: 'validation',
	TEST: 'test'
}

export const DATA_SET_FILE_TYPE_OPTIONS = [
	{
		label: '训练集',
		value: DATA_SET_FILE_TYPE_ENUM.TRAIN
	},
	{
		label: '验证集',
		value: DATA_SET_FILE_TYPE_ENUM.VALIDATION
	},
	{
		label: '测试集',
		value: DATA_SET_FILE_TYPE_ENUM.TEST
	}
]
