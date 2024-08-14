/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 11:10:18
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-31 16:13:40
 */
import { useEffect, useState, useRef } from 'react'
import { Form, Modal, Spin, message, Row, Col, TreeSelect, Empty, Button } from 'antd'
import { queryPermitsApi, updatePermitsApi } from '@/api/modules/data-manage'
import { userQueryApi } from '@/api/modules/user'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_AUTH_MODAL } from '../const'
import { BUZ_TYPE_ENUM } from '@/const/constants'
import { UserOutlined } from '@ant-design/icons'

const { SHOW_PARENT } = TreeSelect

interface AuthRecord {
	id?: string
	name?: string
}

function AuthModal(props: any) {
	const { onOk } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [userList, setUserList] = useState<any[]>([])
	const [userNameList, setUserNameList] = useState<any[]>([])

	const currentData = useRef<AuthRecord>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_AUTH_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_AUTH_MODAL)
		}
	}, [])

	const getUserList = () => {
		userQueryApi({
			pageSize: 1000,
			page: 1
		}).then(res => {
			const { items = [] } = res || {}
			setUserList(transformKeyLabel(items || [], 'nickname', 'nicknameCn'))
		})
	}

	useEffect(() => {
		if (visible) {
			getUserList()
			// 获取当前目录的用户
			getRoleQuery()
		}
	}, [visible])

	// 数组对象转变
	const transformKeyLabel = (arr: any[], key: string, title: string) => {
		return arr.map((item: any) => {
			const value = item[key]
			const label = item[title]
			return {
				value,
				key: value,
				title: label
			}
		})
	}

	const getRoleQuery = () => {
		const { id } = currentData.current || {}
		queryPermitsApi(BUZ_TYPE_ENUM.DATASET, `${id}`).then((res: any) => {
			const { users = [] } = res || {}
			const userNames = users.map((item: any) => item.nickname)
			form.setFieldsValue({
				users: userNames
			})
			setUserNameList(userNames)
		})
	}

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current = data
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
	}

	const submit = async () => {
		const { users = [] } = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		updatePermitsApi({
			buzType: BUZ_TYPE_ENUM.DATASET,
			buzId: currentData.current.id,
			users: (users || []).map((nickname: any) => {
				return { nickname }
			})
		})
			.then(() => {
				onOk && onOk({ name: currentData?.current?.name })
				message.success('操作成功！')
				hideModal()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const treeSelectProps = {
		treeCheckable: true,
		showCheckedStrategy: SHOW_PARENT,
		placeholder: '请选择',
		style: {
			width: '100%'
		}
	}

	// 渲染按钮颜色
	// const renderBtnStyle = () => {
	// 	const color = getRandomColor()
	// 	return {
	// 		background: color,
	// 		borderColor: color,
	// 		color: '#fff'
	// 	}
	// }

	const renderAuthUser = () => {
		if (!userNameList.length) {
			return <Empty description="暂无授权用户" />
		}
		return (
			<>
				{userNameList.map((nickname, index) => {
					const user = userList.find(item => item.value === nickname)
					if (user) {
						return (
							<Col key={index}>
								<Button shape="round" icon={<UserOutlined />}>
									{user.title}
								</Button>
							</Col>
						)
					}
					return null
				})}
			</>
		)
	}

	return (
		<Modal
			width="600px"
			confirmLoading={loading}
			title={'权限分配'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
			className="m-page-user-auth-modal"
		>
			<Spin spinning={loading}>
				<Form form={form} style={{ width: '100%' }} labelCol={{ span: 4 }} preserve={false}>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item name={'users'} label={'选择用户'} rules={[{ required: true, message: '请选择用户' }]}>
								<TreeSelect {...treeSelectProps} treeData={userList} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label={'已分配权限'}>
								<Row gutter={[4, 4]}>{renderAuthUser()}</Row>
							</Form.Item>
						</Col>
						{/* <Col span={24}>
							<Form.Item name={'departments'} label={'选择组织'}>
								<TreeSelect {...treeSelectProps} treeData={organizationList} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'teams'} label={'选择项目组'}>
								<TreeSelect {...treeSelectProps} treeData={teamList} />
							</Form.Item>
						</Col> */}
					</Row>
				</Form>
			</Spin>
		</Modal>
	)
}

export default AuthModal
