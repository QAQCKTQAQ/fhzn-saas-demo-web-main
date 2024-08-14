// 配置信息总览
import { Col, Row, PageHeader } from 'antd'
import SingleConfig from './single-config'

export default function ConfigDetail() {
	const yjList = [
		{
			name: 'LD识别算法YJ1',
			type: 'LD'
		},
		{
			name: 'GX识别算法YJ1',
			type: 'GX'
		},
		{
			name: 'DY识别算法YJ1',
			type: 'RH'
		},
		{
			name: 'LD识别算法YJ2',
			type: 'LD'
		},
		{
			name: 'GX识别算法YJ2',
			type: 'GX'
		},
		{
			name: '多源识别算法YJ2',
			type: 'RH'
		}
	]
	return (
		<div className="config-detail-box">
			<PageHeader title="配置详情" />
			<Row gutter={[16, 16]}>
				{yjList.map((item: any) => {
					return (
						<Col span={8} key={item.name}>
							<SingleConfig config={item} />
						</Col>
					)
				})}
			</Row>
		</div>
	)
}
