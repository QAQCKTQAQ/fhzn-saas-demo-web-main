/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-17 15:34:57
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-17 16:24:55
 */

import { ASYNC_SUBSCRIBE_TOPIC_DRAW } from '../const'
import { useState, useEffect } from 'react'
import { Drawer, Descriptions } from 'antd'
const RightTopicDraw = () => {
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_TOPIC_DRAW, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_TOPIC_DRAW)
		}
	}, [])
	// 关闭
	const showModal = () => {
		setVisible(true)
	}
	// 打开
	const hideModal = () => {
		setVisible(false)
	}
	return (
		<Drawer closable={false} open={visible} onClose={hideModal} destroyOnClose className="combination-config-info-modal">
			<div>
				<div className="info-title">参数列表</div>
				<Descriptions bordered column={1} labelStyle={{ width: '40%' }}>
					<Descriptions.Item label="探测角度">90°</Descriptions.Item>
					<Descriptions.Item label="探测范围">18KM2</Descriptions.Item>
					<Descriptions.Item label="频率测量精度">19MHZ</Descriptions.Item>
					<Descriptions.Item label="脉宽测量精度">US</Descriptions.Item>
					<Descriptions.Item label="中频道数">17MHZ</Descriptions.Item>
					<Descriptions.Item label="天线方向图">方向图一</Descriptions.Item>
					<Descriptions.Item label="工作频率">16MHZ</Descriptions.Item>
					<Descriptions.Item label="重频测量精度">12KHZ</Descriptions.Item>
					<Descriptions.Item label="天线布局方式">布局口面</Descriptions.Item>
				</Descriptions>
			</div>
		</Drawer>
	)
}
export default RightTopicDraw
