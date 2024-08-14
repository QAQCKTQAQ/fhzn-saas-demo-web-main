import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getXTRZApi } from '@/api/modules/visual-data'
import { Col, Row, Table } from 'antd'
import './index.less'
import { MAI_JIAN_PV_TYPE_MAP, CHONG_PIN_TYPE_MAP, MAI_KUAN_TYPE_MAP, CHART_TYPE_ENUM } from './const'
import Scatter from './scatter'
import JwScatter from './jw-scatter'

export default function RzzcView() {
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [inputData, setInputData] = useState<any>({})
	const [outputList, setOutputList] = useState<any>([])
	const [lats, setLats] = useState<any>([])
	const [longs, setLongs] = useState<any>([])

	useEffect(() => {
		if (selectDdId && selectTime) {
			getHwsbData()
		}
	}, [selectDdId, selectTime])

	const getHwsbData = async () => {
		const data: any = await getXTRZApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
		const { xtrZinput = {}, xtrZoutput = [], lats = [], longs = [] } = data || {}
		setOutputList(xtrZoutput)
		setInputData(xtrZinput)
		setLats(lats)
		setLongs(longs)
	}

	const columns = [
		{
			dataIndex: 'ld_bianhao',
			title: 'LD批号'
		},
		{
			dataIndex: 'ld_long',
			title: '经度',
			render: (text: any) => {
				return (text && `${text}°`) || ''
			}
		},
		{
			dataIndex: 'ld_lat',
			title: '纬度',
			render: (text: any) => {
				return (text && `${text}°`) || ''
			}
		},
		{
			dataIndex: 'ld_hight',
			title: '高度',
			render: (text: any) => {
				return (text && `${text}m`) || ''
			}
		},
		{
			dataIndex: 'shijian_leixing',
			title: '脉间频率类型',
			render: (text: any) => {
				return (text && MAI_JIAN_PV_TYPE_MAP[text]) || ''
			}
		},
		{
			dataIndex: 'pinlv_shuliang',
			title: '频率值数量'
		},
		{
			dataIndex: 'pinlv',
			title: '频率值1～10',
			render: (text: any) => {
				return (text && `${text}MHz`) || ''
			}
		},
		{
			dataIndex: 'pinlv_zuidazhi',
			title: '频率最大值',
			render: (text: any) => {
				return (text && `${text}MHz`) || ''
			}
		},
		{
			dataIndex: 'pinlv_zuixiaozhi',
			title: '频率最小值',
			render: (text: any) => {
				return (text && `${text}MHz`) || ''
			}
		},
		{
			dataIndex: 'zp_leixing',
			title: '重频类型',
			render: (text: any) => {
				return (text && CHONG_PIN_TYPE_MAP[text]) || ''
			}
		},
		{
			dataIndex: 'zp_shuliang',
			title: '重频值数量'
		},
		{
			dataIndex: 'zpshuliang',
			title: '重频值1～10',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'zp_zuida',
			title: '重频最大值',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'zp_zuixiao',
			title: '重频最小值',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'maikuan_leixing',
			title: '脉宽类型',
			render: (text: any) => {
				return (text && MAI_KUAN_TYPE_MAP[text]) || ''
			}
		},
		{
			dataIndex: 'maikuan_shuliang',
			title: '脉宽值数量'
		},
		{
			dataIndex: 'maikuan',
			title: '脉宽值1～10',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'maikuan_big',
			title: '脉宽最大值',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'maikuan_small',
			title: '脉宽最小值',
			render: (text: any) => {
				return (text && `${text}us`) || ''
			}
		},
		{
			dataIndex: 'fudu',
			title: '幅度平均值',
			render: (text: any) => {
				return (text && `${text}W`) || ''
			}
		}
	]

	return (
		<>
			<div className="mult-container-item">
				<div className="rzzc-box">
					<div className="title-box">
						<div className="title font-size-12">算法输入</div>
					</div>
					<Row gutter={[16, 16]}>
						<Col span={8} className="item-box">
							<Scatter type={CHART_TYPE_ENUM.gz_pl} inputData={inputData} />
							{/* <div className="empty-box">
								<Empty />
							</div> */}
						</Col>
						<Col span={8} className="item-box">
							<Scatter type={CHART_TYPE_ENUM.fu_du} inputData={inputData} />
							{/* <div className="empty-box">
								<Empty />
							</div> */}
						</Col>
						<Col span={8} className="item-box">
							<Scatter type={CHART_TYPE_ENUM.mc_kd} inputData={inputData} />
							{/* <div className="empty-box">
								<Empty />
							</div> */}
						</Col>
					</Row>
				</div>
			</div>
			<div className="mult-container-item">
				<div className="rzzc-box">
					<div className="title-box">
						<div className="title font-size-12">算法输出</div>
					</div>
					<Row gutter={[16, 16]}>
						<Col span={8}>
							<JwScatter type={CHART_TYPE_ENUM.jd_wd} lats={lats} longs={longs} />
						</Col>
						<Col span={16} className="item-box">
							<Table columns={columns} dataSource={outputList} pagination={false} scroll={{ x: 'max-content' }} />
							{/* <div className="empty-box">
								<Empty />
							</div> */}
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
