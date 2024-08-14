/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-21 17:31:07
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-04-03 14:35:13
 */
import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Switch, Select } from 'antd'
import { updateReosurce, addNewReosurce } from '@/api/modules/resource'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_RESOURCE_MODAL } from '../const'
import { STATUS_ENUM } from '@/const/constants'
import { AUTH_TYPE_OPTIONS } from '@/const/constants'

interface ResourceRecord {
	id?: any
}

function ResourceModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<ResourceRecord | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_RESOURCE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_RESOURCE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		const { resourceType } = initialValues || {}
		const initFormData = {
			...(initialValues || {}),
			status: `${initialValues && initialValues.status}` === STATUS_ENUM.ENABLE ? 'checked' : false,
			resourceType: (resourceType && `${resourceType}`) || undefined
		}
		form.setFieldsValue(initFormData)
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}

	// 处理提交数据
	const handleSubmitData = (data: any) => {
		const { status, ...rest } = data
		return {
			...rest,
			status: status ? STATUS_ENUM.ENABLE : STATUS_ENUM.DISABLED
		}
	}

	const getInterfaceByRecord = (data: any) => {
		const id = (record && record.id) || ''
		const params = handleSubmitData({ id, ...data })
		if (id) {
			return updateReosurce(params)
		}
		return addNewReosurce(params)
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		getInterfaceByRecord(values)
			.then(() => {
				message.success('操作成功！')
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
			title={record ? '编辑资源' : '新建资源'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} layout="vertical" preserve={false}>
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item name={'code'} label={'资源编码'} rules={[{ required: true, message: '请输入资源编码' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'name'} label={'资源名称'} rules={[{ required: true, message: '请输入资源名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'appCode'} label={'所属系统'} rules={[{ required: true, message: '请选择所属系统' }]}>
							<Select
								placeholder={'请选择'}
								options={[
									{
										label: '样本库',
										value: 'YBK'
									}
								]}
							></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name={'status'}
							valuePropName="checked"
							label={'资源状态'}
							rules={[{ required: true, message: '请选择资源状态' }]}
						>
							<Switch checkedChildren="启用" unCheckedChildren="停用" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'parentCode'} label={'父资源编码'} rules={[{ required: false, message: '请输入父资源编码' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'resourceType'} label={'资源类型'} rules={[{ required: true, message: '请选择资源类型' }]}>
							<Select placeholder={'请选择'} options={AUTH_TYPE_OPTIONS}></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'resourceUrl'} label={'资源URL'} rules={[{ required: false, message: '请输入资源URL' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'sort'} label={'排序号'} rules={[{ required: false, message: '请输入排序号' }]}>
							<Input placeholder={'请输入'} type="number" allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'comment'} label={'备注'} rules={[{ required: false, message: '请输入备注' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'icon'} label={'icon'} rules={[{ required: false, message: '请输入icon编码' }]}>
							<Input placeholder={'icon库请见“ant icon”'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'resourceExt'} label={'扩展'} rules={[{ required: false, message: '请输入扩展' }]}>
							<Input placeholder={'扩展'} allowClear maxLength={100} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default ResourceModal
