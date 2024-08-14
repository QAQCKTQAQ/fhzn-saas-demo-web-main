import { Table } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL, ASYNC_SUBSCRIBE_AUTH_MODAL } from '../const'
import AuthRoleModal from './auth-modal'
import { CodeSandboxOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList,
		setSelectKeys
	} = useContext(Context)

	const navigate = useNavigate()

	// 页面跳转
	const goLink = (id: any, name: any) => {
		setSelectKeys({ keys: [id], title: name })
		navigate(`/data-manage/space?parentId=${id}`)
	}

	const columns: any = [
		{
			dataIndex: 'name',
			title: '名称',
			fixed: 'left',
			render: (text: string, record: any) => {
				const { id, name } = record
				return (
					<div className="m-page-space-list-name">
						<a onClick={() => goLink(id, name)}>
							<CodeSandboxOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
							{text}
						</a>
					</div>
				)
			}
		},
		{
			dataIndex: 'comment',
			title: '描述'
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		},
		{
			dataIndex: 'modifier',
			title: '修改人'
		},
		{
			dataIndex: 'updatedTime',
			title: '最后修改时间'
		}
	]

	const operateColumn = {
		title: '操作',
		fixed: 'right',
		render: (_: any, record: any) => {
			return (
				<span className="actions">
					<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_MODAL, record)}>编辑</a>
					<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_AUTH_MODAL, record)}>权限分配</a>
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
