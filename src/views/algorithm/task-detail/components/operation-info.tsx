/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-25 14:12:30
 */
import { Button, Col, Form, Row, Space, Tag, Tooltip } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { TASK_STATUS_ENUM, TASK_STATUS_MAP, TASK_STATUS_TAG_COLOR, ASYNC_SUBSCRIBE_MODEL_MODAL } from '../../training-task/const'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { baseURL } from '@/config/config'
import { ASYNC_SUBSCRIBE_CHECK_LOG_MODAL } from '../const'
import TrainingLog from './training-log'
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
// 运行信息
export default function OperationInfo() {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}

	const renderExtra = () => {
		if (TASK_STATUS_ENUM.FINISHED === detailData?.status) {
			return (
				<Space>
					<Button
						type="link"
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_MODEL_MODAL, {
								...detailData,
								type: 'save',
								modalTitle: '保存模型'
							})
						}}
						size="small"
					>
						保存模型
					</Button>
				</Space>
			)
		}
		return null
	}

	// 根据状态渲染 错误信息
	const renderErrorTips = () => {
		const { status, error } = detailData
		if ([TASK_STATUS_ENUM.CREATED_FAILED, TASK_STATUS_ENUM.FAILED].includes(status)) {
			return (
				<Tooltip title={error}>
					<QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
				</Tooltip>
			)
		}
		return null
	}

	return (
		<div className="operation-info-box">
			<div className="header-title">
				运行信息
				{renderExtra()}
			</div>
			<Form preserve={false}>
				<Row>
					<Col span={8}>
						<Form.Item label={'当前状态:'}>
							<Space>
								<Tag color={TASK_STATUS_TAG_COLOR[detailData.status]}>{TASK_STATUS_MAP[detailData.status]}</Tag>
								{renderErrorTips()}
							</Space>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={'运行时长:'}>{detailData.runtime}</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={'训练日志:'}>
							<Button
								type="link"
								onClick={() => {
									LogReport(OPERATION_ENUM.TRAINING_TASK.DOWN_LOG, `${detailData?.name} - 下载训练日志`)
									window.open(`${baseURL}/aicp/training/${detailData.id}/logs/download`)
								}}
							>
								下载
							</Button>
							<Button type="link" onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_CHECK_LOG_MODAL, { id: detailData?.id })}>
								查看
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<TrainingLog />
		</div>
	)
}
