import { Table, Modal, message } from 'antd'
import React, { useContext, useState } from 'react'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_P_P_MODAL } from '../const'
import AuthRoleModal from './auth-role-modal'
import Auth from '@/components/auth'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { userDeleteApi } from '@/api/modules/user'
import dayjs from 'dayjs'
import { rsaEnc } from '@/utils/util'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList
	} = useContext(Context)

	// 对数据源按照 id 进行倒序排序
	const sortedDataSource = [...dataSource].sort((a, b) => b.id - a.id)

	const renderStatus = (text: Int16Array) => {
		if (text) {
			return `${text}` === '0' ? '启用' : '停用'
		}
		return '-'
	}

	const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({})

	const togglePasswordVisibility = (recordId: string) => {
		setVisiblePasswords(prevState => ({
			...prevState,
			[recordId]: !prevState[recordId]
		}))
	}

	// 删除操作
	const queryDelete = (data: any) => {
		Modal.confirm({
			title: '确认删除',
			content: `确定要删除账号为 ${data.username} 的用户吗？`,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				// 执行删除逻辑，例如调用API删除用户
				userDeleteApi(handleSubmitData(data))
				message.success(`用户 账号：${data.username} 已删除`)
				queryList({})
			}
		})
	}

	const handleSubmitData = (data: any) => {
		const { password, ...rest } = data
		const encryptedPassword = password ? rsaEnc(password) : password
		return {
			...rest,
			password: encryptedPassword
		}
	}

	const columns = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			dataIndex: 'username',
			title: '账号'
		},
		{
			dataIndex: 'password',
			title: '密码',
			render: (text: string, record: any) => (
				<span>
					{visiblePasswords[record.id] ? text : '******'}
					<span onClick={() => togglePasswordVisibility(record.id)} style={{ marginLeft: 8, cursor: 'pointer' }}>
						{visiblePasswords[record.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
					</span>
				</span>
			)
		},
		{
			dataIndex: 'name',
			title: '用户名'
		},
		{
			dataIndex: 'phonenumber',
			title: '手机号码'
		},
		{
			dataIndex: 'type',
			title: '所属部门'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间',
			render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			dataIndex: 'updatedTime',
			title: '修改时间',
			render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			dataIndex: 'creator',
			title: '创建人'
		},
		{
			dataIndex: 'modifier',
			title: '更新人'
		},
		{
			dataIndex: 'status',
			title: '状态',
			render: renderStatus
		}
	]

	const operateColumn = {
		title: '操作',
		render: (_: any, record: any) => {
			return (
				<span className="actions">
					<Auth requires="SYSTEM_SETTINGS_USER_ALLOT_ROLE">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_P_P_MODAL, record)}>编辑</a>
					</Auth>
					<a onClick={() => queryDelete(record)}>删除</a>
				</span>
			)
		}
	}

	return (
		<>
			<Table
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={sortedDataSource}
				scroll={{ x: 'max-content' }}
				loading={loading}
				pagination={{
					total: pageInfo.total,
					pageSize: pageInfo.pageSize,
					current: pageInfo.page,
					showQuickJumper: true,
					showSizeChanger: true,
					showTotal: total => `共 ${total} 条`,
					onChange: (pageNum, pageSize) => queryList({ page: pageNum, pageSize })
				}}
			/>
			<AuthRoleModal />
		</>
	)
}

export default List
