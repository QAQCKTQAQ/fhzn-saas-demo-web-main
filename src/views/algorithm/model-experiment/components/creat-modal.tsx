import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Select, Tooltip } from 'antd'
import { algorithmUpdate, createTaskApi } from '@/api/modules/algorithm'
import PubSub from 'pubsub-js'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ASYNC_SUBSCRIBE_CRAET_MODAL } from '../const'
import { imagesListQery } from '@/api/modules/images-mange'
import { algorithmListQery, algorithmHistoryListQery } from '@/api/modules/algorithm-manage'
import { queryDataSetList, dataSetDetailsMap } from '@/api/modules/data-set'
import { modelsListQery } from '@/api/modules/models-mange'
import { modelsHistoryListQery } from '@/api/modules/models-mange'
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

function CreatModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<any>()
	const [imageOptions, setImageOptions] = useState([])
	const [codeOptions, setCodeOptions] = useState([])
	const [codeVOptions, setCodeVOptions] = useState([])
	const [dataSetOptions, setDataSetOptions] = useState([])
	const [dataSetVOptions, setDataSetVOptions] = useState([])
	const [modelOptions, setModelOptions] = useState([])
	const [modelVOptions, setModelVOptions] = useState([])

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CRAET_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CRAET_MODAL)
		}
	}, [])

	// 展开蒙层
	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}
	// 初始化数据
	const initialValues = (initialValues: any) => {
		if (initialValues) {
			const { algorithm, dataset, model } = initialValues
			const algorithmId = algorithm?.id || ''
			const trainId = dataset?.id || ''
			algorithmId && codeChangeToV(algorithmId)
			trainId && dataSetChangeToV(trainId)
			model?.id && modelChangeToV(model?.id)
			return form.setFieldsValue({
				...(initialValues || {})
			})
		}
	}
	useEffect(() => {
		getImageOptions()
		getCodeOptions()
		getDataSetOptions()
		getModelsListQery()
	}, [])
	// 关闭蒙层
	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}
	// 获取镜像列表选项 默认查询1000条， TODO
	const getImageOptions = () => {
		imagesListQery({ pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setImageOptions(
				(items || []).map((item: any) => {
					const { id, name } = item
					return { value: id, label: name }
				})
			)
		})
	}
	// 获取算法列表默认查询1000条， TODO
	const getCodeOptions = () => {
		algorithmListQery({ pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setCodeOptions(
				(items || []).map((item: any) => {
					const { id, name } = item
					return { value: id, label: name }
				})
			)
		})
	}
	// 根据选择算法联动 版本
	const codeChangeToV = (value: any) => {
		setCodeVOptions([])
		value && getCodeVOptions(value)
	}
	// 获取算法版本列表默认(查询1000条， TODO
	const getCodeVOptions = (value: any) => {
		algorithmHistoryListQery(value, { pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setCodeVOptions(
				(items || []).map((item: any) => {
					const { version } = item
					return { value: version, label: version }
				})
			)
		})
	}
	// 获取数据集下拉(查询1000条， TODO）
	const getDataSetOptions = () => {
		queryDataSetList({ pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setDataSetOptions(
				(items || []).map((item: any) => {
					const { id, name } = item
					return { value: id, label: name }
				})
			)
		})
	}
	// 根据选择数据集联动 版本
	const dataSetChangeToV = (value: any) => {
		setDataSetVOptions([])
		value && getDataSetVOptions(value)
	}
	// 获取数据集版本列表默认(查询1000条， TODO
	const getDataSetVOptions = (value: any) => {
		dataSetDetailsMap(value, { pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setDataSetVOptions(
				(items || []).map((item: any) => {
					const { version } = item
					return { value: version, label: version }
				})
			)
		})
	}
	// 获取模型下拉(查询1000条， TODO）
	const getModelsListQery = () => {
		modelsListQery({ page: 1, pageSize: 1000 }).then((res: any) => {
			const { items = [] } = res
			setModelOptions(
				(items || []).map((item: any) => {
					const { id, name } = item
					return {
						value: id,
						label: name
					}
				})
			)
		})
	}
	// 根据选择模型联动 版本
	const modelChangeToV = (value: any) => {
		setModelVOptions([])
		value && getModelVOptions(value)
	}
	// 获取模型版本列表默认(查询1000条， TODO
	const getModelVOptions = (value: any) => {
		modelsHistoryListQery({ modelId: value, pageSize: 1000, page: 1 }).then((res: any) => {
			const { items = [] } = res || {}
			setModelVOptions(
				(items || []).map((item: any) => {
					const { version } = item
					return { value: version, label: version }
				})
			)
		})
	}

	const renderTips = () => {
		return (
			<>
				<Tooltip
					title={
						<div>
							<p>根目录：/workspace/</p>
							<p>代码目录：/workspace/</p>
							<p>模型输入目录：/workspace/model/</p>
							<p>输出目录：/workspace/outputs/</p>
						</div>
					}
					overlayClassName="m-page-training-task-tooltip"
				>
					<QuestionCircleOutlined style={{ color: '#ffc53d', marginRight: '4px' }} />
				</Tooltip>
				{renderRedLabel('训练数据集')}
			</>
		)
	}

	const renderRedLabel = (name: any) => {
		return <label className="red-label-subfix">{name}</label>
	}

	const handleLogReportData: any = (name: string) => {
		const operation = record ? OPERATION_ENUM.COMMON.EDIT : OPERATION_ENUM.COMMON.ADD
		const content = record ? `${name} - 测试任务编辑成功` : `${name} - 测试任务创建成功`
		LogReport(operation, content)
	}

	// 提交数据
	const submit = async () => {
		const { id } = record || {}
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		const func = id ? algorithmUpdate : createTaskApi
		func({ ...values, id, type: 2 })
			.then(() => {
				hideModal()
				message.success('操作成功！')
				onOK && onOK()
				handleLogReportData(values?.name)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return (
		<Modal
			width="600px"
			confirmLoading={loading}
			title={record ? '编辑测试' : '创建测试'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 5 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'测试名称'} rules={[{ required: true, message: '请输入测试名称' }]}>
							<Input placeholder={'请输入测试名称'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'envImageId'} label={'选择镜像'} rules={[{ required: true, message: '请选择镜像' }]}>
							<Select options={imageOptions} placeholder="请选择镜像" disabled={!!record}></Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={renderTips()} rules={[{ required: true, message: ' ' }]} style={{ marginBottom: 0 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item name={['dataset', 'id']} label={''} rules={[{ required: true, message: '请选择训练数据集' }]}>
										<Select
											placeholder={'请选择数据集'}
											allowClear
											options={dataSetOptions}
											onChange={dataSetChangeToV}
											disabled={!!record}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name={['dataset', 'version']} label={''} rules={[{ required: true, message: '请选择数据集版本' }]}>
										<Select placeholder={'请选择训练数据集版本'} allowClear options={dataSetVOptions} disabled={!!record} />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'算法'} style={{ marginBottom: 0 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item name={['algorithm', 'id']} label={''} rules={[{ required: false, message: '请选择算法' }]}>
										<Select
											placeholder={'请选择算法'}
											allowClear
											options={codeOptions}
											onChange={codeChangeToV}
											disabled={!!record}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name={['algorithm', 'version']} label={''} rules={[{ required: false, message: '请选择算法版本' }]}>
										<Select placeholder={'请选择算法版本'} allowClear options={codeVOptions} disabled={!!record} />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={renderRedLabel('模型')} style={{ marginBottom: 0 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item name={['model', 'id']} rules={[{ required: true, message: '请选择模型' }]}>
										<Select
											placeholder={'请选择模型'}
											allowClear
											options={modelOptions}
											onChange={modelChangeToV}
											disabled={!!record}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name={['model', 'version']} rules={[{ required: true, message: '请选择模型版本' }]}>
										<Select placeholder={'请选择模型版本'} allowClear options={modelVOptions} disabled={!!record} />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item label={'资源配置'}>
							<Row gutter={12}>
								<Col span={8}>
									<Form.Item name={['resources', 'cpu']} rules={[{ required: true, message: '请输入CPU' }]}>
										<Input addonAfter="CPU" placeholder="请输入" disabled={!!record} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name={['resources', 'gpu']} rules={[{ required: true, message: '请输入GPU' }]}>
										<Input addonAfter="GPU" placeholder="请输入" disabled={!!record} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name={['resources', 'memory']} rules={[{ required: true, message: '请输入内存' }]}>
										<Input addonAfter="GB内存" placeholder="请输入" disabled={!!record} />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'command'} label={'运行命令'} rules={[{ required: true, message: '请输入运行命令' }]}>
							<Input.TextArea placeholder={'请输入'} allowClear disabled={!!record} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入算法描述'} allowClear maxLength={500} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreatModal
