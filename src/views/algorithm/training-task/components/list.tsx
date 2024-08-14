import { Table, Tag, Popconfirm, message, Tooltip } from 'antd'
import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../store/reducerContent'
import { TASK_STATUS_TAG_COLOR } from '../const'
import AuthRoleModal from './model-modal'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import PubSub from 'pubsub-js'
import { TASK_STATUS_ENUM, ASYNC_SUBSCRIBE_MODEL_MODAL, ASYNC_SUBSCRIBE_EDIT_MODAL } from '../const'
import { taskDeleteApi, taskStopApi } from '@/api/modules/algorithm'
import { Link } from 'react-router-dom'
import EditTaskModal from './edit-modal'
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo, params },
			loading
		},
		state,
		queryList
	} = useContext(Context)
	const { traningStatusTypeMap = {} } = state?.dicts || {}
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
			title: '名称',
			render: (text: any, record: any) => {
				const { id } = record
				return <Link to={`/algorithm/task-detail/${id}`}>{text}</Link>
			}
		},
		{
			dataIndex: 'runtime',
			title: '训练时长'
		},
		{
			dataIndex: 'status',
			title: '状态',
			render: (text: number, record: any) => {
				return (
					<>
						<Tag color={TASK_STATUS_TAG_COLOR[text]}>{traningStatusTypeMap[text]}</Tag>
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
		// {
		// 	dataIndex: 'control',
		// 	title: '任务控制',
		// 	render: (text: any, record: any) => {
		// 		const { status } = record
		// 		return (
		// 			<>
		// 				{task_control.map((item: any, index: any) => {
		// 					return (
		// 						<Space key={index}>
		// 							<Button
		// 								style={{ margin: '8px' }}
		// 								size="small"
		// 								disabled={tag_map[item.tag].indexOf(status) != -1 ? false : true}
		// 								type={tag_map[item.tag].indexOf(status) != -1 ? 'primary' : 'default'}
		// 							>
		// 								{item.name}
		// 							</Button>
		// 						</Space>
		// 					)
		// 				})}
		// 			</>
		// 		)
		// 	}
		// }
	]

	const deleteRecord = async (record: any) => {
		const { id } = record
		await taskDeleteApi({ id })
		message.success('删除成功！')
		LogReport(OPERATION_ENUM.COMMON.DELETE, `${record?.name} - 删除成功`)
		queryList({})
	}

	const stopRecord = async (record: any) => {
		const { id } = record
		await taskStopApi({ id })
		message.success('终止成功！')
		LogReport(OPERATION_ENUM.TRAINING_TASK.STOP, `${record?.name} - 终止成功`)
		queryList({})
	}

	const operateColumn: any = {
		title: '操作',
		fixed: 'right',
		render: (text: any, record: any) => {
			const { status, id } = record
			return (
				<span className="actions">
					<Link to={`/algorithm/task-detail/${id}`}>查看</Link>
					<a
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_EDIT_MODAL, {
								...record
							})
						}}
					>
						编辑
					</a>
					<a
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_MODAL, {
								...record,
								modalTitile: '复制训练任务'
							})
						}}
					>
						复制
					</a>
					{/* 训练完成的 */}
					{(TASK_STATUS_ENUM.FINISHED === status && (
						<>
							<a
								onClick={() => {
									PubSub.publish(ASYNC_SUBSCRIBE_MODEL_MODAL, {
										...record,
										type: 'save',
										modalTitle: '保存模型'
									})
								}}
							>
								保存模型
							</a>
							{/* <a
								onClick={() => {
									PubSub.publish(ASYNC_SUBSCRIBE_MODEL_MODAL, {
										...record,
										type: 'download',
										modalTitle: '下载模型'
									})
								}}
							>
								下载模型
							</a> */}
						</>
					)) ||
						null}
					{(TASK_STATUS_ENUM.PENDING === status && (
						<Popconfirm
							title="确认终止训练任务吗？"
							onConfirm={() => stopRecord(record)}
							icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
						>
							<a href="#">终止</a>
						</Popconfirm>
					)) ||
						null}
					{(TASK_STATUS_ENUM.PENDING !== status && (
						<Popconfirm
							title="确认删除训练任务吗？"
							onConfirm={() => deleteRecord(record)}
							icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
						>
							<a href="#" className="deleteWarn">
								删除
							</a>
						</Popconfirm>
					)) ||
						null}
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
			<AuthRoleModal />
			<EditTaskModal />
		</>
	)
}

export default List
