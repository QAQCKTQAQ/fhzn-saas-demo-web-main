/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-15 17:21:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-12 19:55:27
 */
import { Table, Tag, Tooltip } from 'antd'
import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../store/reducerContent'
import { TASK_STATUS_MAP, TASK_STATUS_TAG_COLOR } from '../const'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ASYNC_SUBSCRIBE_CRAET_MODAL, TASK_STATUS_ENUM } from '../const'
import PubSub from 'pubsub-js'
// import { taskDeleteApi, taskStopApi } from '@/api/modules/algorithm'
import { Link } from 'react-router-dom'
// import { task_control, tag_map } from '../const'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo, params },
			loading
		},
		queryList
	} = useContext(Context)
	const setTimeRef: any = useRef()

	useEffect(() => {
		clearTimeout(setTimeRef.current)
		socketGetList(params)
		return () => clearTimeout(setTimeRef.current)
	}, [params])

	// 10秒 长轮训 查询当前训练任务列表，更新状态
	const socketGetList = (params: any) => {
		setTimeRef.current = setTimeout(() => {
			queryList(params)
			socketGetList(params)
		}, 10000)
	}

	// 根据状态渲染 错误信息
	const renderErrorTips = (record: any) => {
		const { status, error } = record
		if ([TASK_STATUS_ENUM.CREATED_FAILED, TASK_STATUS_ENUM.FAILED].includes(status)) {
			return (
				<Tooltip title={error}>
					<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
				</Tooltip>
			)
		}
		return null
	}

	const columns: any[] = [
		{
			dataIndex: 'id',
			title: 'ID'
		},
		{
			dataIndex: 'name',
			title: '测试名称',
			render: (text: any, record: any) => {
				const { id } = record
				return <Link to={`/algorithm/model-experiment-detail/${id}`}>{text}</Link>
			}
		},
		{
			dataIndex: 'status',
			title: '任务状态',
			render: (text: number, record: any) => {
				return (
					<>
						<Tag color={TASK_STATUS_TAG_COLOR[text]}>{TASK_STATUS_MAP[text]}</Tag>
						{renderErrorTips(record)}
					</>
				)
			}
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		}
	]

	const operateColumn: any = {
		title: '操作',
		fixed: 'right',
		render: (text: any, record: any) => {
			const { id } = record
			return (
				<span className="actions">
					<a
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_CRAET_MODAL, {
								...record
							})
						}}
					>
						编辑
					</a>
					<Link to={`/algorithm/model-experiment-detail/${id}`}>查看</Link>
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
