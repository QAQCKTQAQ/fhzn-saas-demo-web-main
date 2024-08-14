/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-15 11:32:06
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-17 10:00:25
 */
import { Card, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const TestInfo = () => {
	const navigate = useNavigate()

	const dataSource = [
		{
			name: '试验1',
			platform: '仿真平台1',
			status: '已完成',
			endTime: '2022-06-29 15:06:00',
			startTime: '2022-06-24 15:06:00',
			createTime: '2022-06-23 15:06:00',
			creator: '司工'
		}
	]

	const columns: any = [
		{
			dataIndex: 'name',
			title: '试验名称'
		},
		{
			dataIndex: 'platform',
			title: '试验平台'
		},
		{
			dataIndex: 'status',
			title: '试验状态'
		},
		{
			dataIndex: 'startTime',
			title: '试验开始时间'
		},
		{
			dataIndex: 'endTime',
			title: '试验结束时间'
		},
		{
			dataIndex: 'createTime',
			title: '创建时间'
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		}
	]

	const operateColumn: any = {
		title: '操作',
		render: () => {
			return (
				<span className="actions">
					<a
						onClick={() => {
							navigate('/test/experiment-task-detail?id=1')
						}}
					>
						查看
					</a>
				</span>
			)
		}
	}
	return (
		<div className="image-info">
			<Card title="关联试验" bordered={false}>
				<Table
					rowKey="id"
					columns={[...columns, operateColumn]}
					dataSource={dataSource}
					scroll={{ x: 'max-content' }}
					pagination={false}
				/>
			</Card>
		</div>
	)
}

export default TestInfo
