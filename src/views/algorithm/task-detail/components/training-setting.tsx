/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-13 17:05:23
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-13 14:32:39
 */
import { Button, Col, Form, Input, Row } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { ASYNC_SUBSCRIBE_MODEL_MODAL } from '../../training-task/const'
import PubSub from 'pubsub-js'
import { Link } from 'react-router-dom'

// 训练设置
export default function TrainingSettingInfo() {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}

	const renderDataSetLink = () => {
		const { dataSetName, dataset } = detailData || {}
		const version = dataset?.version
		const id = dataset?.id
		if (id && version) {
			return (
				<Link to={`/data-manage/ds-detail-image?id=${id}&version=${version}&name=滑坡检测数据集-1018`} target="_blank">
					{dataSetName} - {version}
				</Link>
			)
		}
		return '-'
	}

	return (
		<div className="training-setting-box">
			<div className="header-title">训练设置</div>
			<Form preserve={false}>
				<Row>
					<Col span={12}>
						<Form.Item label={'算法名称:'}>{detailData.codeName}</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={'镜像名称:'}>{detailData.imageName}</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={'数据集名称:'}>{renderDataSetLink()}</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={'模型名称:'}>
							{detailData.modelName} - {detailData?.model?.version}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={'输出下载:'}>
							<Button
								type="link"
								onClick={() => {
									PubSub.publish(ASYNC_SUBSCRIBE_MODEL_MODAL, {
										...detailData,
										type: 'download',
										modalTitle: '下载训练数据'
									})
								}}
							>
								下载训练数据
							</Button>
						</Form.Item>
					</Col>
					{/* <Col span={12}>
						<Form.Item label={'输出下载:'}>
							{((TASK_STATUS_ENUM.FINISHED === detailData.status || TASK_STATUS_ENUM.PENDING === detailData.status) && (
								<a onClick={() => window.open(`${baseURL}/aicp/training/${detailData.id}/output/download`)}>
									<Button type="link">下载训练数据</Button>
								</a>
							)) ||
								null}
						</Form.Item>
					</Col> */}
					<Col span={24}>
						<Form.Item label={'运行命令:'}>
							<Input.TextArea disabled value={detailData?.command} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	)
}
