import { useEffect, useState, useRef } from 'react'
import { Form, Modal, message } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_PARAM_INFO_MODAL } from '../const'
import ParamInfo from '../../components/combination-param-info'

interface Record {
	id?: string
}

function ParamInfoModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	const currentData = useRef<Record>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_PARAM_INFO_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_PARAM_INFO_MODAL)
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
			width="60%"
			confirmLoading={loading}
			title={'参数配置'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<ParamInfo />
		</Modal>
	)
}

export default ParamInfoModal
