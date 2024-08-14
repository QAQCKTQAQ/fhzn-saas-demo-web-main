import { Button, Col, Empty, Row, Statistic, Tag } from 'antd'
import './index.less'
import { useEffect, useState } from 'react'
import { dataSetDetailsMap } from '@/api/modules/data-set'
import { useNavigate } from 'react-router-dom'
import EditDataSetVModal from './edit-dataset-v-modal'
import PublicDataSetModal from './public-data-set'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL, ASYNC_SUBSCRIBE_PUBLIC } from './const'
import { LinkOutlined } from '@ant-design/icons'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

export default function VersionList(props: any) {
	const { record } = props
	const [list, setList] = useState<any>([])
	const navigate = useNavigate()

	useEffect(() => {
		const { id } = record || {}
		if (id) {
			dataSetDetailsMap(id, {
				pageSize: 100,
				page: 1
			}).then((res: any) => {
				setList(res?.items || [])
			})
		}
	}, [record?.id])

	// 发布之后回调函数
	const renderListByCallBack = (data: any) => {
		const { name, id, version } = data
		LogReport(OPERATION_ENUM?.DATA_SET?.PUBLIC_DATA_SET, `数据集管理-数据集：${name}-${version}发布成功`)
		setList(
			list.map((item: any) => {
				if (item.id === id) {
					item.ifPublished = true
				}
				return item
			})
		)
	}

	// 渲染编辑
	const renderListByEditComment = (values: any) => {
		const { id, name, version, comment } = values || {}
		LogReport(OPERATION_ENUM?.COMMON?.EDIT, `数据集管理-数据集：${name}-${version}编辑成功`)
		setList(
			list.map((item: any) => {
				if (item.id === id) {
					item.comment = comment
				}
				return item
			})
		)
	}

	if (!list?.length) {
		return <Empty />
	}
	return (
		<div className="m-ds-version-list-box">
			<Row gutter={[16, 16]}>
				{(list || []).map((item: any) => {
					return (
						<Col span={6} key={item?.id}>
							<div className="version-box">
								<div
									style={{ cursor: 'pointer' }}
									onClick={() =>
										navigate(`/data-manage/ds-detail-image?id=${record?.id}&version=${item?.version}&name=${record?.name}`)
									}
								>
									<div className="version-icon">
										<Tag color="#1890ff" style={{ cursor: 'pointer' }} icon={<LinkOutlined />}>
											{item?.version}
										</Tag>
									</div>
									<div className="statistic-box">
										<Statistic title="标注数量" value={item?.annotationCount} />
										<Statistic title="总数量" value={item?.fileCount} />
									</div>
									<div className="des-info-box">
										<div className="des-info">{item?.comment}</div>
										<div className="creator-time">
											{item?.creator} · {item?.createdTime}
										</div>
									</div>
								</div>
								<div className="version-tool">
									<Button
										type="link"
										size="small"
										disabled={!!item?.ifPublished}
										onClick={() =>
											PubSub.publishSync(ASYNC_SUBSCRIBE_PUBLIC, { ...item, name: record?.name, datasetId: record?.id })
										}
									>
										{/* 是否发布 */}
										{(!!item?.ifPublished && '已发布') || '发布'}
									</Button>
									<Button type="link" size="small" onClick={() => navigate(`/algorithm/training-task`)}>
										创建训练
									</Button>
									<Button
										type="link"
										size="small"
										onClick={() =>
											PubSub.publishSync(ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL, {
												...item,
												name: record?.name,
												datasetId: record?.id
											})
										}
									>
										编辑
									</Button>
								</div>
							</div>
						</Col>
					)
				})}
			</Row>
			<PublicDataSetModal
				onOK={(v: any) => {
					renderListByCallBack(v)
				}}
			/>
			<EditDataSetVModal
				onOk={(v: any) => {
					renderListByEditComment(v)
				}}
			/>
		</div>
	)
}
