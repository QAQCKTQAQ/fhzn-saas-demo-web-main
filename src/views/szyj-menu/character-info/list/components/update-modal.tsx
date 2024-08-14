/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-27 16:25:14
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-12 15:02:21
 */
import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import { updateLevelApi } from '@/api/modules/szyj-manage'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_UPDATE_MODAL } from '../const'

interface Record {
	id?: any
	name?: any
}

function UpdateModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<Record | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_UPDATE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_UPDATE_MODAL)
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
			return form.setFieldsValue({
				...(initialValues || {})
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
		console.log(record, 'record===')
		setLoading(true)
		updateLevelApi({ ...record, ...values })
			.then(() => {
				message.success('操作成功！')
				hideModal()
				onOK && onOK()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Modal
			width="500px"
			confirmLoading={loading}
			title={record?.id ? '编辑' : '新增'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 5 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'名称'} rules={[{ required: true, message: '请输入名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入算法描述'} allowClear maxLength={200} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default UpdateModal
