import { Col, Form, Row } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
// 资源规格
export default function SourceInfo() {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}

	const renderSource = () => {
		const { resources } = detailData
		const { cpu, gpu, memory } = resources || {}
		return {
			source: `${cpu || ''}CPU ${gpu || ''}GPU ${memory || ''}G内存`,
			type: gpu ? 'GPU' : 'CPU'
		}
	}

	return (
		<div className="source-info-box">
			<div className="header-title">资源规格</div>
			<Form preserve={false}>
				<Row>
					<Col span={8}>
						<Form.Item label={'节点类型:'}>{renderSource()?.type}</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={'节点数量:'}>1</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={'节点规格:'}>{renderSource()?.source}</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	)
}
