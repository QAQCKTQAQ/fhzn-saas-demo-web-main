import { useEffect } from 'react'

export default function StatusLi(props: any) {
	const { statusData } = props
	console.log('statusData', statusData)

	useEffect(() => {
		const dom: any = document.querySelector('.status-content')
		dom.scrollTo({ behavior: 'smooth', top: dom.scrollHeight })
	}, [statusData])

	// type:
	// 1-LD主动工作状态:
	// status:
	// 		 1:主动搜索
	// 		 2:主动截获
	// 		 3：主动成像
	// 		 0：主动关机
	// 2-LD被动工作状态:
	// status:
	// 		 1:被动搜索
	// 		 2:被动截获
	// 		 3：被动关机
	// 		 4：被动协同干扰
	// 3-LD协同工作状态:
	// status:
	// 		 1:单弹
	// 		 2:协同
	// 4-HW成像
	//  status:
	// 		 0:关闭
	// 		 1:开启
	// 5-duomoxinhaoshengchengsaunfa
	//  status:
	// 		 0:关闭
	// 		 1:开启
	// 6-dandan\jianchuan
	//  status:
	// 		 0:关闭
	// 		 1:开启
	// 7:zizhenchonggou
	// 8:ganraojuece
	// 9:renzhizhencha
	// 10:xietongganrao
	// 11:xietongronghe
	// 12:HWJZ
	// 13:hwfj
	// 14:hwjc
	// 15 sar
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
		<div className="code-data-status-box">
			<div className="title-box">
				<div className="title">YJGZ总体状态</div>
			</div>
			<ul className="status-content">
				{(statusData || []).map((item: any, index: any) => {
					const { timeSlice, type, status } = item
					const itemObj = config_status[type]
					return (
						<li key={index}>
							<div className="label">
								{timeSlice}-{itemObj?.title || ''}:{' '}
							</div>
							<span>{itemObj.status[status]}</span>
						</li>
					)
				})}

				{/* <li>
					<div className="label">LD开启主动识别:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">LD主动识别是否开启:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">HW成像是否开启:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">多源异构*****目标融合: </div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">干扰行*****测算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">多模***成算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">复杂电*****查算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">分布式*****策算法: </div>
					<span>开启</span>
				</li>
				<li>
					<div className="label"> 固定*****能算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">单弹红*****位识别算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">单弹*****别算法:</div>
					<span>开启</span>
				</li>
				<li>
					<div className="label">SAR与*****匹配算法: </div>
					<span>开启</span>
				</li> */}
			</ul>
		</div>
	)
}
