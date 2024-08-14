import TargetInfo from './target-info'
import WorkStatus from './work-status'
import ZlInfo from './zl-info'
import './index.less'
import { Col, Row } from 'antd'
import HeDirection from './he-direction'
import SarInfo from './sar-info'
import YiWeiJuLiXiang from './yi-wei-juli-x'
import { Context } from '../../store/reducerContent'
import { useContext, useEffect, useRef, useState } from 'react'
import { getLdInfoApi } from '@/api/modules/visual-data'
import AntennaArrayMode from './antenna-array-mode'
import { wsUrl } from '@/config/config'
import Doppler from './doppler'

import {
	XIETONGZHILING_MAP,
	BEIDONGGANRAOZHILING_MAP,
	GANRAOSHINENGZHILING_MAP,
	XIETONGTONGXINZHILING_MAP,
	ZHUDONGZHILING_MAP,
	ZHUDONGGONGZUOSTATUS_MAP,
	XIETONGGONGZUOSTATUS_MAP,
	BEIDONGGONGZUOSTATUS_MAP
} from '../../const'

let lockReconnect = false // 避免重复连接

export default function LdContainer() {
	const wsRef: any = useRef(null)
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [ldInfo, setLdInfo] = useState<any>({})
	const [tabVaue, setTabValue] = useState<any>('zhudong')
	const [wsData, setWsData] = useState<any>({}) // 接收的消息

	useEffect(() => {
		return () => {
			clearTimeout(timeOutRef.current.reconnectTimeOut)
			wsRef.current && wsRef.current.close()
		}
	}, [])

	useEffect(() => {
		if (selectDdId && testId) {
			wsRef.current && wsRef.current.close()
			createWebSocket()
		}
	}, [selectDdId, testId])

	// 时间间隔
	const timeOutRef: any = useRef({
		heartCheckSecond: 10 * 1000, // 心跳检测间隔时长
		timeoutObj: null,
		serverTimeoutObj: null,
		reconnectTimeOut: null
	})

	// 创建
	const createWebSocket = () => {
		try {
			wsRef.current = new WebSocket(wsUrl)
			initWebSocket()
		} catch (e) {
			console.log(e)
		}
	}

	// 重连
	const reconnect = () => {
		if (lockReconnect) return
		lockReconnect = true
		timeOutRef.current.reconnectTimeOut = setTimeout(function () {
			// 没连接上会一直重连，设置延迟避免请求过多
			createWebSocket()
			lockReconnect = false
		}, 20000)
	}

	const initWebSocket = () => {
		// 初始化socket
		wsRef.current.onclose = (evt: any) => {
			// 关闭
			console.log('断开连接code:' + evt.code)
			reconnect()
		}

		wsRef.current.onerror = (evt: any) => {
			// 连接错误
			console.log('连接失败code:' + evt.code)
			reconnect()
		}
		// 心跳检测
		const heartCheck = {
			reset: function () {
				clearTimeout(timeOutRef.current.timeoutObj)
				clearTimeout(timeOutRef.current.serverTimeoutObj)
				return this
			},
			start: function () {
				timeOutRef.current.timeoutObj = setTimeout(function () {
					// 这里发送一个心跳，后端收到后，返回一个心跳消息，
					wsRef.current.send('Ping')
					timeOutRef.current.serverTimeoutObj = setTimeout(function () {
						// 如果超过一定时间还没重置，说明后端主动断开了
						wsRef.current.close()
					}, timeOutRef.current.heartCheckSecond)
				}, timeOutRef.current.heartCheckSecond)
			}
		}

		wsRef.current.onopen = function () {
			let dt = new Date()
			let str =
				dt.getFullYear() +
				'-' +
				(dt.getMonth() + 1) +
				'-' +
				dt.getDate() +
				' ' +
				dt.getHours() +
				':' +
				dt.getMinutes() +
				':' +
				dt.getSeconds()
			console.log('连接成功:' + str)
			wsRef.current.send(
				JSON.stringify({
					instanceGroupId: selectDdId,
					experimentId: testId,
					module: 1
				})
			)
			heartCheck.reset().start()
		}

		wsRef.current.onmessage = (evt: any) => {
			let wsInfo: any = {}
			try {
				wsInfo = JSON.parse(evt.data) // 接收消息string=>json
			} catch (e) {
				console.log(e)
			}
			const { moudle, data } = wsInfo
			if (`${moudle}` === '101') {
				setWsData(data)
			}
		}
	}

	useEffect(() => {
		if (selectTime && selectDdId) {
			getLdInfo()
		}
	}, [selectDdId, selectTime, tabVaue])

	// 获取LD信息
	const getLdInfo = async () => {
		const data = await getLdInfoApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setLdInfo(data || {})
	}

	const keyMap: any = {
		xietongzhiling: XIETONGZHILING_MAP,
		zhudongzhiling: ZHUDONGZHILING_MAP,
		beidongganraozhiling: BEIDONGGANRAOZHILING_MAP,
		ganraozhiling: GANRAOSHINENGZHILING_MAP,
		xietongtongxinzhiling: XIETONGTONGXINZHILING_MAP,
		zhudong_gongzuo: ZHUDONGGONGZUOSTATUS_MAP,
		xietong_gongzuo: XIETONGGONGZUOSTATUS_MAP,
		BD_gongzuozhuangtai: BEIDONGGONGZUOSTATUS_MAP
	}
	// 中文映射
	const renderChinese = (obj: any) => {
		let copyObj: any = { ...obj }
		for (const key in copyObj) {
			// eslint-disable-next-line no-prototype-builtins
			if (copyObj.hasOwnProperty(key)) {
				let x: any = keyMap[key] || {}
				let y: any = x[copyObj[key]] || '--'
				copyObj[key] = y || '--'
			}
		}
		return copyObj
	}

	// 渲染SAR图像
	const renderSar = () => {
		const { sar } = ldInfo || {}
		return (
			<Col span={4}>
				<SarInfo sar={sar} />
			</Col>
		)
	}

	// 渲染RD图像
	const renderRD = () => {
		// const { sar } = ldInfo || {}
		return (
			<Col span={4}>
				<Doppler />
			</Col>
		)
	}

	const mapValue: any = {
		initiative: 'zhudong',
		passiveness: 'beidong'
	}
	// 主动被动切换
	const tabChange = (e: any) => {
		setTabValue(mapValue[e])
	}
	// 渲染一维距离像
	const renderHRRP = () => {
		let { yiweijulixiang = [] } = ldInfo
		if (!yiweijulixiang?.length) {
			yiweijulixiang = [[], [], [], [], [], []]
		}
		return (yiweijulixiang || []).map((item: any, index: any) => {
			return (
				<Col span={4} key={index}>
					<YiWeiJuLiXiang key={index} data={yiweijulixiang[index]} info={index + 1} />
				</Col>
			)
		})
	}
	// 空数据
	// const nullData = (title: any) => {
	// 	return (
	// 		<div className="zl-info box">
	// 			<div className="title-box">
	// 				<div className="title">{title}</div>
	// 			</div>
	// 			<div className="inner-content-box">
	// 				<Empty></Empty>
	// 			</div>
	// 		</div>
	// 	)
	// }
	return (
		<div className="ld-container">
			<div className="ld-container-1">
				<Row gutter={[8, 8]}>
					<Col span={3}>{<ZlInfo zl={renderChinese(ldInfo?.zl || {})} />}</Col>
					<Col span={3}>{<WorkStatus status={renderChinese(ldInfo?.status || {})} />}</Col>
					<Col span={18}>
						<TargetInfo
							tabChange={(e: any) => {
								tabChange(e)
							}}
							target={ldInfo?.target || {}}
						/>
					</Col>
				</Row>
			</div>
			<div className="ld-container-2">
				<Row gutter={[8, 8]}>
					<Col span={12}>
						<AntennaArrayMode
							beidongjihuo={wsData?.zizhen?.beidongjihuo || []}
							zhudongfashe={wsData?.zizhen?.zhudongfashe || []}
							zhudongjieshou={wsData?.zizhen?.zhudongjieshou || []}
						/>
					</Col>
					<Col span={4}>{<HeDirection hefangxiangtu={wsData?.hefangxiangtu || {}} tabValue={tabVaue} />}</Col>
					{renderSar()}
					{renderRD()}
				</Row>
				<Row gutter={[8, 8]} style={{ marginTop: '8px' }}>
					{renderHRRP()}
				</Row>
			</div>
		</div>
	)
}
