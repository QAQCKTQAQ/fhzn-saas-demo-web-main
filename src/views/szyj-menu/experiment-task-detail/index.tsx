/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 17:05:58
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-08 16:08:16
 */
import './index.less'
import { ReducerContent } from './store/reducerContent'
import { Tabs, Row, Space, Button, Col } from 'antd'
import { Link } from 'react-router-dom'
import BaseInfo from './components/base-info'
import PreviewInfo from './components/preview-info'
import ScenarioInfo from './components/scenario-info'
import DrillingInfo from './components/drilling-info'
import ExperimentInfo from './components/experiment-info'
import { useSearchParams } from 'react-router-dom'
import LogInfo from './components/log-info'
import blue from '@/assets/images/blue.png'
import green from '@/assets/images/green.png'
import gray from '@/assets/images/gray.png'

const ExperimentTaskDetail = () => {
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const status: any = search.get('state')
	// status映射
	const statusMap: any = {
		0: '未开始',
		1: '进行中',
		2: '已结束'
	}
	const tabItems = [
		{
			label: '基础信息',
			key: '1',
			children: <BaseInfo />
		},
		{
			label: '预案信息',
			key: '2',
			children: <PreviewInfo />
		},
		{
			label: '想定信息',
			key: '3',
			children: <ScenarioInfo />
		},
		{
			label: '编演信息',
			key: '4',
			children: <DrillingInfo />
		},
		{
			label: '试验数据',
			key: '5',
			children: <ExperimentInfo />
		},
		{
			label: '日志',
			key: '6',
			children: <LogInfo />
		}
	]

	return (
		<ReducerContent>
			<div className="content-box m-page-experiment-task-detail">
				<Row>
					<Col span={24}>
						<Tabs
							defaultActiveKey="1"
							type="card"
							items={tabItems}
							tabBarExtraContent={
								<Space style={{ paddingRight: '16px' }}>
									<Link
										style={{ display: status === '1' || status === '2' ? 'none' : '' }}
										to={`/test/experiment-task-init?id=2`}
									>
										<Button type="primary" size="small">
											初始化
										</Button>
									</Link>
									<Link
										style={{ display: status === '0' || status === '2' ? 'none' : '' }}
										to={`/szyj-menu/visual-data?id=${id}`}
										target="_blank"
									>
										<Button type="primary" size="small">
											可视化
										</Button>
									</Link>
									<Row style={{ marginLeft: '16px' }}>
										<img className="cirle" src={status == 1 ? blue : status == 2 ? green : gray} />
										<div className="status">{statusMap[status]}</div>
									</Row>
								</Space>
							}
						/>
					</Col>
				</Row>
			</div>
		</ReducerContent>
	)
}

export default ExperimentTaskDetail
