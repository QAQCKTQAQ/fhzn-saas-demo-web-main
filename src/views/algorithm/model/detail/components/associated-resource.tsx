import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// 部署信息
export default function AssociatedResource() {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(false)
	}, [])
	const dataSource: any[] | undefined = []

	const columns: any = [
		{
			dataIndex: 'name',
			title: '样机名称'
		},
		{
			dataIndex: 'modelType',
			title: '关联标签'
		},
		{
			dataIndex: 'modelForm',
			title: '样机类型'
		},
		{
			dataIndex: 'version',
			title: '调用次数'
		}
	]

	const operateColumn: any = {
		title: '操作',
		render: (_: any, record: any) => {
			const { id } = record
			return (
				<span className="actions">
					<Link to={`/szyj-menu/character-info/detail/${id}`}>查看</Link>
				</span>
			)
		}
	}

	return (
		<div className="side-bottom-box">
			<div className="header-title">部署信息</div>
			<Table
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
				scroll={{ x: 'max-content' }}
				size="small"
				loading={loading}
				pagination={false}
			/>
		</div>
	)
}
