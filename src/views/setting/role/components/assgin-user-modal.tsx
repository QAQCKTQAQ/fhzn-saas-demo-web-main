import { useEffect, useRef, useState } from 'react'
import { Form, Input, Modal, Row, Col, Radio, Empty, Avatar, message } from 'antd'
import { queryAssignedUsersApi, assignUsersToRoleApi } from '@/api/modules/role'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_ASSIGNEDUSERS_MODAL } from '../const'
import { UserOutlined } from '@ant-design/icons'

interface RoleRecord {
	appCode?: any
	code?: any
}

function AssginUserModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState('')
	const [assginUsers, setAssginUsers] = useState<any>([])
	const currentData = useRef<RoleRecord>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_ASSIGNEDUSERS_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_ASSIGNEDUSERS_MODAL)
		}
	})

	useEffect(() => {
		if (visible) {
			const { appCode, code } = currentData.current
			queryAssignedUsersApi({
				appCode,
				code,
				page: 1,
				pageSize: 1000
			}).then((res: any) => {
				const { items = [] } = res || {}
				setAssginUsers(items)
			})
		}
	}, [visible])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current = data
		setTitle(`${data.name} - 关联用户列表`)
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
	}

	// 处理提交数据
	const handleSubmitData = (data: any) => {
		const { userList, ...rest } = data
		return {
			...rest,
			userList: `${userList}`.split(',')
		}
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { appCode, code } = currentData.current
		setLoading(true)
		const params = handleSubmitData({ ...values, appCode, code })
		assignUsersToRoleApi(params)
			.then(() => {
				message.success('操作成功！')
				hideModal()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const renderAssginUsers = () => {
		if (assginUsers.length) {
			return (
				<Row gutter={16}>
					{assginUsers.map((item: any) => {
						return (
							<>
								<Col span={6} key={item.nickname}>
									<div className="assgin-user-modal-list-li">
										<Avatar size={48} icon={<UserOutlined />} />
										<div className="assgin-user-modal-list-nickname">
											<span>{item.nickname}</span>
											<div>{item.nicknameCn}</div>
										</div>
									</div>
								</Col>
							</>
						)
					})}
				</Row>
			)
		}
		return <Empty description="暂无关联用户" />
	}

	return (
		<Modal
			width="800px"
			confirmLoading={loading}
			title={title}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form
				form={form}
				initialValues={{ type: '1' }}
				style={{ width: '100%' }}
				layout="vertical"
				labelCol={{ span: 6 }}
				preserve={false}
			>
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item name={'userList'} label={'用户'} rules={[{ required: true, message: '请输入用户账号' }]}>
							<Input placeholder={'请输入需要分配的用户（多个用户半角逗号分隔）'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'type'} label={'类型'}>
							<Radio.Group>
								<Radio value={'1'}>添加</Radio>
								<Radio value={'2'}>解除</Radio>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'已关联用户'}>
							<div className="assgin-user-modal-list">{renderAssginUsers()}</div>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default AssginUserModal
