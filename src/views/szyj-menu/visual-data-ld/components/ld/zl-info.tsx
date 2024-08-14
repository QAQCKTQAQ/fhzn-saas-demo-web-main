/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 10:03:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-12 16:47:37
 */
import { Col, Row, Tag } from 'antd'

export default function ZlInfo(props: any) {
	const { zl } = props || {}
	const renderTag = (text: any) => {
		if (text) {
			return <Tag color="lime">{text}</Tag>
		}
		return ''
	}
	return (
		<div className="zl-info box">
			<div className="title-box">
				<div className="title">指令信息</div>
			</div>
			<div className="inner-content-box">
				<Row gutter={[0, 8]}>
					<Col span={24}>
						<label>XT工作指令：</label>
						<span className="value">{renderTag(zl?.xietongzhiling) || '--'}</span>
					</Col>
					<Col span={24}>
						<label>主动指令：</label>
						<span className="value">{renderTag(zl?.zhudongzhiling) || '--'}</span>
					</Col>
					<Col span={24}>
						<label>被动干扰指令：</label>
						<span className="value">{renderTag(zl?.beidongganraozhiling) || '--'}</span>
					</Col>
					<Col span={24}>
						<label>干扰使能指令：</label>
						<span className="value">{renderTag(zl?.ganraozhiling) || '--'}</span>
					</Col>
					<Col span={24}>
						<label>XT通信指令：</label>
						<span className="value">{renderTag(zl?.xietongtongxinzhiling) || '--'}</span>
					</Col>
				</Row>
			</div>
		</div>
	)
}
