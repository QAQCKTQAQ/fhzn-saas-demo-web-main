import { useContext, useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Select } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREAT_DATA_MODAL } from '../const'
import { createDataSet } from '@/api/modules/data-set'
import { Context } from '../store/reducerContent'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
interface ResourceRecord {
	id?: any
}

function CreateDataSetModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<ResourceRecord | null>(null)
	const { state } = useContext(Context)
	const { dataSetTypes, dataSetTags } = state?.dicts || {}

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CREAT_DATA_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CREAT_DATA_MODAL)
		}
	}, [])

	// 展示弹窗
	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		if (initialValues) {
			const { type = '', tags = [] } = initialValues
			let params: any = {
				type: type.toString(),
				tags: tags.map((item: any) => {
					return item.toString()
				})
			}
			return form.setFieldsValue({
				...({ ...initialValues, ...params } || {})
			})
		}
		// const initFormData = {
		// 	...(initialValues || {}),
		// 	status: `${initialValues && initialValues.status}` === STATUS_ENUM.ENABLE ? 'checked' : false
		// }
		form.setFieldsValue(initialValues)
	}
	// 关闭弹窗
	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}
	// 提交
	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = record || {}
		setLoading(true)
		createDataSet({ ...values, id })
			.then(() => {
				message.success(`${record ? '编辑成功' : '创建成功！'}`)
				if (record?.id) {
					LogReport(OPERATION_ENUM?.COMMON?.EDIT, `数据集管理-编辑${values?.name}数据集`)
				} else {
					LogReport(OPERATION_ENUM?.COMMON?.ADD, `数据集管理-新建${values?.name}数据集`)
				}
				hideModal()
				onOK && onOK()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Modal
			width="800px"
			confirmLoading={loading}
			title={'创建数据集'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} layout="vertical" preserve={false}>
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item name={'name'} label={'数据集名称'} rules={[{ required: true, message: '请输入数据集名称' }]}>
							<Input placeholder={'请输入数据集名称'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'type'} label={'数据集类型'} rules={[{ required: true, message: '请选择数据类型' }]}>
							<Select placeholder={'请选择数据类型'} options={dataSetTypes}></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'tags'} label={'数据集标签'} rules={[{ required: true, message: '请选择标签类型' }]}>
							<Select placeholder={'请选择标签'} mode="multiple" options={dataSetTags}></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'comment'} label={'简介摘要'} rules={[{ required: false, message: '请输入简介摘要' }]}>
							<Input placeholder={'请输入简介摘要'} allowClear maxLength={256} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreateDataSetModal
