// 模块样机列表
export const MKYJListData = {
	items: [],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 5
}
// 组合yangj列表
export const ZHYJListData = {
	items: [
		{
			name: 'D2',
			comment: 'D2LD识别',
			creator: 'ZeroSi',
			createdTime: '2023-11-09 15:40:00'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 4
}
export const SYRWListData = {
	items: [],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 3
}

// 组合YJ层级列表
export const ZHYJTreeData = [
	{
		title: 'DD',
		key: '0-0',
		children: [
			{
				title: 'DD-1',
				key: '0-0-1'
			},
			{
				title: 'DD-2',
				key: '0-0-2'
			},
			{
				title: 'DD-3',
				key: '0-0-3'
			},
			{
				title: 'DD-4',
				key: '0-0-4'
			}
		]
	},
	{
		title: 'FJ',
		key: '0-1',
		children: [
			{
				title: 'FJ-16',
				key: '0-1-1'
			},
			{
				title: 'FJ-32',
				key: '0-1-2'
			}
		]
	}
]

// 标签下拉
export const tagsOptions = [
	{
		value: '1',
		label: 'LDYJ'
	},
	{
		value: '2',
		label: 'GXYJ'
	},
	{
		value: '3',
		label: 'DY融合YJ'
	}
]

// 标签
export const tagList = {
	items: [
		{
			name: 'LDYJ',
			id: '0',
			createTime: '2022/06/23 15:06:00',
			author: 'ZeorSi'
		},
		{
			name: 'GXYJ',
			id: '0',
			createTime: '2022/06/23 15:06:00',
			author: 'ZeorSi'
		},
		{
			name: 'DY融合YJ',
			id: '0',
			createTime: '2022/06/23 15:06:00',
			author: 'ZeorSi'
		}
	],
	page: 1,
	pageSize: 10,
	pages: 1,
	total: 4
}

// 模型类型列表
export const modelTypeList = [
	{
		id: 131,
		label: '目标检测',
		value: '102'
	},
	{
		id: 134,
		label: '目标跟踪',
		value: '201'
	}
]

// 模型列表
export const modelDataList = [
	{
		id: 131,
		label: '目标检测模型',
		value: '102'
	},
	{
		id: 134,
		label: '目标跟踪模型',
		value: '201'
	}
]

// 模型版本
export const modelDataVersions = [
	{
		id: 131,
		label: 'V1',
		value: '102'
	},
	{
		id: 134,
		label: 'V2',
		value: '201'
	}
]

// 算法列表
export const codeDataVersions = [
	{
		id: 131,
		label: '目标检测算法',
		value: '102'
	},
	{
		id: 134,
		label: '目标跟踪算法',
		value: '201'
	}
]

// 镜像依赖
export const contianerDataVersions = [
	{
		id: 131,
		label: '目标检测镜像',
		value: '102'
	},
	{
		id: 134,
		label: '目标跟踪镜像',
		value: '201'
	}
]

// 组合配置 - 模块样YJ级列表
export const MKYJTreeData = [
	{
		title: 'LDYJ',
		key: '0-0',
		children: [
			{
				title: 'LD识别YJ1',
				key: '0-0-1',
				type: 'LDYJ'
			},
			{
				title: 'LD识别YJ2',
				key: '0-0-2',
				type: 'LDYJ'
			}
		]
	},
	{
		title: 'GXYJ',
		key: '0-1',
		children: [
			{
				title: 'GX识别YJ1',
				key: '0-1-1',
				type: 'GXYJ'
			},
			{
				title: 'GX识别YJ2',
				key: '0-1-2',
				type: 'GXYJ'
			}
		]
	},
	{
		title: '多源融合YJ',
		key: '0-2',
		children: [
			{
				title: '多源融合YJ1',
				key: '0-2-1',
				type: 'RHYJ'
			}
		]
	}
]
