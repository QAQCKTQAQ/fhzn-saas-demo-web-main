import { Form, Row, Col, Input, Select } from 'antd'
import './index.less'
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { modelsListQery, modelsHistoryListQery } from '@/api/modules/models-mange'
import { algorithmListQery, algorithmHistoryListQery } from '@/api/modules/algorithm-manage'
import { imagesListQery } from '@/api/modules/images-mange'

const ImageInfo = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const [imageOptions, setImageOptions] = useState([])
	const [codeOptions, setCodeOptions] = useState([])
	const [codeVOptions, setCodeVOptions] = useState([])
	const [modelOptions, setModelOptions] = useState([])
	const [modelVOptions, setModelVOptions] = useState([])

	useImperativeHandle(ref, () => ({
		// getFormData 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => values)
		}
	}))

	useEffect(() => {
		getImageOptions()
		getCodeOptions()
		getModelsListQery()
	}, [])
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
	const renderRedLabel = (name: any) => {
		return <label className="red-label-subfix">{name}</label>
	}
	return (
		<Form form={form} labelCol={{ span: 6 }} preserve={false}>
			<div className="signle-image-info-box">
				<div className="header-title">基本信息</div>
				<Row>
					<Col span={24}>
						<Form.Item name={'name'} label={'样机名称'} rules={[{ required: true, message: '请选择数字样机名称' }]}>
							<Select
								placeholder="请选择"
								options={[
									{ label: 'LD', value: '1' },
									{ label: 'GX', value: '2' }
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'buzType'} label={'样机类型'} rules={[{ required: true, message: '请选择智能/机能' }]}>
							<Select
								placeholder="请选择"
								options={[
									{ label: '智能', value: '1' },
									{ label: '机能', value: '2' }
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'样机描述'}>
							<Input.TextArea placeholder={'请输入'} allowClear maxLength={150} showCount />
						</Form.Item>
					</Col>
				</Row>
			</div>
			<div className="signle-image-info-box">
				<div className="header-title">镜像信息</div>
				<Row>
					<Col span={24}>
						<Form.Item label={'基础环境'} name={['envImage', 'basicEnv']} rules={[{ required: true, message: '请输入基础环境' }]}>
							<Input.TextArea placeholder={'请输入基础环境'} allowClear />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'镜像'} name="envImageId" rules={[{ required: true, message: '请选择镜像' }]}>
							<Select placeholder={'请选择镜像'} allowClear options={imageOptions} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'镜像描述'} name={['image', 'comment']}>
							<Input placeholder={'请输入镜像描述'} allowClear />
						</Form.Item>
					</Col>
				</Row>
			</div>
			<div className="signle-image-info-box">
				<div className="header-title">算法信息</div>
				<Row>
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
						<Form.Item label={'算法描述'} name={['algorithm', 'comment']}>
							<Input placeholder={'请输入算法描述'} allowClear />
						</Form.Item>
					</Col>
				</Row>
			</div>

			<div className="signle-image-info-box">
				<div className="header-title">模型信息</div>
				<Row>
					<Col span={24}>
						<Form.Item label={renderRedLabel('模型')} style={{ marginBottom: 0 }}>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item name={['model', 'id']} rules={[{ required: true, message: '请选择模型' }]}>
										<Select placeholder={'请选择模型'} allowClear options={modelOptions} onChange={modelChangeToV} />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name={['model', 'version']} rules={[{ required: true, message: '请选择模型版本' }]}>
										<Select placeholder={'请选择模型版本'} allowClear options={modelVOptions} />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'模型描述'} name={['model', 'comment']}>
							<Input placeholder={'请输入模型描述'} allowClear />
						</Form.Item>
					</Col>
				</Row>
			</div>
			<div className="signle-image-info-box">
				<div className="header-title">运行信息</div>
				<Row>
					<Col span={24}>
						<Form.Item label={'资源配置'} className="resource-congfig-box">
							<Row gutter={6}>
								<Col span={8}>
									<Form.Item name={['resource', 'cpu']} rules={[{ required: true, message: '请输入CPU' }]} initialValue={2}>
										<Input type="number" min={1} addonAfter="CPU" placeholder="请输入" />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name={['resource', 'gpu']} rules={[{ required: true, message: '请输入GPU' }]} initialValue={2}>
										<Input type="number" addonAfter="GPU" min={1} placeholder="请输入" />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name={['resource', 'memory']} rules={[{ required: true, message: '请输入内存' }]} initialValue={8}>
										<Input type="number" addonAfter="GB内存" min={1} placeholder="请输入" />
									</Form.Item>
								</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'启动命令'} name="command" rules={[{ required: true, message: '请输入启动命令' }]}>
							<Input.TextArea placeholder={'请输入启动命令'} allowClear />
						</Form.Item>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default forwardRef(ImageInfo)
