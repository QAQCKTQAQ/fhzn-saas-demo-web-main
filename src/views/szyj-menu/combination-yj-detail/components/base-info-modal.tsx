import { useEffect, useState, useRef } from 'react'
import { Form, Modal, message } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_BASE_INFO_MODAL } from '../const'
import BaseInfo from '../../components/combination-base-info'

interface Record {
	id?: string
}

function BaseInfoModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	const currentData = useRef<Record>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_BASE_INFO_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_BASE_INFO_MODAL)
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

	const submit = async () => {
		setLoading(true)
		setTimeout(() => {
			message.success('操作成功！')
			hideModal()
			setLoading(false)
		}, 2000)
	}

	return (
		<Modal
			width="40%"
			confirmLoading={loading}
			title={'编辑组合实例YJ信息'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<BaseInfo />
		</Modal>
	)
}

export default BaseInfoModal
