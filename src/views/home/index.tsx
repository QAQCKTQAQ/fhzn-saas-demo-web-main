import { Calendar, Col, Row, Space } from 'antd'
import './index.less'
import AgeRatioChart from './components/AgeRatioChart'
import HotPlateChart from './components/HotPlateChart'
import RealTimeAccessChart from './components/RealTimeAccessChart'
import AnnualUseChart from './components/AnnualUseChart'
import dataIcon from './assets/data-icon.svg'
import dataSetIcon from './assets/data-set-icon.svg'
import codeIcon from './assets/code-icon.svg'
import modelIcon from './assets/model-icon.svg'
import TestList from './components/test-list'
import ImageList from './components/image-list'
import ModelTestList from './components/model-test-list'
import ExpirList from './components/expir-list'
import moment from 'moment'
import { useState } from 'react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
const formatter = 'YYYY-MM-DD'

const Home = () => {
	const [dateValue, setDateValue] = useState(moment().format(formatter))

	// 渲染日历头部
	const renderCalendarHeader = ({ onChange }: any) => {
		return (
			<div className={'calendar-title'}>
				<div className={'calendar-title-left'}>
					<LeftCircleOutlined
						onClick={() => {
							const value = moment(dateValue).add(-1, 'year')
							setDateValue(value.format(formatter))
							onChange(value)
						}}
					/>
				</div>
				<div className={'calendar-title-center'}>{moment().format('YYYY 年 MM 月 DD 日')}</div>
				<div className={'calendar-title-right'}>
					<RightCircleOutlined
						onClick={() => {
							const value = moment(dateValue).add(1, 'M')
							setDateValue(value.format(formatter))
							onChange(value)
						}}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className="m-page-home">
			<Row gutter={[16, 16]}>
				<Col span={16}>
					<div className="calendar-data-box">
						<Calendar fullscreen={false} headerRender={renderCalendarHeader} />
						<div className="row-box">
							<div className="data-space-box col-box">
								<Space>
									<img src={dataIcon} width={24} />
									<label className="title">数据空间</label>
								</Space>
								<div className="type-data-box">
									<div>
										<div className="num">2</div>
										<label className="name">空间数量</label>
									</div>
									<div>
										<div className="num">20W</div>
										<label className="name">数据量</label>
									</div>
								</div>
							</div>
							<div className="data-set-box col-box">
								<Space>
									<img src={dataSetIcon} width={22} />
									<label className="title">数据集</label>
								</Space>
								<div className="type-data-box">
									<div>
										<div className="num">20</div>
										<label className="name">数量</label>
									</div>
									<div>
										<div className="num">2</div>
										<label className="name">已使用</label>
									</div>
								</div>
							</div>
							<div className="data-code-box col-box">
								<Space>
									<img src={codeIcon} width={20} />
									<label className="title">算法</label>
								</Space>
								<div className="type-data-box">
									<div>
										<div className="num">20</div>
										<label className="name">数量</label>
									</div>
									<div>
										<div className="num">2</div>
										<label className="name">已使用</label>
									</div>
								</div>
							</div>
							<div className="data-model-box col-box">
								<Space>
									<img src={modelIcon} width={20} />
									<label className="title">模型</label>
								</Space>
								<div className="type-data-box">
									<div>
										<div className="num">20</div>
										<label className="name">数量</label>
									</div>
									<div>
										<div className="num">2</div>
										<label className="name">训练中</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
				<Col span={8}>
					<div className="pie-echart-box">
						<div className="title-box">
							<div className="title">数据类型占比</div>
						</div>
						<AgeRatioChart />
					</div>
				</Col>
				<Col span={12}>
					<div className="hot-echart-box">
						<div className="title-box">
							<div className="title">数据来源</div>
						</div>
						<HotPlateChart />
					</div>
				</Col>
				<Col span={6}>
					<div className="water-echart-box">
						<div className="title-box">
							<div className="title">模型测试</div>
						</div>
						<RealTimeAccessChart />
					</div>
				</Col>
				<Col span={6}>
					<div className="water-echart-box">
						<div className="title-box">
							<div className="title">训练分布</div>
						</div>
						<AnnualUseChart />
					</div>
				</Col>
				<Col span={6}>
					<div className="button-box">
						<div className="title-box">
							<div className="title">训练任务</div>
						</div>
						<TestList />
					</div>
				</Col>
				<Col span={6}>
					<div className="button-box">
						<div className="title-box">
							<div className="title">镜像管理</div>
						</div>
						<ImageList />
					</div>
				</Col>
				<Col span={6}>
					<div className="button-box">
						<div className="title-box">
							<div className="title">模型测试</div>
						</div>
						<ModelTestList />
					</div>
				</Col>
				<Col span={6}>
					<div className="button-box">
						<div className="title-box">
							<div className="title">试验管理</div>
						</div>
						<ExpirList />
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Home
