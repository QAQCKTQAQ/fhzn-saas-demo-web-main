import { Col, Empty, Row } from 'antd'
import './index.less'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/reducerContent'
import { getCodeDataInfoApi } from '@/api/modules/visual-data'
import { treeData, CHAIN_MAP, TOPOLOGY_DRAWER_KEY } from './const'
import ParamItem from './components/param-item'
import TopologyDrawer from './components/topology-drawer'
import PubSub from 'pubsub-js'

export default function CodeDataContainer() {
	const { state, testId } = useContext(Context)
	// dd id
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	// 时间片
	const selectTime = state?.changeSelectTime || ''
	// 链路全部数据
	const [codeDataInfo, setCodeDataInfo] = useState([])
	// 选中左侧链路
	const [selectActive, setSelectActive] = useState('')
	// 设置左侧链路展示
	const [treeList, setTreeList] = useState<any>([])
	// 选中左侧链路，之后对应指令/参数数据
	const [orderParamList, setOrderParamList] = useState<any>([])
	const [topologyDrawerVisible, setTopologyDrawerVisible] = useState(false)

	// 订阅拓扑图线
	useEffect(() => {
		PubSub.subscribe(TOPOLOGY_DRAWER_KEY, (key: string, v: any) => {
			setTopologyDrawerVisible(true)
			setSelectActive(v)
		})
		return () => {
			PubSub.unsubscribe(TOPOLOGY_DRAWER_KEY)
		}
	}, [])

	useEffect(() => {
		if (selectDdId && selectTime) {
			setSelectActive('')
			getCodeDataInfo({ timeSlice: selectTime })
		}
	}, [selectDdId, selectTime])

	const getCodeDataInfo = async (params: any) => {
		const res = await getCodeDataInfoApi({ id: testId, instanceGroupId: selectDdId, timeSlice: selectTime, ...(params || {}) })
		const data: any = res || []
		setCodeDataInfo(data)
		handleTreeListByInfo(data)
	}

	// 设置当前活动选项 获取数据
	useEffect(() => {
		setOrderParamList([])
		if (selectActive) {
			const selectData = codeDataInfo.filter((code: any) => {
				const command = code?.command || ''
				return selectActive.split('-').indexOf(`${command}`) !== -1
			})
			const orderParams = handleOrderParamList(selectData)
			setOrderParamList(orderParams)
		}
	}, [selectActive])

	// 选中当前链路输出 headers和 body数据处理
	const handleOrderParamList = (selectData: any) => {
		return (selectData || []).map((select: any) => {
			const { headers, body, command } = select || {}
			const listData = []
			if (headers) {
				Object.entries(headers || {}).map((item: any) => {
					const [hKey, hValue] = item || []
					if (hKey !== '_type') {
						if (hValue && Object.prototype.toString.call(hValue) === '[object Object]') {
							listData.push({
								name: hValue._name || '',
								value: hValue,
								key: hKey,
								body: body[hKey]
							})
						} else {
							listData.push({
								name: hValue,
								value: body[hKey],
								key: hKey
							})
						}
					}
				})
			}
			// headers 为空时，直接展示body json字符串
			else if (body) {
				try {
					listData.push({ name: '响应体', value: JSON.stringify(body || {}) })
				} catch (e: any) {
					/* empty */
				}
			}
			return {
				listData,
				title: CHAIN_MAP[command] || `未知链路-${command}-数据`
			}
		})
	}

	// 根据链路信息获取左侧
	const handleTreeListByInfo = (codeData: any) => {
		const treeList: any = []
		;(codeData || []).map((code: any) => {
			const { command } = code
			const tree = treeData.find((tree: any) => {
				const key = (tree?.key || '').split('-')
				return key.indexOf(`${command}`) !== -1
			})
			// 过滤treeList 重复key的数据
			if (!treeList.find((item: any) => item.key === tree?.key)) {
				treeList.push(tree ? tree : { key: `${command}`, label: `未知链路-${command}` })
			}
		})
		setTreeList(treeList)
		// 设置当前第一为活动并联动右侧数据
		setSelectActive(treeList[0]?.key)
	}

	// 渲染指令参数容器
	const renderOrderParams = () => {
		return orderParamList.map((orderParam: any, index: any) => {
			const { title, listData } = orderParam || {}
			return (
				<Col span={24} key={index}>
					<div className="order-box">
						<div className="title-box">
							<div className="title">{title}</div>
						</div>
						<div className="data-params-box">
							<ParamItem key={index} params={listData} />
						</div>
					</div>
				</Col>
			)
		})
	}

	const renderTree = () => {
		if (treeList && treeList?.length) {
			return (
				<ul>
					{treeList.map((item: any) => {
						return (
							<li
								key={item.key}
								className={item.key === selectActive ? 'active' : ''}
								onClick={() => setSelectActive(item.key)}
								title={item.label}
							>
								{item.label}
							</li>
						)
					})}
				</ul>
			)
		}
		return (
			<div className="empty-box">
				<Empty />
			</div>
		)
	}

	const renderByViewMode = () => {
		return (
			<div className="code-data-box">
				<div className="tree-box">{renderTree()}</div>
				<div className="data-box">
					{(orderParamList && orderParamList.length && <Row gutter={[8, 8]}>{renderOrderParams()}</Row>) || (
						<div className="empty-box">
							<Empty />
						</div>
					)}
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="code-data-container">
				{renderByViewMode()}
				<TopologyDrawer visible={topologyDrawerVisible} hideModal={() => setTopologyDrawerVisible(false)}>
					{(orderParamList && orderParamList.length && <Row gutter={[8, 8]}>{renderOrderParams()}</Row>) || (
						<div className="empty-box">
							<Empty />
						</div>
					)}
				</TopologyDrawer>
			</div>
		</>
	)
}
