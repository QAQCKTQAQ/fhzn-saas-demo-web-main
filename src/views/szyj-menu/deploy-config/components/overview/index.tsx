// 配置信息总览
import { Card, Col, Row, Progress, PageHeader } from 'antd'
import './index.less'

export default function OverView() {
	return (
		<div className="overview-box">
			<PageHeader title="部署总览" />
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Card title="CPU占用" className="component-overview-config">
						<label className="config-num">6</label> <Progress type="circle" percent={25} strokeWidth={12} />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="GPU占用" className="component-overview-config">
						<label className="config-num">6</label> <Progress type="circle" percent={45} strokeWidth={12} strokeColor="#a8df57" />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="内存占用" className="component-overview-config">
						<label className="config-num">4G</label>{' '}
						<Progress type="circle" percent={75} strokeWidth={12} strokeColor="#bf957a" />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="节点占用" className="component-overview-config">
						<label className="config-num">6</label> <Progress type="circle" percent={75} strokeWidth={12} strokeColor="#4d22e9" />
					</Card>
				</Col>
			</Row>
		</div>
	)
}
