/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 17:52:43
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-16 16:06:28
 */
import { Space, Table } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons'
import { getDDListApi } from '@/api/modules/visual-data'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { baseURL } from '@/config/config'

const ExperimentInfo = () => {
	const [dataSource, setDataSource] = useState([])
	const [search] = useSearchParams()
	const id = search.get('id')

	useEffect(() => {
		getDDList()
	}, [id])

	// 获取DD列表
	const getDDList = async () => {
		const dDList: any = await getDDListApi({ id })
		setDataSource(dDList || [])
	}

	const columns: any = [
		{
			dataIndex: 'instanceGroupId',
			title: '弹编号',
			render: (text: any) => {
				return (
					<Space>
						<FolderOpenOutlined />
						{text}
					</Space>
				)
			}
		},
		{
			dataIndex: 'groupId',
			title: '群组编号'
		},
		{
			dataIndex: 'isMain',
			title: '主/从弹',
			render: (text: any) => {
				return text ? '主弹' : '从弹'
			}
		},
		{
			dataIndex: 'isOffline',
			title: '状态',
			render: (text: any) => {
				return text ? '上线' : '下线'
			}
		}
	]

	const operateColumn: any = {
		title: '操作',
		render: (_: any, record: any) => {
			const { instanceGroupId } = record
			return (
				<span className="actions">
					<a
						href={`${baseURL}/aicp/third-party/experiments/${id}/excels?instanceGroupId=${instanceGroupId}`}
						target="_blank"
						rel="noreferrer"
					>
						导出
					</a>
				</span>
			)
		}
	}
	return (
		<div className="image-info">
			<Table
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
				scroll={{ x: 'max-content' }}
				pagination={false}
			/>
		</div>
	)
}

export default ExperimentInfo
