import { useEffect, useState } from 'react'
import { Col, Form, Input, Modal, Row, message } from 'antd'
import { dataSetVersionUpdateApi } from '@/api/modules/data-set'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREATE_VERSION_MODAL } from '../const'

function CreateDataSetVModal(props: any) {
	const { onOk } = props
	const [visible, setVisible] = useState(false)
	const [loading] = useState(false)
	const [form] = Form.useForm()
	const [record, setRecord] = useState<any>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CREATE_VERSION_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CREATE_VERSION_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
	}

	const hideModal = () => {
		setVisible(false)
		form.resetFields()
	}

	// 数据集添加数据
	const submit: any = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { version, id } = record || {}
		dataSetVersionUpdateApi({
			datasetId: id,
			version,
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
			...values
		}).then(() => {
			onOk && onOk({ name: record?.name })
			message.success('操作成功！')
			hideModal()
		})
	}

	if (visible) {
		return (
			<Modal
				width="400px"
				confirmLoading={loading}
				title={'创建数据集版本'}
				open={visible}
				onCancel={hideModal}
				maskClosable={false}
				destroyOnClose
				onOk={submit}
			>
				<Form form={form} layout="vertical" preserve={false}>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item label={'数据集名称:'}>{record?.name}</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'comment'} label={'版本描述:'} rules={[{ required: true, message: '请输入版本描述' }]}>
								<Input placeholder={'请输入版本描述'} allowClear maxLength={256} showCount />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		)
	}
	return null
}

export default CreateDataSetVModal
