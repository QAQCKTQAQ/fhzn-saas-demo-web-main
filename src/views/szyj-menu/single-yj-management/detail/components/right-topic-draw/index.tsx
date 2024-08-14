/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-17 15:34:57
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-12 17:47:44
 */

import { ASYNC_SUBSCRIBE_TOPIC_DRAW } from '../../const'
import { useState, useEffect } from 'react'
import { Drawer, Table } from 'antd'
import { nanoid } from 'nanoid'

const RightTopicDraw = (props: any) => {
	let { schemaData, topics = [] } = props

	console.log('schemaData', schemaData, topics)
	const [visible, setVisible] = useState(false)

	const columns: any = [
		{
			title: '名称',
			dataIndex: 'fieldCn',
			key: 'fieldCn'
		},
		{
			title: '字段',
			dataIndex: 'field',
			key: 'field'
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: '备注',
			dataIndex: 'comment',
			key: 'comment'
		}
	]

	const recursionTreeData = (treeData: any) => {
		return treeData.map((item: any) => {
			const { fields, ...rest } = item || {}
			if (fields) {
				return { key: nanoid(), children: recursionTreeData(fields || []), ...rest }
			}
			return { tkey: nanoid(), ...rest }
		})
	}

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
		<Drawer
			width={'40%'}
			closable={false}
			open={visible}
			onClose={hideModal}
			destroyOnClose
			className="combination-config-info-modal"
		>
			<div className="title-box">
				<div className="title">通信协议结构体</div>
			</div>
			{(topics || []).map((topic: any) => {
				const schemaItem = schemaData.find((item: any) => item.name === topic)
				if (schemaItem) {
					const data = schemaItem?.fields || []
					if (data && data?.length) {
						return <Table columns={columns} dataSource={recursionTreeData(data)} pagination={false} key={topic} />
					}
				}
				return null
			})}
		</Drawer>
	)
}
export default RightTopicDraw
