/**
 * @name useWebSocket
 * @export
 * @param {url} -（必需）ws/wss地址
 * @param {info} -（不必需）socket运行过程中的一些参数，进房参数joinParams，心跳参数heartParams
 * @returns
 * {ws} -socket对象
 * {wsData} -接收的socket消息
 */
import { useEffect, useState, useRef } from 'react'
let lockReconnect = false // 避免重复连接

function useWebSocket(url: string, options: any) {
	const { joinParams, heartParams } = options
	const wsRef: any = useRef(null)
	const [wsData, setWsData] = useState({}) // 接收的消息

	// 时间间隔
	const timeOutRef: any = useRef({
		heartCheckSecond: 10 * 1000, // 心跳检测间隔时长
		timeoutObj: null,
		serverTimeoutObj: null
	})

	useEffect(() => {
		if (!url) return
		createWebSocket()
	}, [url])

	// 创建
	const createWebSocket = () => {
		wsRef.current = new WebSocket(url)
		initWebSocket()
	}

	// 重连
	const reconnect = () => {
		if (lockReconnect) return
		lockReconnect = true
		setTimeout(function () {
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
					wsRef.current.send(heartParams)
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
			joinParams && wsRef.current.send(joinParams) // 发起c.jr进房操作
			heartParams && heartCheck.reset().start()
		}

		wsRef.current.onmessage = (evt: any) => {
			// console.log('xxxxxx-webSocket message:', evt)
			// let data = JSON.parse(evt.data) // 接收消息string=>json
			setWsData(evt)
			heartParams && heartCheck.reset().start()
		}
	}

	return [wsRef.current, wsData]
}
export default useWebSocket
