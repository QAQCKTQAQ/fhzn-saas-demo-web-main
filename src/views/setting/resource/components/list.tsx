/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 10:46:59
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-22 18:17:02
 */
import { Table } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { STATUS_ENUM } from '@/const/constants'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_RESOURCE_MODAL } from '../const'
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
			dataIndex: 'code',
			title: '资源编码'
		},
		{
			dataIndex: 'name',
			title: '资源名称'
		},
		{
			dataIndex: 'parentCode',
			title: '父资源编码'
		},
		{
			dataIndex: 'resourceUrl',
			title: '资源URL'
		},
		{
			dataIndex: 'resourceTypeStr',
			title: '资源类型'
		},
		{
			dataIndex: 'status',
			title: '状态',
			render: renderStatus
		},
		{
			dataIndex: 'updatedTime',
			title: '更新时间'
		},
		{
			dataIndex: 'modifier',
			title: '操作员'
		},
		{
			dataIndex: 'sort',
			title: '排序号'
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
					<Auth requires="SYSTEM_SETTINGS_RESOURCE_EDIT">
						<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_RESOURCE_MODAL, record)}>编辑</a>
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
		</>
	)
}

export default List
