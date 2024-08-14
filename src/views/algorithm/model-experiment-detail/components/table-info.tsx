/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-31 09:44:36
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-17 15:47:27
 */
import { Table } from 'antd'
import React from 'react'
const dataSource: any = []
const loading: any = false
const pageInfo: any = {
	total: 10,
	page: 1,
	pageSize: 10
}
const List: React.FC = () => {
	const columns: any[] = [
		{
			dataIndex: 'id',
			title: '数据ID'
		},
		{
			dataIndex: 'data',
			title: '数据'
		},
		{
			dataIndex: 'createdTime',
			title: '测试时间'
		},
		{
			dataIndex: 'createdTime',
			title: '耗时'
		},
		{
			dataIndex: 'createdTime',
			title: '测试结果'
		}
	]
	const queryList: any = (params: any) => {
		params
		return []
	}

	return (
		<>
			<div className="data-table">
				<div className="title-box mt16">
					<div className="title">测试数据</div>
				</div>
				<Table
					rowKey="id"
					columns={[...columns]}
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
			</div>
		</>
	)
}

export default List
