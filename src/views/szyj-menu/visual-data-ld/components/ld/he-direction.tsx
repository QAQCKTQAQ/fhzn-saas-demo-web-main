/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-05 19:08:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-04 13:59:59
 */
import { useRef } from 'react'
import ModelA from '../../../material-manage-creat-details/components/model-a'
import { Col, Empty, Row } from 'antd'
import { useContext } from 'react'
import { Context } from '../../store/reducerContent'
import { useTranslation } from 'react-i18next'

export default function HeDirection(props: any) {
	const { t } = useTranslation()
	const currentCanvas: any = useRef()
	const { tabValue, hefangxiangtu } = props
	const { state } = useContext(Context)
	const zzCgActive = state?.zzCgActive || ''

	return (
		<div className="he-direction-box">
			<div className="inner-content-box" id="he-direction">
				<Row gutter={[0, 16]}>
					<Col span={24}>
						<div className="title-box">
							<div className="title">{t('vd.ldyj.he_fx_t')}</div>
						</div>
						<div className="he-container">
							{tabValue === 'zhudong' ? (
								<ModelA hefangxiangtu={hefangxiangtu} zzCgActive={zzCgActive} ref={currentCanvas}></ModelA>
							) : (
								<Empty></Empty>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}
