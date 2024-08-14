/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 17:27:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-06 20:12:38
 */
import { Button, DatePicker, Form, Space, Cascader, InputNumber, Row, Col } from 'antd'
import './index.less'
import PubSub from 'pubsub-js'
import { getMultiDimensionalParams } from '@/api/modules/nultiple-manage'
import { useEffect, useState, useRef, useContext } from 'react'
import { getDataSpaceTreeRelation } from '@/api/modules/data-manage'
import { Context } from '../../store/reducerContent'
import MultipleLeftSearch from '../../../components/multiple-left-search'
import SaveDataSetModal from '@/components/business/save-dataset-modal'

import { SAVE_DATA_SET_MODAL } from '@/const/constants'
import { ASYNC_SUBSCRIBE_SAVE_DATA_SET, ASYNC_SUBSCRIBE_BOX_DATA } from '../../const'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
const { SHOW_CHILD } = Cascader

const { RangePicker } = DatePicker
export default function MultipleSearchForm() {
	const [formBase] = Form.useForm()
	const [formGeo] = Form.useForm()
	const [treeData, setTreeData] = useState<any>([])
	const [basicFieldsData, setBasicFieldsData] = useState<any>([])
	const [otherFieldsData, setOtherFieldsData] = useState<any>([])
	const [gzLeafResult, setGzLeafResult] = useState<any>([])

	const initRef: any = useRef({})
	const basicInfoRef: any = useRef({})
	const otherInfoRef: any = useRef({})

	const {
		queryList,
		state: {
			list: { dataSource }
		}
	} = useContext(Context)

	useEffect(() => {
		getMultiDimensionalParamsData()
		getDataSpaceTreeRelationData()
		PubSub.subscribe(ASYNC_SUBSCRIBE_SAVE_DATA_SET, saveDataSet)
		PubSub.subscribe(ASYNC_SUBSCRIBE_BOX_DATA, geoBox)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_SAVE_DATA_SET)
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_BOX_DATA)
		}
	}, [])
	// 保存数据集
	const saveDataSet = () => {
		queryListData({ type: 'save' })
	}
	// 获取框选的经纬度
	const geoBox = (key: string, data: any) => {
		const { box = {} } = data
		queryListData({ type: 'box', box: box })
	}
	// 获取层级信息
	const getDataSpaceTreeRelationData = () => {
		getDataSpaceTreeRelation().then((res: any) => {
			const data = res || {}
			let arr: any = filterArray(data, '')
			arr.map((item: any) => {
				if (item.label === '感知空间') {
					let arrData: any = []
					arrData.push(item)
					setTreeData(arrData)
					ganZhiLeafMap(arrData)
				}
			})
			treeData
			console.log(arr, 'arr===')
		})
	}
	// 收集感知的所有叶子节点
	const ganZhiLeafMap = (data: any) => {
		let result: any = parseTreeJson(data)
		setGzLeafResult(result)
		queryList({ queryBody: [{ field: 'spaceId', values: result }], page: 1 })
	}
	let nodes: any = []
	const parseTreeJson = (array: any) => {
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			// 判断element.children是对象
			if (element.children && typeof element.children == 'object') {
				parseTreeJson(element.children)
			} else {
				// 判断是否为子节点
				if (!element.children && element.spaceId) {
					// 获得符合的 node
					nodes.push(element.spaceId)
				}
			}
		}
		return nodes
	}

	// 按照菜单层级进行数据解析
	const filterArray = (data: any, parentId: any) => {
		let tree: any = []
		let temp
		for (let i = 0; i < data.length; i++) {
			if (data[i].parentId == parentId) {
				let obj: any = {
					key: data[i].id,
					children: [],
					label: data[i].name,
					isLeaf: false,
					spaceId: data[i].spaceId,
					value: data[i].spaceId ? data[i].spaceId : data[i].id
				}
				temp = filterArray(data, data[i].id)
				if (temp.length > 0) {
					obj.children = temp
				} else {
					if (obj.parentId === 0) {
						obj.isLeaf = false
					} else if (obj.spaceId) {
						obj.isLeaf = true
					}
					delete obj.children
				}
				tree.push(obj)
			}
		}
		return tree
	}
	// 获取多维度检索字段信息
	const getMultiDimensionalParamsData = async () => {
		const res: any = await getMultiDimensionalParams({})
		const { basicFields = [], otherFields = [] } = res
		setBasicFieldsData(basicFields)
		setOtherFieldsData(otherFields)
	}
	// 查询接口
	const queryListData = async (data: any) => {
		const { type } = data
		const { box = {} } = data
		const paramsArr: any = []
		// 基础信息
		const values = await formBase.validateFields().then(values => {
			return values
		})
		// 经纬度半径
		const valuesGeo = await formGeo.validateFields().then(values => {
			return values
		})
		let date: any = values['createDate']
			? [values['createDate'][0].format('YYYY-MM-DD'), values['createDate'][1].format('YYYY-MM-DD')]
			: []
		let createDate = {
			field: 'createDate',
			values: date || []
		}

		let spaceIdForm = values['spaceId']
		// 定义变量
		let spaceId: any = {}
		let dataSpaceMap: any = []
		// 是否为初始化值
		if (spaceIdForm[0].length === 4) {
			spaceIdForm.map((item: any) => {
				dataSpaceMap.push(item[item.length - 1])
			})
			spaceId = {
				field: 'spaceId',
				values: dataSpaceMap
			}
		} else {
			// 为初始化值
			spaceId = {
				field: 'spaceId',
				values: gzLeafResult
			}
		}
		// 属性信息
		const baseInfo: any = await basicInfoRef.current.getFormData()
		// 高级信息
		const otherInfo: any = await otherInfoRef.current.getFormData()
		let paramsData: any = {
			...baseInfo,
			...otherInfo
		}

		for (const key in paramsData) {
			paramsArr.push({
				field: key,
				values: paramsData[key] && paramsData[key] != 'undefined' && paramsData[key] != '' ? paramsData[key].values : []
			})
		}
		paramsArr.push(spaceId)
		paramsArr.push(createDate)
		if (type === 'api') {
			queryList({ queryBody: paramsArr, geoBody: valuesGeo || {}, page: 1 })
			LogReport(OPERATION_ENUM?.COMMON?.QUERY, `数据查询-数字地球-查询`)
		} else if (type === 'save') {
			// 保存数据集
			PubSub.publish(SAVE_DATA_SET_MODAL, { queryConditions: { queryConditions: { queryBody: paramsArr, geoBody: valuesGeo } } })
		} else {
			queryList({ queryBody: paramsArr, geoBody: { ...valuesGeo, box } || {}, page: 1 })
		}
	}
	// 重置
	const reSetForm = () => {
		// 基础查询
		formBase.resetFields()
		// 属性信息
		basicInfoRef.current.resetForm()
		// 高级信息
		otherInfoRef.current.resetForm()
		// 经纬度
		formGeo.resetFields()
	}
	// 保存数据集回调
	const onDataSetOk = () => {
		LogReport(OPERATION_ENUM?.DATA_SET?.SAVE_DATA_SET, `数据查询-数字地球-保存数据集`)
	}
	// 保存数据集
	const saveDataSaet = () => {
		saveDataSet()
	}
	return (
		<div className="search-box">
			{
				<div className="search-form-box">
					<div className="base-info">
						<div className="title-box">
							<div className="title">基础查询</div>
						</div>
						{(treeData && treeData?.length && (
							<Form
								initialValues={{ spaceId: [treeData[0]?.key] }}
								ref={initRef}
								labelCol={{ xs: { span: 24 }, sm: { span: 9 } }}
								form={formBase}
							>
								<Form.Item name={'spaceId'} label="数据空间" rules={[{ required: true, message: '请选择数据空间' }]}>
									<Cascader
										options={treeData}
										multiple
										maxTagCount="responsive"
										showCheckedStrategy={SHOW_CHILD}
										placeholder="请选择"
										showArrow={true}
									/>
								</Form.Item>
								<Form.Item name={'createDate'} label="创建时间">
									<RangePicker style={{ width: '100%' }} />
								</Form.Item>
							</Form>
						)) ||
							null}
					</div>
					<div className="property-info">
						<div className="title-box">
							<div className="title">属性查询</div>
						</div>
						{basicFieldsData && <MultipleLeftSearch ref={basicInfoRef} formData={basicFieldsData} />}
					</div>
					<div className="property-info">
						<div className="title-box">
							<div className="title">高级查询</div>
						</div>
						<Form form={formGeo} labelCol={{ xs: { span: 24 }, sm: { span: 9 } }}>
							<Form.Item label={'范围'} className="resource-congfig-box">
								<Row gutter={4}>
									<Col span={8}>
										<Form.Item name={['distance', 'lon']} rules={[{ required: true, message: '请输入经度' }]}>
											<InputNumber type="number" min={1} placeholder="经度" />
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item name={['distance', 'lat']} rules={[{ required: true, message: '请输入维度' }]}>
											<InputNumber type="number" placeholder="纬度" />
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item name={['distance', 'distance']} rules={[{ required: true, message: '请输入半径' }]}>
											<InputNumber type="number" placeholder="半径" />
										</Form.Item>
									</Col>
								</Row>
							</Form.Item>
						</Form>
						{otherFieldsData && <MultipleLeftSearch ref={otherInfoRef} formData={otherFieldsData} />}
					</div>
				</div>
			}
			<div className="search-btn">
				<Space>
					<Button
						onClick={() => {
							reSetForm()
						}}
					>
						重置
					</Button>
					<Button
						type="primary"
						onClick={() => {
							queryListData({ page: 1, type: 'api' })
						}}
					>
						搜索
					</Button>
					<Button
						type="primary"
						disabled={!dataSource?.length}
						onClick={() => {
							saveDataSaet()
						}}
					>
						保存数据集
					</Button>
				</Space>
			</div>
			<SaveDataSetModal
				onOK={() => {
					onDataSetOk()
				}}
			/>
		</div>
	)
}
