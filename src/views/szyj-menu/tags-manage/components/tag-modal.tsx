import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import { STATUS_ENUM } from '@/const/constants'

interface Record {
	id?: any
}

function TagModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<Record | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		if (initialValues) {
			const { status, ...rest } = initialValues || {}
			return form.setFieldsValue({
				...rest,
				status: `${status}` === STATUS_ENUM.ENABLE ? 'checked' : false
			})
		}
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		setTimeout(() => {
			console.log(values)
			setLoading(false)
			message.success('操作成功！')
			hideModal()
			onOK && onOK()
		}, 2000)
		// getInterfaceByRecord(values)
		// 	.then(() => {

		// 	})
		// 	.finally(() => {
		// 		setLoading(false)
		// 	})
	}

	return (
		<Modal
			width="600px"
			confirmLoading={loading}
			title={record ? '编辑标签' : '新建标签'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} preserve={false}>
				<Row gutter={12}>
					<Col span={4}></Col>
					<Col span={16}>
						<Form.Item name={'name'} label={'标签名称'} rules={[{ required: true, message: '请输入标签名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={15} showCount />
						</Form.Item>
					</Col>
					<Col span={4}></Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default TagModal
