// YJ层级关联
export const YJ_BUZ_TYPE_ENUM = {
	GXYJ: '1',
	LDYJ: '21',
	RHYJ: '20',
	JCYJ: '4',
	KZYJ: '5',
	SJLYJ: '6'
}

export const YJ_BUZ_TYPE_MAP = {
	[YJ_BUZ_TYPE_ENUM.GXYJ]: 'GX样机',
	[YJ_BUZ_TYPE_ENUM.LDYJ]: `LD样机`,
	[YJ_BUZ_TYPE_ENUM.RHYJ]: '多源融合样机',
	[YJ_BUZ_TYPE_ENUM.JCYJ]: '决策样机',
	[YJ_BUZ_TYPE_ENUM.KZYJ]: '控制样机',
	[YJ_BUZ_TYPE_ENUM.SJLYJ]: '数据链样机'
}

export const YJ_BUZ_TYPE_OPTIONS = [
	// {
	// 	label: 'GX样机',
	// 	value: YJ_BUZ_TYPE_ENUM.GXYJ
	// },
	{
		label: `LD样机`,
		value: YJ_BUZ_TYPE_ENUM.LDYJ
	},
	{
		label: '多源融合样机',
		value: YJ_BUZ_TYPE_ENUM.RHYJ
	}
	// {
	// 	label: '决策样机',
	// 	value: YJ_BUZ_TYPE_ENUM.JCYJ
	// },
	// {
	// 	label: '控制样机',
	// 	value: YJ_BUZ_TYPE_ENUM.KZYJ
	// },
	// {
	// 	label: '数据链样机',
	// 	value: YJ_BUZ_TYPE_ENUM.SJLYJ
	// }
]

// 样机类型：智能/机能
export const BUZ_TYPE_ENUM = {
	INTELLIGENCE: '1',
	ENGINERY: '2'
}
// 样机类型：智能/机能
export const BUZ_TYPE_MAP = {
	[BUZ_TYPE_ENUM.INTELLIGENCE]: '智能',
	[BUZ_TYPE_ENUM.ENGINERY]: '机能'
}
export const BUZ_TYPE_OPTIONS = [
	{
		label: '智能',
		value: BUZ_TYPE_ENUM.INTELLIGENCE
	},
	{
		label: '机能',
		value: BUZ_TYPE_ENUM.ENGINERY
	}
]

// 代理对象
export const proxyTargetTypeEnum = {
	WQDD: 1
}
export const proxyTargetTypeMap = {
	[proxyTargetTypeEnum.WQDD]: 'WQDD'
}
export const proxyTargetTypeOptions = [
	{
		name: 'WQDD',
		code: proxyTargetTypeEnum.WQDD
	}
]

// 代理类型
export const proxyTypeEnum = {
	DDS: 1
}
export const proxyTypeMap = {
	[proxyTypeEnum.DDS]: 'DDS'
}
export const proxyTypeOptions = [
	{
		name: 'DDS',
		code: proxyTypeEnum.DDS
	}
]

// 模型形式
export const modelFormEnum = {
	link: 1
}
export const modelFormMap = {
	[modelFormEnum.link]: '链接库'
}
export const modelFormOptions = [
	{
		name: '链接库',
		code: modelFormEnum.link
	}
]

// 接口类型
export const proxyInterfaceEnum = {
	link: 1
}
export const proxyInterfaceMap = {
	[proxyInterfaceEnum.link]: '接口'
}
export const proxyInterfaceOptions = [
	{
		name: '接口',
		code: proxyInterfaceEnum.link
	}
]
