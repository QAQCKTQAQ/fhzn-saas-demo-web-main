import { Table, Tag, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/reducerContent'
import { TASK_STATUS_ENUM, TASK_STATUS_TAG_COLOR } from '@/views/algorithm/training-task/const'
import { QuestionCircleOutlined } from '@ant-design/icons'

// 测试信息
export default function TestInfo() {
	const [loading, setLoading] = useState(false)
	const {
		state: { baseInfo, dicts }
	} = useContext(Context)
	const { traningStatusTypeMap = {} } = dicts || {}

	useEffect(() => {
		setLoading(false)
	}, [])

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

	const columns: any = [
		{
			dataIndex: 'name',
			title: '任务名称',
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
						<Tag color={TASK_STATUS_TAG_COLOR[text]}>{traningStatusTypeMap[text]}</Tag>
						{renderErrorTips(record)}
					</>
				)
			}
		},
		{
			dataIndex: 'comment',
			title: '备注'
		}
	]

	return (
		<div className="side-bottom-box test-info">
			<div className="header-title">测试任务</div>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={baseInfo?.trainingVOS || []}
				scroll={{ x: 'max-content' }}
				size="small"
				loading={loading}
				pagination={false}
			/>
		</div>
	)
}
