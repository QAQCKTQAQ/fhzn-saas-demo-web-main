import './index.less'
import { Row, Col } from 'antd'
import CommunitationVersion2 from '../communitation-version2/index'
import StatusLi from './status-li'
import StatusToast from './status-toast'
import { Context } from '../../../../store/reducerContent'
import { useContext, useEffect, useRef, useState } from 'react'
let lockReconnect = false // 避免重复连接
import { wsUrl } from '@/config/config'

export default function Rocket() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId || ''
	// 当前点亮的command
	const [command, setCommand] = useState('')
	const [statusData, setStatusData] = useState<any>([]) // 接收的消息
	const statusRef: any = useRef([])
	const wsRef: any = useRef(null)
	const commandRef: any = useRef(null)
	const animationFrameRef: any = useRef(null)

	useEffect(() => {
		return () => {
			cancelAnimationFrame(animationFrameRef.current)
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
					module: 2
				})
			)
			false && heartCheck.reset().start()
		}

		wsRef.current.onmessage = (evt: any) => {
			let wsInfo: any = {}
			try {
				wsInfo = JSON.parse(evt.data) // 接收消息string=>json
			} catch (e) {
				console.log(e)
			}
			const { module, data } = wsInfo
			if (`${module}` === '201') {
				commandRef.current = data?.command
				setRequestAnimationFrame()
			}
			if (`${module}` === '202') {
				statusRef.current = [...statusRef.current, data]
				setStatusData(statusRef.current)
			}
		}
	}

	const setRequestAnimationFrame = () => {
		const data = commandRef.current
		setCommand(data)
		animationFrameRef.current = requestAnimationFrame(setRequestAnimationFrame)
	}

	return (
		<>
			<div className="rocket-tp" style={{ position: 'relative' }}>
				<Row gutter={24}>
					<Col span={24}>
						<div className="tx-container">
							<CommunitationVersion2 command={command} statusData={statusData} />
						</div>
					</Col>
				</Row>
				<StatusLi statusData={statusData} />
				<StatusToast statusData={statusData} />
			</div>
		</>
	)
}
