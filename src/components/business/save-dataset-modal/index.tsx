import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Select, Button, Space } from 'antd'
import PubSub from 'pubsub-js'
import { SAVE_DATA_SET_MODAL } from '@/const/constants'
import {
	createDataSet,
	dataSetDetailsMap,
	dataSetVersionUpdateApi,
	fileImportToDataSetApi,
	queryDataSetList
} from '@/api/modules/data-set'
import './index.less'
import { DATA_SET_FILE_TYPE_OPTIONS } from './const'
import { debounce, pickBy } from 'lodash'
import { transitionArrKey } from '@/utils/util'
import { getTagsDicts } from '@/api/modules/common'

const CONFIG_ACTIVE_ENUM = {
	SAVE: 'SAVE',
	CREATE: 'CREATE'
}

function SaveDataSetModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<any>(null)
	const [active, setActive] = useState(CONFIG_ACTIVE_ENUM.SAVE) // save create
	const [dataSets, setDataSets] = useState<any>([])
	const [dataSetVerions, setDataSetVerions] = useState<any>([])
	const [title, setTitle] = useState<any>('保存数据集')
	const [dataSetTypes, setDataSetTypes] = useState<any>([])
	const [dataSetTags, setDataSetTags] = useState<any>([])

	useEffect(() => {
		getDataSetTagsToState()
		getDataSetTypesToState()
		PubSub.subscribe(SAVE_DATA_SET_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(SAVE_DATA_SET_MODAL)
		}
	}, [])

	useEffect(() => {
		if (active === CONFIG_ACTIVE_ENUM.SAVE) {
			getDataSetsList()
		}
	}, [active])

	// 获取数据集列表
	const getDataSetsList = (name?: string, id?: string) => {
		queryDataSetList(
			pickBy(
				{
					page: 1,
					pageSize: 5000,
					name,
					id
				},
				value => value
			)
		).then((res: any) => {
			setDataSets(
				(res?.items || []).map((item: any) => {
					const { id, name } = item
					return {
						label: name,
						value: id
					}
				})
			)
			return res
		})
	}

	// 获取数据集版本列表
	const getDataSetVersions = (id: any) => {
		dataSetDetailsMap(id, {
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			setDataSetVerions(
				(res?.items || []).map((item: any) => {
					const { version, comment } = item
					return {
						label: `${version}-${comment}`,
						value: version
					}
				})
			)
		})
	}

	// 数据集类型
	const getDataSetTypesToState = async () => {
		const res: any = await getTagsDicts({
			type: 'dataset-type',
			page: 1,
			pageSize: 1000
		})
		setDataSetTypes(transitionArrKey(res?.items || []))
	}

	// 数据集标签
	const getDataSetTagsToState = async () => {
		const res: any = await getTagsDicts({
			type: 'dataset-tags',
			page: 1,
			pageSize: 1000
		})
		setDataSetTags(transitionArrKey(res?.items || []))
	}

	// 展示弹窗
	const showModal = (key: string, data: any) => {
		setActive(CONFIG_ACTIVE_ENUM.SAVE)
		if (!visible) {
			setVisible(true)
		}
		setRecord(data || null)
	}

	// 关闭弹窗
	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}

	const createDataSetClick = () => {
		form.resetFields()
		setActive(CONFIG_ACTIVE_ENUM.CREATE)
		setTitle('创建数据集')
	}

	// 提交
	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { fileIds, queryConditions } = record || {}
		setLoading(true)
		fileImportToDataSetApi({ ...values, fileIds, ...(queryConditions || {}) })
			.then(() => {
				message.success(`操作成功！`)
				hideModal()
				onOK && onOK()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	// 创建数据集一以及版本
	const createDatasetAndVersion = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { version, ...rest } = values
		const datasetId = await createDataSet({ ...rest })
		dataSetVersionUpdateApi({
			datasetId,
			directoryConfig: [
				{
					type: 'train',
					fileDirectory: 'dataset/train/',
					propertyDirectory: 'dataset/train/',
					annotationDirectory: 'dataset/train/'
				},
				{
					type: 'validation',
					fileDirectory: 'dataset/validation/',
					propertyDirectory: 'dataset/validation/',
					annotationDirectory: 'dataset/validation/'
				},
				{
					type: 'test',
					fileDirectory: 'dataset/test/',
					propertyDirectory: 'dataset/test/',
					annotationDirectory: 'dataset/test/'
				}
			],
			comment: version?.comment
		}).then(() => {
			message.success('创建成功')
			backSaveDataSet()
		})
	}

	const backSaveDataSet = () => {
		setTitle('保存数据集')
		form.resetFields()
		setActive(CONFIG_ACTIVE_ENUM.SAVE)
	}

	const renderContent = () => {
		if (active === CONFIG_ACTIVE_ENUM.SAVE) {
			return (
				<Form form={form} labelCol={{ span: 4 }} preserve={false}>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item name={'datasetId'} label={'选择数据集'} rules={[{ required: true, message: '请选择数据集' }]}>
								<Select
									onChange={(v: any) => {
										getDataSetVersions(v)
									}}
									options={dataSets}
									optionFilterProp="label"
									showSearch
									onSearch={debounce((v: any) => {
										getDataSetsList(v)
									}, 800)}
									filterOption={(input: any, option: any) => {
										const label = option?.label ?? ''
										return `${label}`.toLowerCase().includes(input.toLowerCase())
									}}
									placeholder="请选择数据集"
								></Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'version'} label={'选择版本'} rules={[{ required: true, message: '请选择版本' }]}>
								<Select placeholder={'请选择版本'} options={dataSetVerions}></Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'directoryType'} label={'目录划分'} rules={[{ required: true, message: '请选择目录划分' }]}>
								<Select placeholder={'请选择目录划分'} options={DATA_SET_FILE_TYPE_OPTIONS}></Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			)
		}
		if (active === CONFIG_ACTIVE_ENUM.CREATE) {
			return (
				<Form form={form} labelCol={{ span: 4 }} preserve={false}>
					<div className="title-box">
						<div className="title">基础信息</div>
					</div>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item name={'name'} label={'数据集名称'} rules={[{ required: true, message: '请输入数据集名称' }]}>
								<Input placeholder={'请输入数据集名称'} allowClear maxLength={50} showCount />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'type'} label={'数据集类型'} rules={[{ required: true, message: '请选择数据类型' }]}>
								<Select placeholder={'请选择数据类型'} options={dataSetTypes}></Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'tags'} label={'数据集标签'} rules={[{ required: true, message: '请选择标签类型' }]}>
								<Select placeholder={'请选择标签'} mode="multiple" options={dataSetTags}></Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'comment'} label={'数据集描述'} rules={[{ required: true, message: '请输入数据集描述' }]}>
								<Input.TextArea placeholder={'请输入数据集描述'} allowClear maxLength={256} showCount />
							</Form.Item>
						</Col>
					</Row>
					<div className="title-box">
						<div className="title">版本信息</div>
					</div>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item name={['version', 'comment']} label={'版本描述'} rules={[{ required: true, message: '请输入版本描述' }]}>
								<Input.TextArea placeholder={'请输入版本描述'} allowClear maxLength={256} showCount />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			)
		}
	}

	const renderFooter = () => {
		if (active === CONFIG_ACTIVE_ENUM.SAVE) {
			return (
				<div className="footer-box">
					<Button type="link" onClick={createDataSetClick}>
						创建数据集
					</Button>
					<Space>
						<Button onClick={hideModal}>取消</Button>
						<Button type="primary" onClick={submit}>
							保存
						</Button>
					</Space>
				</div>
			)
		}
		return (
			<>
				<Button onClick={backSaveDataSet}>返回</Button>
				<Button type="primary" onClick={createDatasetAndVersion}>
					创建
				</Button>
			</>
		)
	}

	return (
		<Modal
			width="600px"
			confirmLoading={loading}
			title={title}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			footer={renderFooter()}
			className="p-common-save-data-set-modal"
		>
			{renderContent()}
		</Modal>
	)
}

export default SaveDataSetModal
