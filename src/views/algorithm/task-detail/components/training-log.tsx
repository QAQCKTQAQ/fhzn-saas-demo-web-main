/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-25 13:16:48
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-10 14:35:37
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ASYNC_SUBSCRIBE_CHECK_LOG_MODAL } from '../const'
import { useEffect, useState } from 'react'
import { Modal, Row, Empty, Spin, Button } from 'antd'
import { getTrainingLogApi } from '@/api/modules/algorithm'
import { RedoOutlined } from '@ant-design/icons'

function TrainingLog() {
	const [visible, setVisible] = useState(false)
	const [trainId, setTrainId] = useState<any | null>(null)
	const [loading, setLoading] = useState(false)
	const [trainingLogs, setTrainingLogs] = useState<any>([])
	const [totalCount, setTotalCount] = useState<any>(0)
	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CHECK_LOG_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CHECK_LOG_MODAL)
		}
	}, [])
	// 展开蒙层
	const showModal = (key: string, data: any) => {
		const { id } = data
		getInitTrainLogs({ trainId: id })
		setVisible(true)
		setTrainId(id || null)
	}
	// 关闭蒙层
	const hideModal = () => {
		setVisible(false)
	}
	// 查看上一页日志
	const lastPageLog = async () => {
		setLoading(true)
		const newTrainLogs: any = trainingLogs || []
		const { logId = '', timeStamp = '' } = newTrainLogs[0] || {}
		let restParams: any = {
			pageSize: 20,
			logId: logId,
			endTime: timeStamp
		}
		await getTrainingLogApi(trainId, restParams)
			.then((res: any) => {
				const { logs } = res || {}
				setTrainingLogs(logs.concat(newTrainLogs))
			})
			.finally(() => {
				setLoading(false)
			})
	}
	// 获取最新日志
	const getInitTrainLogs: any = async (params: any) => {
		setLoading(true)
		const { trainId } = params || {}
		await getTrainingLogApi(trainId, { pageSize: 20 })
			.then((res: any) => {
				const { logs, totalCount } = res || {}
				setTrainingLogs(logs)
				setTotalCount(totalCount)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const renderLogs = (data: any) => {
		return (
			<div>
				<Row gutter={24}>
					<p style={{ whiteSpace: 'pre-wrap' }}>{data?.date}</p>
					<p style={{ whiteSpace: 'pre-wrap' }}>{data?.msg ? renderLines(data.msg) : data?.msg}</p>
				</Row>
			</div>
		)
	}
	const renderLines = (data: any) => {
		let i
		let result = ''
		let c
		for (i = 0; i < data.length; i++) {
			c = data.substr(i, 1)
			if (c == '\n' || c == '\r') {
				result = `${result}\n`
			} else if (c != '\r' && c != '\n') {
				result = result + c
			}
		}
		return result
	}
	return (
		<>
			{(visible && (
				<Modal
					confirmLoading={loading}
					title="训练日志"
					open={visible}
					onCancel={hideModal}
					maskClosable={false}
					destroyOnClose
					footer={null}
					centered={true}
					className="log-content-style"
				>
					{(trainingLogs && trainingLogs.length && (
						<div
							onClick={() => {
								getInitTrainLogs({ trainId: trainId })
							}}
							style={{ position: 'fixed', top: '150px', right: '350px', zIndex: '999999' }}
						>
							<Button type="primary" shape="circle" icon={<RedoOutlined />} />
						</div>
					)) ||
						null}
					<Spin spinning={loading}>
						<div className="log-content">
							{(trainingLogs && trainingLogs.length && totalCount > trainingLogs.length && (
								<p
									onClick={() => {
										lastPageLog()
									}}
									style={{ cursor: 'pointer', textAlign: 'center', color: '#1890ff' }}
									className="check-more"
								>
									查看更多
								</p>
							)) ||
								null}
							{(trainingLogs &&
								trainingLogs.length &&
								trainingLogs.map((item: any) => {
									return renderLogs(item)
								})) || <Empty />}
						</div>
					</Spin>
				</Modal>
			)) ||
				''}
		</>
	)
}
export default TrainingLog
