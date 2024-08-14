/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-17 13:32:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-27 11:14:21
 */
import { Table } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { STATUS_ENUM } from '@/const/constants'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_ROLE_MODAL, ASYNC_SUBSCRIBE_ASSIGNEDUSERS_MODAL, ASYNC_SUBSCRIBE_RIGHT_MODAL } from '../const'
import AssginUserModal from './assgin-user-modal'
import RoleRightModal from './role-right-modal'
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

	const columns: any = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			dataIndex: 'name',
			title: '角色名称'
		},
		{
			dataIndex: 'status',
			title: '状态',
			render: renderStatus
		},
		{
			dataIndex: 'code',
			title: '角色编码'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		},
		{
			dataIndex: 'modifier',
			title: '操作人'
		},
		{
			dataIndex: 'updatedTime',
			title: '操作时间'
		},
		{
			dataIndex: 'comment',
			title: '备注'
		}
	]

	const operateColumn: any = {
		title: '操作',
		fixed: 'right',
		render: (_: any, record: any) => {
			return (
				<span className="actions">
					<Auth requires="SYSTEM_SETTINGS_ROLE_AUTH">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_RIGHT_MODAL, record)}>权限分配</a>
					</Auth>
					<Auth requires="SYSTEM_SETTINGS_ROLE_EDIT">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_ROLE_MODAL, record)}>编辑</a>
					</Auth>
					<Auth requires="SYSTEM_SETTINGS_ROLE_USER">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_ASSIGNEDUSERS_MODAL, record)}>用户名单</a>
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
			<AssginUserModal />
			<RoleRightModal />
		</>
	)
}

export default List
