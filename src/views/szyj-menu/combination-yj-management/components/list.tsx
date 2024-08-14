import { Table, Popconfirm, Image, message } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList
	} = useContext(Context)

	const navigate = useNavigate()

	const columns = [
		{
			dataIndex: 'name',
			title: '组合实例YJ名称',
			render: (text: string, record: any) => {
				const { icon } = record
				return (
					<div className="name-icon">
						<Image src={icon} width={40} />
						<span className="name">{text}</span>
					</div>
				)
			}
		},
		{
			dataIndex: 'comment',
			title: '描述'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		}
	]

	const deleteYj = () => {
		message.success('删除成功！')
	}

	const operateColumn = {
		title: '操作',
		render: (_: any, record: any) => {
			const { id } = record
			return (
				<span className="actions">
					<a onClick={() => navigate(`/szyj-menu/combination-yj-detail/${id}`)}>查看</a>
					<Popconfirm title="确认删除吗？" onConfirm={deleteYj} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
						<a href="#" className="deleteWarn">
							删除
						</a>
					</Popconfirm>{' '}
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
