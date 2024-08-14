import { useEffect, useState, useRef } from 'react'
import { Form, Drawer, Descriptions } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CONFIG_INFO_MODAL } from '../const'

interface Record {
	id?: string
}

function ConfigInfoModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)

	const currentData = useRef<Record>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CONFIG_INFO_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CONFIG_INFO_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current = data
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
	}

	// const submit = async () => {
	// 	setTimeout(() => {
	// 		message.success('操作成功！')
	// 		hideModal()
	// 	}, 2000)
	// }

	return (
		<Drawer closable={false} open={visible} onClose={hideModal} destroyOnClose className="combination-config-info-modal">
			<div>
				<div className="info-title">基础信息</div>
				<Descriptions bordered column={1} labelStyle={{ width: '40%' }}>
					<Descriptions.Item label="名称">90°</Descriptions.Item>
					<Descriptions.Item label="图片">18KM2</Descriptions.Item>
					<Descriptions.Item label="描述">18KM2</Descriptions.Item>
				</Descriptions>
			</div>
			<div>
				<div className="info-title">参数信息</div>
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

export default ConfigInfoModal
