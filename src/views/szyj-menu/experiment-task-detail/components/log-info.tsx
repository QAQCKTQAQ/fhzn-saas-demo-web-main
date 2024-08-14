/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 17:49:21
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-10 19:01:16
 */
import { Space, Table } from 'antd'
import { FileZipOutlined } from '@ant-design/icons'

const LogInfo = () => {
	const columns: any = [
		{
			dataIndex: 'name',
			title: '名称',
			render: (text: any) => {
				return (
					<Space>
						<FileZipOutlined />
						{text}
					</Space>
				)
			}
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
					<a>查看</a>
				</span>
			)
		}
	}
	return (
		<div className="image-info">
			<Table rowKey="id" columns={[...columns, operateColumn]} dataSource={[]} scroll={{ x: 'max-content' }} pagination={false} />
		</div>
	)
}

export default LogInfo
