import { Table } from 'antd'
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// 关联资源
export default function AssociatedResource() {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(false)
	}, [])

	const dataSource: any[] | undefined = [
		{
			id: 1,
			name: '超音速DD-1',
			modelType: 'WQDD',
			modelForm: '超音速DD',
			version: 'V1',
			creator: 'ZeroSi',
			createdTime: '2023-01-13 17:05:00',
			proxyType: 'DDS',
			proxyObject: '数字'
		},
		{
			id: 2,
			name: '超音速DD-2',
			modelType: 'WQDD',
			modelForm: '超音速DD',
			version: 'V1',
			creator: 'ZeroSi',
			createdTime: '2023-01-13 17:05:00',
			proxyType: 'DDS',
			proxyObject: '数字'
		}
	]

	const columns: any = [
		{
			dataIndex: 'name',
			title: '名称'
		},
		{
			dataIndex: 'modelType',
			title: '模型类型'
		},
		{
			dataIndex: 'modelForm',
			title: '模型形式'
		},
		{
			dataIndex: 'version',
			title: '当前版本'
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
			dataIndex: 'proxyType',
			title: '代理类型'
		},
		{
			dataIndex: 'proxyObject',
			title: '代理对象'
		}
	]

	// const operateColumn = {
	// 	title: '操作',
	// 	render: (_: any, record: any) => {
	// 		const { id } = record
	// 		return (
	// 			<span className="actions">
	// 				<Link to={`/szyj-menu/character-info/detail/${id}`}>查看</Link>
	// 			</span>
	// 		)
	// 	}
	// }

	return (
		<div className="side-bottom-box">
			<div className="header-title">D资源</div>
			<Table
				rowKey="id"
				columns={[...columns]}
				dataSource={dataSource}
				scroll={{ x: 'max-content' }}
				size="small"
				loading={loading}
				pagination={false}
			/>
		</div>
	)
}
