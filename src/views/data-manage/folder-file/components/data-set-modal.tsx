import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col, Select } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_SAVE_DATA_SET_MODAL } from '../const'
import { dataSetSave } from '@/api/modules/data-set'
import { FOLDER_TYPE_ENUM } from '@/const/constants'

function CreateDataSetModal(props: any) {
	const { selectedRowKeys, onOK, folderType } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_SAVE_DATA_SET_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_SAVE_DATA_SET_MODAL)
		}
	}, [])

	const showModal = () => {
		setVisible(true)
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		setLoading(false)
	}

	const submit = async () => {
		const values: any = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		try {
			const params = folderType === FOLDER_TYPE_ENUM.FOLDER ? { folderId: selectedRowKeys[0] } : { fileIDList: selectedRowKeys }
			// 保存为数据集
			await dataSetSave({ ...params, ...values })
			setLoading(false)
			message.success('操作成功！')
			onOK && onOK()
			hideModal()
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			width="800px"
			confirmLoading={loading}
			title={'保存为数据集'}
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
						<Form.Item name={'type'} label={'数据类型'} rules={[{ required: true, message: '请选择数据类型' }]}>
							<Select placeholder={'请选择数据类型'} options={[]}></Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'comment'} label={'简介摘要'} rules={[{ required: true, message: '请输入简介摘要' }]}>
							<Input placeholder={'请输入简介摘要'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name={'tags'} label={'标签'} rules={[{ required: true, message: '请选择标签类型' }]}>
							<Select placeholder={'请选择标签'} mode="multiple" options={[]}></Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreateDataSetModal
