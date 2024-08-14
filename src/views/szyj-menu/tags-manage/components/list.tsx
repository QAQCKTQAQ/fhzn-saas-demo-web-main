import { Popconfirm, Table, message } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import { QuestionCircleOutlined } from '@ant-design/icons'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList
	} = useContext(Context)

	const columns = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			dataIndex: 'name',
			title: '标签名称'
		},
		{
			dataIndex: 'createTime',
			title: '创建时间'
		},
		{
			dataIndex: 'author',
			title: '创建用户'
		}
	]

	const deleteTag = () => {
		message.success('删除成功！')
	}

	const operateColumn = {
		title: '操作',
		render: (_: any, record: any) => {
			return (
				<span className="actions">
					<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_MODAL, record)}>编辑</a>
					<Popconfirm title="确认删除吗？" onConfirm={deleteTag} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
						<a href="#" className="deleteWarn">
							删除
						</a>
					</Popconfirm>
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
		</>
	)
}

export default List
