/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-11 15:52:26
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-08 19:27:56
 */
// 波形捷变算法
import { YJ_TYPES } from '@/views/szyj-menu/visual-data/const'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/views/szyj-menu/visual-data/store/reducerContent'
import { getBXJBInfoApi } from '@/api/modules/visual-data'
import { Col, Row, Image, Empty } from 'antd'
import { useTranslation } from 'react-i18next'

export default function BxjbCode() {
	const { state, testId } = useContext(Context)
	const selectType = state?.selectType || YJ_TYPES.RH
	const selectDdId = state?.selectDdId || ''
	const selectTime = state?.selectTime || ''
	const [bxjbInfo, setBxjbInfo] = useState<any>([])
	const { t } = useTranslation()

	useEffect(() => {
		if (selectType === YJ_TYPES.RH && selectDdId && selectTime) {
			getBXJBInfo()
		}
	}, [selectType, selectDdId, selectTime])

	const getBXJBInfo = async () => {
		const data = await getBXJBInfoApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setBxjbInfo(data)
	}

	return (
		<>
			<div className="mult-container-item">
				<Row gutter={[8, 8]}>
					<Col span={8} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">{t('vd.code.spt')}</div>
							</div>
							{(bxjbInfo?.image1 && <Image className="sar-img" src={`data:image/png;base64,${bxjbInfo?.image1}`} />) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col>
					<Col span={8} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">{t('vd.code.tc_qh_yw_jl_x')}</div>
							</div>
							<div className="empty-box">
								<Empty />
							</div>
						</div>
					</Col>
					<Col span={8} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">{t('vd.code.dcl_y_df')}</div>
							</div>
							<div className="empty-box">
								<Empty />
							</div>
						</div>
					</Col>
					{/* <Col span={8} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">结果图4</div>
							</div>
							{(bxjbInfo?.multiDomainKGR_score?.length && <BXJBChart data={bxjbInfo?.multiDomainKGR_score || []} />) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col> */}
					<Col span={8} className="item-box">
						<div className="params-box">
							<Row gutter={[0, 8]}>
								<Col span={24}>
									<label>{t('LD')}载频：</label>
									<span className="value">{bxjbInfo?.leidazaipin || '--'}</span>
								</Col>
								<Col span={24}>
									<label>{t('LD')}宽带：</label>
									<span className="value">{bxjbInfo?.leida_kuandai || '--'}</span>
								</Col>
								<Col span={24}>
									<label>{t('LD')}脉宽：</label>
									<span className="value">{bxjbInfo?.leida_maichong || '--'}</span>
								</Col>
								<Col span={24}>
									<label>{t('LD')}脉冲重复时间：</label>
									<span className="value">{bxjbInfo?.leida_chongfushijian || '--'}</span>
								</Col>
								<Col span={24}>
									<label>{t('LD')}信号发射幅度：</label>
									<span className="value">{bxjbInfo?.leida_fashe || '--'}</span>
								</Col>
								{/* <Col span={24}>
									<label>抗干扰方法：</label>
									<span className="value">{bxjbInfo?.kangganrao || '--'}</span>
								</Col> */}
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}
