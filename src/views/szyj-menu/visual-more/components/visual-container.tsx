import { Card, Col, Row, Image } from 'antd'
import HRRP from './HRRP'
import AntennaDirection from './antenna-direction'
import Doppler from './doppler'
import BXJB from './BXJB'
import { Context } from '../store/reducerContent'
import { useContext } from 'react'

export default function VisualContainer() {
	const { state } = useContext(Context)
	const checkedKeys = state?.checkedKeys || []

	return (
		<div className="visual-container">
			<div className="header">DD1</div>
			<div className="visual-container-box">
				<Row gutter={[8, 8]}>
					{checkedKeys.includes('0-0-1-1-1') && (
						<Col span={8}>
							<Card title="HB图像">
								<BXJB />
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-1-2-1') && (
						<Col span={8}>
							<Card title="一维距离像">
								<HRRP />
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-1-2-2') && (
						<Col span={8}>
							<Card title="SAR图像">
								<div className="sar-box">
									<Image src="https://www.o-map.cn/images/stripmap-0527-16.jpg" preview={false} />
								</div>
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-1-2-3') && (
						<Col span={8}>
							<Card title="距离多普勒">
								<Doppler />
							</Card>
						</Col>
					)}

					{checkedKeys.includes('0-0-1-2-4') && (
						<Col span={8}>
							<Card title="天线方向">
								<AntennaDirection />
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-1-2-5') && (
						<Col span={8}>
							<Card title="BXJB">
								<BXJB />
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-2-1-1') && (
						<Col span={8}>
							<Card title="RD图">
								<Doppler />
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-2-1-2') && (
						<Col span={8}>
							<Card title="SAR图">
								<div className="hb-box">
									<Image className="hb-img" src="https://www.o-map.cn/images/stripmap-0527-16.jpg" preview={false} />
								</div>
							</Card>
						</Col>
					)}
					{checkedKeys.includes('0-0-2-1-3') && (
						<Col span={8}>
							<Card title="GX像">
								<div className="hb-box">
									<Image
										className="hb-img"
										src="https://p4.itc.cn/q_70/images03/20210123/83bacb1515ed48a699a9d6aa14b3877b.png"
										preview={false}
									/>
								</div>
							</Card>
						</Col>
					)}
				</Row>
			</div>
		</div>
	)
}
