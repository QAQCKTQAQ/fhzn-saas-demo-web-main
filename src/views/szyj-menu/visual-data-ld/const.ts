// YJ类型
export const YJ_TYPES: any = {
	LD: 'LD',
	RH: 'RH',
	GX: 'GX',
	SFSJ: 'SFSJ',
	GZDW: 'GZDW',
	GZ_STATUS: 'GZ_STATUS'
}

/****
 * 枚举值字典
 */
// LD ZL

// XT工作指令
export const XIETONGZHILING_MAP = {
	'17': '单弹',
	'18': 'XT',
	'19': 'XT无操作'
}

// 被动干扰指令
export const BEIDONGGANRAOZHILING_MAP = {
	'113': '被动自主搜索(不干扰)',
	'116': '被动截获',
	'119': '自卫干扰',
	'121': '被动干扰无操作',
	'128': '被动关机',
	'129': 'XT干扰'
}
// 干扰使能指令
export const GANRAOSHINENGZHILING_MAP = {
	'255': '停止干扰',
	'85': '启动干扰'
}
// XT通信指令
export const XIETONGTONGXINZHILING_MAP = {
	'51': 'XT工作模式开启，数据链通信开启',
	'68': 'XT工作模式关闭，数据链通信关机',
	'85': 'XT数据链通信无操作'
}

// 主动指令
export const ZHUDONGZHILING_MAP = {
	'97': '主动搜索',
	'98': '主动截获',
	'99': '主动成像',
	'100': '主动关机',
	'103': '主动无操作'
}
// LD工作状态

// 主动工作状态
export const ZHUDONGGONGZUOSTATUS_MAP: any = {
	'97': '主动搜索',
	'98': '主动截获',
	'99': '主动成像',
	'100': '主动关机',
	'103': '主动无操作'
}
// XT工作状态
export const XIETONGGONGZUOSTATUS_MAP: any = {
	'17': '单弹',
	'18': 'XT',
	'19': 'XT无操作'
}
// 被动工作状态
export const BEIDONGGONGZUOSTATUS_MAP: any = {
	'113': '被动自主搜索(不干扰)',
	'116': '被动截获',
	'119': '自卫干扰',
	'121': '被动干扰无操作',
	'128': '被动关机',
	'129': 'XT干扰'
}
// 目标信息-主动模式
// 主动目标属性
export const ZHUDONGMUBIAOSUXING_MAP: any = {
	'0': '无效',
	'1': '舰船',
	'2': '飞机',
	'3': '车辆',
	'4': '冲淡箔条干扰',
	'5': '质心箔条干扰',
	'6': '冲淡角反干扰',
	'7': '质心角反干扰',
	'8': '杂波'
	// '9': '运输机',
	// '10': '预警机',
	// '11': '战斗机',
	// '12': '轰炸机',
	// '13': '发射车',
	// '14': 'LD车',
	// '15': '阵地'
}
// 被动目标属性
export const BEIDONGMUBIAOSUXING_MAP: any = {
	'1': '火控LD',
	'2': '搜索LD',
	'3': '拦截弹'
}

export const ZZ_CG_ACTIVE_ENUM = {
	CENTER: 'CENTER',
	SIDE: 'SIDE',
	CENTER_SIDE: 'CENTER_SIDE'
}
