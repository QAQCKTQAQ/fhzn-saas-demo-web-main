// 红外目标智能识别算法
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getKJGSFApi } from '@/api/modules/visual-data'
import { Col, Row, Image, Empty } from 'antd'
import './index.less'

export default function HwsbCode() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [hongwaiInfo, setHongwaiInfo] = useState<any>([])

	useEffect(() => {
		if (selectDdId && selectTime) {
			getKJGSFInfo()
		}
	}, [selectDdId, selectTime])

	const getKJGSFInfo = async () => {
		const data = await getKJGSFApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setHongwaiInfo(data)
	}

	return (
		<>
			<div className="mult-container-item">
				<Row gutter={[8, 8]}>
					<Col span={12} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">SAR</div>
							</div>
							{(hongwaiInfo?.sarImageBase64 && (
								<Image className="sar-img" src={`data:image/png;base64,${hongwaiInfo?.sarImageBase64}`} />
							)) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col>
					<Col span={12} className="item-box">
						<div className="img-box">
							<div className="title-box">
								<div className="title font-size-12">可见光</div>
							</div>
							{(hongwaiInfo?.hwImageBase64 && (
								<Image className="sar-img" src={`data:image/png;base64,${hongwaiInfo?.hwImageBase64}`} />
							)) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</div>
					</Col>
				</Row>
			</div>
			<div className="mult-container-item">
				<div className="sar-kjg-box">
					<div className="title-box">
						<div className="title font-size-12">结果</div>
					</div>
					<Row gutter={[16, 16]}>
						<Col span={24} className="item-box">
							{(hongwaiInfo?.jieguo_image && (
								<Image className="sar-img" src={`data:image/png;base64,${hongwaiInfo?.jieguo_image}`} />
							)) || (
								<div className="empty-box">
									<Empty />
								</div>
							)}
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
