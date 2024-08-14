/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-30 10:25:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-01 17:16:48
 */
import { Table } from 'antd'
import { ASYNC_SUBSCRIBE_PUBLIC, ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL } from '../const'
import React, { useContext, useEffect } from 'react'
import { Context } from '../store/reducerContent'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import PublicDataSetModal from './public-data-set'
import CreateDataSetVModal from './create-dataset-v-modal'

const List: React.FC = () => {
	const { state, queryList } = useContext(Context)
	const { loading, list } = state
	const { dataSource = [], pageInfo = {} } = list || {}
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const name = search.get('name') || '-'
	const id = search.get('id')

	useEffect(() => {
		queryList({ id: id })
	}, [])

	const columns: any = [
		{
			dataIndex: 'name',
			title: '数据集名称',
			render: (text: any, record: any) => {
				return <Link to={`/data-manage/ds-detail-image?id=${id}&version=${record.version}&name=${name}`}>{name}</Link>
			}
		},
		{
			dataIndex: 'version',
			title: '版本号',
			render: (text: any) => {
				return text || '-'
			}
		},
		{
			dataIndex: 'annotationCount',
			title: '已标注数量'
		},
		{
			dataIndex: 'fileCount',
			title: '总数量'
		},
		{
			dataIndex: 'creator',
			title: '创建用户',
			render: (text: any) => {
				return text || '-'
			}
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		},
		{
			dataIndex: 'comment',
			title: '版本描述'
		}
	]

	const operateColumn: any = {
		title: '操作',
		render: (_: any, record: any) => {
			const { ifPublished } = record
			return (
				<span className="actions">
					{/* 是否发布 */}
					{(!!ifPublished && <a className="gray">发布</a>) || (
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_PUBLIC, record)}>发布</a>
					)}
					<Link to={`/algorithm/training-task`}>创建训练</Link>
					<a
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL, record)
						}}
					>
						编辑
					</a>
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
			<PublicDataSetModal name={name} onOk={() => queryList({ id: id })} />
			<CreateDataSetVModal onOk={() => queryList({ id: id })} />
		</>
	)
}

export default List
