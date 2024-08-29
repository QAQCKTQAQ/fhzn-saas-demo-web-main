import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Switch } from 'antd'
import { userAddApi, userUpdateApi } from '@/api/modules/user'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_P_P_MODAL } from '../const'
import { STATUS_ENUM } from '@/const/constants'
import { rsaEnc } from '@/utils/util'

interface UserRecord {
	id?: any
}

function UserModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<UserRecord | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_P_P_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_P_P_MODAL)
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

	// 处理提交数据
	const handleSubmitData = (data: any) => {
		const { status, password, ...rest } = data
		const encryptedPassword = password ? rsaEnc(password) : password
		return {
			...rest,
			status: status ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLED,
			password: encryptedPassword // 使用加密后的密码
		}
	}

	const getInterfaceByRecord = (data: any) => {
		const id = (record && record.id) || ''
		const params = handleSubmitData({ id, ...data })
		if (id) {
			return userUpdateApi(params)
		}
		return userAddApi(params)
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
			title={record ? '编辑用户' : '新建用户'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form
				form={form}
				style={{ width: '100%' }}
				layout="vertical"
				labelCol={{ span: 6 }}
				preserve={false}
				initialValues={{ status: 'checked' }}
			>
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item
							name={'username'}
							label={'账号'}
							rules={[
								{ required: true, message: '请输入账号' },
								{ min: 3, message: '账号至少3位' }
							]}
						>
							<Input placeholder={'请输入'} allowClear maxLength={20} disabled={!!record} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={'name'}
							label={'用户名'}
							rules={[
								{ required: true, message: '请输入用户名' },
								{ min: 3, message: '用户名至少3位' }
							]}
						>
							<Input placeholder={'请输入'} allowClear maxLength={20} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={'phonenumber'}
							label={'手机号码'}
							rules={[
								{ pattern: /^\d+$/, message: '手机号必须为全数字' },
								{ len: 11, message: '手机号必须为11位数字' }
							]}
						>
							<Input placeholder={'请输入'} allowClear maxLength={11} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={'password'}
							label={'密码'}
							rules={[
								{ required: true, message: '请输入密码' },
								{ min: 3, message: '密码至少3位' }
							]}
						>
							<Input.Password placeholder={'请输入'} allowClear maxLength={20} showCount />
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
						<Form.Item name={'type'} label={'所属部门'}>
							<Input placeholder={'请输入'} allowClear maxLength={10} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default UserModal
