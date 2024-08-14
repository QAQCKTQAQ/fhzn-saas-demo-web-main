// XT干扰
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getXTGRApi } from '@/api/modules/visual-data'
import { Col, Row } from 'antd'
import './index.less'
export default function XtgrView() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [XTGRInfo, setXTGRInfo] = useState<any>([])

	useEffect(() => {
		if (selectDdId && selectTime) {
			getXTGRInfo()
		}
	}, [selectDdId, selectTime])

	const getXTGRInfo = async () => {
		const data = await getXTGRApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setXTGRInfo(data)
	}

	return (
		<>
			<div className="mult-container-item">
				<div className="rzzc-box">
					<div className="title-box">
						<div className="title font-size-12">算法输入</div>
					</div>
					<div className="table">
						<div className="ld-code-box">
							<div className="td">
								<span className="gr">干扰机标识号</span>
								<span className="ld">雷达编号</span>
							</div>
							<div className="td">1</div>
							<div className="td">2</div>
							<div className="td">3</div>
							<div className="td">4</div>
							<div className="td">5</div>
							<div className="td">6</div>
							<div className="td">7</div>
							<div className="td">8</div>
						</div>
						<div className="gr-code-box">
							<div className="td-box">
								<div className="td">grj编号</div>
								<div className="td">1</div>
								<div className="td">2</div>
								<div className="td">3</div>
								<div className="td">4</div>
								<div className="td">5</div>
								<div className="td">6</div>
								<div className="td">7</div>
								<div className="td">8</div>
							</div>
							<div className="td-box">
								<div className="td">grj编号</div>
								<div className="td">1</div>
								<div className="td">2</div>
								<div className="td">3</div>
								<div className="td">4</div>
								<div className="td">5</div>
								<div className="td">6</div>
								<div className="td">7</div>
								<div className="td">8</div>
							</div>
							<div className="td-box">
								<div className="td">grj编号</div>
								<div className="td">1</div>
								<div className="td">2</div>
								<div className="td">3</div>
								<div className="td">4</div>
								<div className="td">5</div>
								<div className="td">6</div>
								<div className="td">7</div>
								<div className="td">8</div>
							</div>
						</div>
					</div>
					<Row gutter={[8, 8]}>
						<Col span={24} className="item-box">
							<div className="params-box">
								<Row gutter={[16, 16]}>
									<Col span={24}>
										<label>干扰机标识号：</label>
										<span className="value">{XTGRInfo?.ganraoji_shibie || '--'}</span>
									</Col>
									<Col span={24}>
										<label>干扰机搭载平台标识号：</label>
										<span className="value">{XTGRInfo?.ganrao_pingtai || '--'}</span>
									</Col>
									<Col span={24}>
										<label>分配干扰LD标识号：</label>
										<span className="value">{XTGRInfo?.fenpei_leida || '--'}</span>
									</Col>
									<Col span={24}>
										<label>干扰机干扰样式类型：</label>
										<span className="value">{XTGRInfo?.ganrao_yangshi || '--'}</span>
									</Col>
									<Col span={24}>
										<label>干扰同时波束数量：</label>
										<span className="value">{XTGRInfo?.ganrao_shuliang || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD探测距离衰减因子：</label>
										<span className="value">{XTGRInfo?.ldtance_yz || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD测距精度衰减因子：</label>
										<span className="value">{XTGRInfo?.ldceju_yz || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD测速精度衰减因子：</label>
										<span className="value">{XTGRInfo?.ldcesu_yz || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD测角精度衰减因子：</label>
										<span className="value">{XTGRInfo?.ldcejiao_yz || '--'}</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
