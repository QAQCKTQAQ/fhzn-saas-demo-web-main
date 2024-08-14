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

// 协同工作指令
export const XIETONGZHILING_MAP = {
	'17': 'SD',
	'18': 'XT',
	'19': 'XTWCZ'
}

// 被动干扰指令
export const BEIDONGGANRAOZHILING_MAP = {
	'113': 'BDZZSS',
	'116': 'BDJH',
	'119': 'ZWGR',
	'121': 'BDGRWCZ',
	'128': 'BDGJ',
	'129': 'XTGR'
}
// 干扰使能指令
export const GANRAOSHINENGZHILING_MAP = {
	'255': 'TZGR',
	'85': 'QDGR'
}
// 协同通信指令
export const XIETONGTONGXINZHILING_MAP = {
	'51': 'XTMSSTARTSJLTXKQ',
	'68': 'XTMSCLOSESJLTXGJ',
	'85': 'XTSJLTXWCZ'
}

// 主动指令
export const ZHUDONGZHILING_MAP = {
	'97': 'ZDSS',
	'98': 'ZDJH',
	'99': 'ZDCX',
	'100': 'ZDGJ',
	'103': 'ZDWCZ'
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
// 协同工作状态
export const XIETONGGONGZUOSTATUS_MAP: any = {
	'17': '单弹',
	'18': '协同',
	'19': '协同无操作'
}
// 被动工作状态
export const BEIDONGGONGZUOSTATUS_MAP: any = {
	'113': '被动自主搜索(不干扰)',
	'116': '被动截获',
	'119': '自卫干扰',
	'121': '被动干扰无操作',
	'128': '被动关机',
	'129': '协同干扰'
}
// 目标信息-主动模式
// 主动目标属性
export const ZHUDONGMUBIAOSUXING_MAP: any = {
	// '0': 'HM',
	// '1': 'QZJ',
	// '2': 'DLT',
	// '3': 'MC',
	// '4': 'CLOUD',
	// '5': 'YW',
	// '6': 'BT',
	// '7': 'JF',
	// '8': 'YED',
	// '9': 'YSJ',
	// '10': 'YJJ',
	// '11': 'ZDJ',
	// '12': 'HZJ',
	// '13': 'FSC',
	// '14': 'LDC',
	// '15': 'ZD',
	'0': 'WX',
	'1': 'JC',
	'2': 'FJ',
	'3': 'CL',
	'4': 'CDBTGR',
	'5': 'ZXBTGR',
	'6': 'CDJFGR',
	'7': 'ZXJFGR',
	'8': 'ZB'
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
	'1': 'HKLD',
	'2': 'SSLD',
	'3': 'LJD'
}

export const ZZ_CG_ACTIVE_ENUM = {
	CENTER: 'CENTER',
	SIDE: 'SIDE',
	CENTER_SIDE: 'CENTER_SIDE'
}
