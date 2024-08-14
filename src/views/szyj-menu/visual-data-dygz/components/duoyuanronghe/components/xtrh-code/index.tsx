// XT融合识别算法
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getDYRHInfoApi } from '@/api/modules/visual-data'
import { Col, Row, Image, Empty, Tabs } from 'antd'
import { isArray } from 'lodash'

export default function XtrhCode() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [rhInfo, setRhInfo] = useState<any>([])
	const [selectActive, setSelectActive] = useState<any>()
	console.log('selectDdId', state)

	useEffect(() => {
		if (selectDdId && selectTime) {
			getDYRHInfo()
		}
	}, [selectDdId, selectTime])

	const getDYRHInfo = async () => {
		const data = await getDYRHInfoApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setSelectActive(0)
		setRhInfo((isArray(data) && data) || [])
	}

	const renderTabs = () => {
		return (
			(rhInfo &&
				(rhInfo || []).map((item: any, index: any) => {
					return {
						key: index,
						label: `目标${index + 1}关联样本对`,
						children: renderTabsChildren(item)
					}
				})) ||
			''
		)
	}

	// XT算法
	const renderTabsChildren = (item: any) => {
		const { sar = {}, hongwai = {}, output = {} } = item || {}
		return (
			<>
				<div className="mult-container-item">
					<Row gutter={[16, 16]}>
						<Col span={12} className="item-box">
							<div className="img-box">
								<div className="title-box">
									<div className="title font-size-12">SAR</div>
								</div>
								{(sar.image && <Image className="sar-img" src={`data:image/png;base64,${sar.image}`} />) || <Empty />}
							</div>
							<div className="params-box">
								<Row gutter={[0, 8]}>
									<Col span={24}>
										<label>图像宽度：</label>
										<span className="value">{sar?.image_kuandu}</span>
									</Col>
									<Col span={24}>
										<label>图像高度：</label>
										<span className="value">{sar?.image_gaodu}</span>
									</Col>
									<Col span={24}>
										<label>目标属性：</label>
										<span className="value">{sar?.tar_suxing}</span>
									</Col>
									<Col span={24}>
										<label>目标识别置信度：</label>
										<span className="value">{sar?.tar_rec}</span>
									</Col>
									<Col span={24}>
										<label>识别目标经度：</label>
										<span className="value">{sar?.tar_long}</span>
									</Col>
									<Col span={24}>
										<label>识别目标纬度：</label>
										<span className="value">{sar?.tar_lat}</span>
									</Col>
									<Col span={24}>
										<label>识别目标高度:</label>
										<span className="value">{sar?.tar_gaodu}</span>
									</Col>
									<Col span={24}>
										<label>目标识别像素中心位置X：</label>
										<span className="value">{sar?.tar_x}</span>
									</Col>
									<Col span={24}>
										<label>目标识别像素中心位置Y：</label>
										<span className="value">{sar?.tar_y}</span>
									</Col>
								</Row>
							</div>
						</Col>
						<Col span={12} className="item-box">
							<div className="img-box">
								<div className="title-box">
									<div className="title font-size-12">红外</div>
								</div>
								{(hongwai.image && <Image className="sar-img" src={`data:image/png;base64,${hongwai.image}`} />) || <Empty />}
							</div>
							<div className="params-box">
								<Row gutter={[0, 8]}>
									<Col span={24}>
										<label>图像宽度：</label>
										<span className="value">{hongwai?.image_kuandu}</span>
									</Col>
									<Col span={24}>
										<label>图像高度：</label>
										<span className="value">{hongwai?.image_gaodu}</span>
									</Col>
									<Col span={24}>
										<label>目标属性：</label>
										<span className="value">{hongwai?.tar_suxing}</span>
									</Col>
									<Col span={24}>
										<label>目标识别置信度：</label>
										<span className="value">{hongwai?.tar_rec}</span>
									</Col>
									<Col span={24}>
										<label>识别目标经度：</label>
										<span className="value">{hongwai?.tar_long}</span>
									</Col>
									<Col span={24}>
										<label>识别目标纬度：</label>
										<span className="value">{hongwai?.tar_lat}</span>
									</Col>
									<Col span={24}>
										<label>识别目标高度:</label>
										<span className="value">{hongwai?.tar_gaodu}</span>
									</Col>
									<Col span={24}>
										<label>目标识别像素中心位置X：</label>
										<span className="value">{hongwai?.tar_X}</span>
									</Col>
									<Col span={24}>
										<label>目标识别像素中心位置Y：</label>
										<span className="value">{hongwai?.tar_Y}</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</div>
				<div className="mult-container-ouput">
					<div className="title-box">
						<div className="title">输出</div>
					</div>
					<Row gutter={[16, 0]}>
						<Col span={24} className="item-box">
							<div className="out-put-box">
								<Row gutter={[8, 8]}>
									<Col span={6}>
										<label>目标总个数：</label>
										<span className="value">{rhInfo?.length || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标编号：</label>
										<span className="value">{output?.tarNum || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标属性：</label>
										<span className="value">{output?.tarType || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标识别结果置信度：</label>
										<span className="value">{output?.tarConfi || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标尺寸长：</label>
										<span className="value">{output?.trackTarLen || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标尺寸宽：</label>
										<span className="value">{output?.trackTarWidth || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标纬度：</label>
										<span className="value">{output?.tarLong || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标维度：</label>
										<span className="value">{output?.tarLat || ''}</span>
									</Col>
									<Col span={6}>
										<label>识别目标俯仰视线角：</label>
										<span className="value">{output?.tarPitchAng || ''}</span>
									</Col>
									<Col span={6}>
										<label>识别目标航向视线角：</label>
										<span className="value">{output?.tarCourseAng || ''}</span>
									</Col>
									<Col span={6}>
										<label>目标重点部位类型：</label>
										<span className="value">{output?.tarKeyPartType || ''}</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</div>
			</>
		)
	}
	return (
		<>
			{(rhInfo?.length && (
				<div className="title-box">
					<div className="select-title">
						<Tabs
							onChange={(v: any) => setSelectActive(v)}
							activeKey={selectActive}
							type="card"
							size="small"
							items={renderTabs()}
						/>
					</div>
				</div>
			)) || (
				<div className="empty-box">
					<Empty />
				</div>
			)}
		</>
	)
}
