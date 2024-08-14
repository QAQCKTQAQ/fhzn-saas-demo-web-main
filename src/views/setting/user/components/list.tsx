import { Table } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { STATUS_ENUM } from '@/const/constants'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL, ASYNC_SUBSCRIBE_USER_AUTH_ROLE_MODAL } from '../const'
import AuthRoleModal from './auth-role-modal'
import Auth from '@/components/auth'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList
	} = useContext(Context)

	const renderStatus = (text: string) => {
		if (text) {
			return `${text}` === `${STATUS_ENUM.ENABLE}` ? '启用' : '停用'
		}
		return '-'
	}

	const columns = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			dataIndex: 'nickname',
			title: '账号'
		},
		{
			dataIndex: 'nicknameCn',
			title: '用户名'
		},
		{
			dataIndex: 'mobile',
			title: '手机号码'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
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
					<Auth requires="SYSTEM_SETTINGS_USER_EDIT">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_USER_AUTH_ROLE_MODAL, record)}>角色分配</a>
					</Auth>
					<Auth requires="SYSTEM_SETTINGS_USER_ALLOT_ROLE">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_MODAL, record)}>编辑</a>
					</Auth>
				</span>
			)
		}
	}

	return (
		<>
			<Table
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
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
