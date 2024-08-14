// 波形捷变算法
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getBXJBInfoApi } from '@/api/modules/visual-data'
import { Col, Row, Image, Empty, Table } from 'antd'
import BXJBChart from './bxjb-chart'
import './index.less'

export default function BxjbCode() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [bxjbInfo, setBxjbInfo] = useState<any>([])

	useEffect(() => {
		if (selectDdId && selectTime) {
			getBXJBInfo()
		}
	}, [selectDdId, selectTime])

	const getBXJBInfo = async () => {
		const data = await getBXJBInfoApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		setBxjbInfo(data)
	}

	const columns: any = [
		{
			title: '干扰类型',
			dataIndex: 'ganrao_leixing'
		},
		{
			title: '干扰功率',
			dataIndex: 'gao_gonglv'
		},
		{
			title: '干扰带宽',
			dataIndex: 'ganraokuandai'
		},
		{
			title: '干扰频率',
			dataIndex: 'gamraopinlv'
		},
		{
			title: '信噪比',
			dataIndex: 'gaozaobi'
		},
		{
			title: '切片宽度',
			dataIndex: 'qiepiankuandu'
		},
		{
			title: '转发次数',
			dataIndex: 'zhuanfacishu'
		},
		{
			title: '转发间隔',
			dataIndex: 'zhuanfajiange'
		},
		{
			title: '入射角度',
			dataIndex: '入射角度'
		}
	]

	return (
		<>
			<div className="mult-container-item">
				<div className="bykgr-box">
					<div className="title-box">
						<div className="title font-size-12">算法输入</div>
					</div>
					<div className="params-box">
						<Table columns={columns} dataSource={bxjbInfo?.input || []} />
						{/* <Row gutter={[8, 8]}>
							<Col span={24}>
								<label>prtCount：</label>
								<span className="value">{bxjbInfo?.input?.prtCount || '--'}</span>
							</Col>
							<Col span={24}>
								<label>algID：</label>
								<span className="value">{bxjbInfo?.input?.algID || '--'}</span>
							</Col>
							<Col span={24}>
								<label>danID：</label>
								<span className="value">{bxjbInfo?.input?.danID || '--'}</span>
							</Col>
							<Col span={24}>
								<label>leidacanshu_zhiling：</label>
								<span className="value">{bxjbInfo?.input?.leidacanshu_zhiling || '--'}</span>
							</Col>
							<Col span={24}>
								<label>huibo_canshu：</label>
								<span className="value">{bxjbInfo?.input?.huibo_canshu || '--'}</span>
							</Col>
							<Col span={24}>
								<label>huibo_shuju：</label>
								<span className="value">{bxjbInfo?.input?.huibo_shuju || '--'}</span>
							</Col>
							<Col span={24}>
								<label>fusheyuan：</label>
								<span className="value">{bxjbInfo?.input?.fusheyuan || '--'}</span>
							</Col>
						</Row> */}
					</div>
				</div>
			</div>
			<div className="mult-container-item">
				<div className="bykgr-box">
					<div className="title-box">
						<div className="title font-size-12">算法输出</div>
					</div>
					<Row gutter={[8, 8]}>
						<Col span={8} className="item-box">
							<div className="img-box">
								<div className="title-box">
									<div className="title font-size-12">时频图</div>
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
									<div className="title font-size-12">剔除前后一维距离像</div>
								</div>
								{(bxjbInfo?.oneDimensionRangeProfile?.length && (
									<BXJBChart xname="采样点" yname="幅度DB" data={bxjbInfo?.oneDimensionRangeProfile || []} />
								)) || (
									<div className="empty-box">
										<Empty />
									</div>
								)}
							</div>
						</Col>
						<Col span={8} className="item-box">
							<div className="img-box">
								<div className="title-box">
									<div className="title font-size-12">多处理域得分</div>
								</div>
								{(bxjbInfo?.radarAgile_score?.length && (
									<BXJBChart xname="算法调用次数" yname="得分" data={bxjbInfo?.radarAgile_score || []} />
								)) || (
									<div className="empty-box">
										<Empty />
									</div>
								)}
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
										<label>LD载频：</label>
										<span className="value">{bxjbInfo?.leidazaipin || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD宽带：</label>
										<span className="value">{bxjbInfo?.leida_kuandai || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD脉宽：</label>
										<span className="value">{bxjbInfo?.leida_maichong || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD脉冲重复时间：</label>
										<span className="value">{bxjbInfo?.leida_chongfushijian || '--'}</span>
									</Col>
									<Col span={24}>
										<label>LD信号发射幅度：</label>
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
			</div>
		</>
	)
}
