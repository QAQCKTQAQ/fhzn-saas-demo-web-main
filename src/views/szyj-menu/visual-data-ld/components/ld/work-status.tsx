/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 10:03:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-26 15:32:45
 */
import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

export default function WorkStatus(props: any) {
	const { status } = props || {}
	const { t } = useTranslation()
	return (
		<div className="status-info box">
			<div className="title-box">
				<div className="title">工作状态</div>
			</div>
			<div className="inner-content-box">
				<Row gutter={[0, 8]}>
					<Col span={24}>
						<label>{t('vd.ldyj.zd_gz_zt')}：</label>
						<span className="value">{status?.zhudong_gongzuo || '--'}</span>
					</Col>
					<Col span={24}>
						<label>XT工作状态：</label>
						<span className="value">{status?.xietong_gongzuo || '--'}</span>
					</Col>
					<Col span={24}>
						<label>被动LD工作状态：</label>
						<span className="value">{status?.BD_gongzuozhuangtai || '--'}</span>
					</Col>
				</Row>
			</div>
		</div>
	)
}
