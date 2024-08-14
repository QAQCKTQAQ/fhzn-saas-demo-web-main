/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-09-12 10:17:43
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-12 16:03:07
 */
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getDMXHSCApi } from '@/api/modules/visual-data'
import { Col, Empty, Row } from 'antd'
import './index.less'
import Scatter from './scatter'

export default function DMxhscView() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [dmxhscInfo, setDmxhscInfo] = useState<any>({})
	useEffect(() => {
		if (selectDdId && selectTime) {
			getDMXHSCData()
		}
	}, [selectDdId, selectTime])

	const getDMXHSCData = async () => {
		const data: any = await getDMXHSCApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setDmxhscInfo(data || {})
	}

	return (
		<>
			<div className="mult-container-item">
				<div className="dmxhsc-view-box">
					<div className="title-box">
						<div className="title font-size-12">算法输入</div>
					</div>
					{(dmxhscInfo?.xinzaobiList?.length && (
						<Row gutter={[16, 16]}>
							{(dmxhscInfo?.xinzaobiList || []).map((item: any, index: any) => {
								return (
									<Col span={24} className="item-box" key={index}>
										<Scatter xyData={item} />
									</Col>
								)
							})}
						</Row>
					)) || (
						<div className="empty-box">
							<Empty />
						</div>
					)}
				</div>
			</div>
			<div className="mult-container-item">
				<div className="dmxhsc-view-box">
					<div className="title-box">
						<div className="title font-size-12">算法输出</div>
					</div>
					<Row gutter={[16, 16]}>
						<Col span={24} className="item-box">
							<div className="empty-box">
								<Empty />
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
