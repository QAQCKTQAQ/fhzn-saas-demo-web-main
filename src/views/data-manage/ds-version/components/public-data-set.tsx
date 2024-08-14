/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-05 09:33:16
 */
import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import { publishVersionDataSet } from '@/api/modules/data-set'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_PUBLIC } from '../const'
import { useSearchParams } from 'react-router-dom'

interface ResourceRecord {
	id?: any
	version?: any
}

function PublicDataSetModal(props: any) {
	const { onOK, onCancel, name } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<ResourceRecord | null>(null)
	const [search] = useSearchParams()
	const id = search.get('id')
	record

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_PUBLIC, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_PUBLIC)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		const { version } = initialValues
		form.setFieldsValue({
			version,
			name: name
		})
	}

	const hideModal = () => {
		setVisible(false)
		onCancel && onCancel()
	}

	// 发布数据集
	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		publishVersionDataSet({ ...values, datasetId: id })
			.then(() => {
				message.success('发布成功！')
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
			title={'发布数据集'}
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
							<Input disabled placeholder={'请输入数据集名称'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'version'} label={'当前版本'} rules={[{ required: true, message: '请选择当前版本' }]}>
							<Input disabled placeholder={'当前版本'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default PublicDataSetModal
