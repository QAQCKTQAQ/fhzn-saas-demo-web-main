import { useEffect, useState, useRef } from 'react'
import { Form, Modal, message, Row, Col, Upload, Button } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CHARACTER_FILE_MODAL } from '../const'
import { UploadOutlined } from '@ant-design/icons'

interface Record {
	id?: string
}

function CharacterFileModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	const currentData = useRef<Record>({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_CHARACTER_FILE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_CHARACTER_FILE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current = data
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
	}

	const submit = async () => {
		setLoading(true)
		setTimeout(() => {
			message.success('操作成功！')
			hideModal()
			setLoading(false)
		}, 2000)
	}

	return (
		<Modal
			width="50%"
			confirmLoading={loading}
			title={'上传特性文件'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} labelCol={{ span: 6 }} preserve={false}>
				<Row>
					<Col span={24}>
						<Form.Item label={'上传特性文件'} name="file" rules={[{ required: true, message: '请上传文件' }]}>
							<Upload name="file">
								<Button icon={<UploadOutlined />}>上传</Button>
							</Upload>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CharacterFileModal
