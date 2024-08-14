import { Form, Row, Col, Input, Select, Tooltip } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { imagesListQery } from '@/api/modules/images-mange'
import { algorithmListQery, algorithmHistoryListQery } from '@/api/modules/algorithm-manage'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { queryDataSetList, dataSetDetailsMap } from '@/api/modules/data-set'
import { modelsListQery, modelsHistoryListQery } from '@/api/modules/models-mange'

const TrainingSetInfo = (props: any, ref: any) => {
	const [form] = Form.useForm()

	const [imageOptions, setImageOptions] = useState([])
	const [codeOptions, setCodeOptions] = useState([])
	const [codeVOptions, setCodeVOptions] = useState([])
	const [dataSetOptions, setDataSetOptions] = useState([])
	const [dataSetVOptions, setDataSetVOptions] = useState([])
	const [modelOptions, setModelOptions] = useState([])
	const [modelVOptions, setModelVOptions] = useState([])
	const { initValues } = props

	useEffect(() => {
		getImageOptions()
		getCodeOptions()
		getDataSetOptions()
		getModelsListQery()
	}, [])

	useEffect(() => {
		initValues && initFieldsValue(initValues)
	}, [initValues])

	useImperativeHandle(ref, () => ({
		// onCallback 就是暴露给父组件的方法
		getFormData: async () => {
			const values = await form.validateFields().then((values: any) => values)
			return values
		}
	}))

	// 复制初始化数据
	const initFieldsValue = (initValues: any) => {
		const { algorithm, dataset, model } = initValues
		const algorithmId = algorithm?.id || ''
		const trainId = dataset?.id || ''
		algorithmId && codeChangeToV(algorithmId)
		trainId && dataSetChangeToV(trainId)
		model?.id && modelChangeToV(model?.id)
		form.setFieldsValue(initValues)
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
					const { version, comment } = item
					return { value: version, label: `${version || ''}-${comment}` }
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
					const { version, comment } = item
					return { value: version, label: `${version || ''}-${comment}` }
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
					const { version, comment } = item
					return { value: version, label: `${version || ''}-${comment}` }
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

	return (
		<Form form={form} labelCol={{ span: 4 }} preserve={false}>
			<Row gutter={12}>
				<Col span={24}>
					<Form.Item label={'选择镜像'} name="envImageId" rules={[{ required: true, message: '请选择镜像' }]}>
						<Select placeholder={'请选择镜像'} allowClear options={imageOptions} />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label={renderRedLabel('算法')} rules={[{ required: true, message: ' ' }]} style={{ marginBottom: 0 }}>
						<Row gutter={12}>
							<Col span={12}>
								<Form.Item name={['algorithm', 'id']} label={''} rules={[{ required: true, message: '请选择算法' }]}>
									<Select placeholder={'请选择算法'} allowClear options={codeOptions} onChange={codeChangeToV} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name={['algorithm', 'version']} label={''} rules={[{ required: true, message: '请选择算法版本' }]}>
									<Select placeholder={'请选择算法版本'} allowClear options={codeVOptions} />
								</Form.Item>
							</Col>
						</Row>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label={renderTips()} rules={[{ required: true, message: ' ' }]} style={{ marginBottom: 0 }}>
						<Row gutter={12}>
							<Col span={12}>
								<Form.Item name={['dataset', 'id']} label={''} rules={[{ required: true, message: '请选择训练数据集' }]}>
									<Select placeholder={'请选择训练数据集'} allowClear options={dataSetOptions} onChange={dataSetChangeToV} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name={['dataset', 'version']} label={''} rules={[{ required: true, message: '请选择训练数据集版本' }]}>
									<Select placeholder={'请选择训练数据集版本'} allowClear options={dataSetVOptions} />
								</Form.Item>
							</Col>
						</Row>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item label={'模型'} style={{ marginBottom: 0 }}>
						<Row gutter={12}>
							<Col span={12}>
								<Form.Item name={['model', 'id']}>
									<Select placeholder={'请选择训练模型'} allowClear options={modelOptions} onChange={modelChangeToV} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name={['model', 'version']}>
									<Select placeholder={'请选择训练模型版本'} allowClear options={modelVOptions} />
								</Form.Item>
							</Col>
						</Row>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name={'command'} label={'运行命令'} rules={[{ required: true, message: '请输入运行命令' }]}>
						<Input.TextArea placeholder={'请输入'} allowClear />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default forwardRef(TrainingSetInfo)
