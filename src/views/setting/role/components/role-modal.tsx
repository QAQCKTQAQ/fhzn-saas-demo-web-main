import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Switch, Select } from 'antd'
import { roleAddApi, roleUpdateApi } from '@/api/modules/role'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_ROLE_MODAL } from '../const'
import { STATUS_ENUM } from '@/const/constants'

interface RoleRecord {
	id?: any
}

function RoleModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<RoleRecord | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_ROLE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_ROLE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		const initFormData = {
			sign: '',
			...(initialValues || {}),
			status: `${initialValues && initialValues.status}` === STATUS_ENUM.ENABLE ? 'checked' : false
		}
		form.setFieldsValue(initFormData)
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}

	// 处理提交数据
	const handleSubmitData = (data: any) => {
		const { status, ...rest } = data
		return {
			...rest,
			status: status ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLED
		}
	}

	const getInterfaceByRecord = (data: any) => {
		const id = (record && record.id) || ''
		const params = handleSubmitData({ id, ...data })
		if (id) {
			return roleUpdateApi(params)
		}
		return roleAddApi(params)
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		getInterfaceByRecord(values)
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
			width="600px"
			confirmLoading={loading}
			title={record ? '编辑角色' : '新建角色'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} layout="vertical" labelCol={{ span: 6 }} preserve={false}>
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item name={'name'} label={'角色名称'} rules={[{ required: true, message: '请输入角色名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'code'} label={'角色编码'} rules={[{ required: true, message: '请输入角色编码' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} disabled={!!record} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'sign'} label={'角色标识'}>
							<Select
								placeholder={'请选择'}
								options={[
									{
										label: '无',
										value: ''
									},
									{
										label: '应用管理员',
										value: 'ADMIN'
									}
								]}
							></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={'status'}
							valuePropName="checked"
							label={'用户状态'}
							rules={[{ required: true, message: '请选择用户状态' }]}
						>
							<Switch checkedChildren="启用" unCheckedChildren="停用" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'comment'} label={'备注'}>
							<Input placeholder={'请输入'} allowClear maxLength={256} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default RoleModal
