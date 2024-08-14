import { useEffect, useState, useRef } from 'react'
import { Form, Modal, Spin, Transfer, message } from 'antd'
import { roleQueryApi } from '@/api/modules/role'
import { authRoleQueryApi, authRoleToUserApi } from '@/api/modules/user'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_USER_AUTH_ROLE_MODAL } from '../const'
import { transformArray } from '@/utils/util'

interface RoleRecord {
	appCode?: string
	code?: string
	nickname?: string
}

function AuthRoleModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [dataSource, setDataSource] = useState([])
	const [targetKeys, setTargetKeys] = useState([])

	const currentData = useRef<RoleRecord>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_USER_AUTH_ROLE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_USER_AUTH_ROLE_MODAL)
		}
	}, [])

	useEffect(() => {
		if (visible) {
			Promise.all([getRoleQuery(), getAuthRoleQuery()]).then((values: any) => {
				const [allRoles, authRoles] = values
				const { roleList = [] } = authRoles || {}
				const { items = [] } = allRoles || {}
				handleTargetKeys(roleList)
				handleAllRoles(items)
			})
		}
	}, [visible])

	// 处理目标数据
	const handleTargetKeys = (data: any) => {
		setTargetKeys(transformArray(data, 'id', 'name', true))
	}

	const handleAllRoles = (allRoles: any) => {
		setDataSource(transformArray(allRoles, 'id', 'name', false))
	}

	const getRoleQuery = () => {
		return roleQueryApi({
			pageSize: 1000,
			page: 1,
			status: '1'
		})
	}

	const getAuthRoleQuery = () => {
		const { nickname } = currentData.current
		return authRoleQueryApi({
			targetUser: nickname
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
		setLoading(true)
		const { nickname } = currentData.current
		authRoleToUserApi({
			roleIds: targetKeys,
			targetUser: nickname
		})
			.then(() => {
				message.success('操作成功！')
				hideModal()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleChangeWithtargetKeys = (targetKeys: any) => {
		setTargetKeys(targetKeys)
	}

	return (
		<Modal
			width="800px"
			confirmLoading={loading}
			title={'用户分配角色'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
			className="m-page-user-auth-modal"
		>
			<Spin spinning={loading}>
				<Transfer
					dataSource={dataSource}
					titles={['可分配角色', '已分配角色']}
					showSearch
					listStyle={{
						width: 300,
						height: 400
					}}
					operations={['加入右侧', '加入左侧']}
					targetKeys={targetKeys}
					onChange={handleChangeWithtargetKeys}
					render={(item: any) => item.title}
				/>
			</Spin>
		</Modal>
	)
}

export default AuthRoleModal
