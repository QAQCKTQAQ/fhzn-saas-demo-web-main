import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import { addUpdatecharacterInfoApi } from '@/api/modules/szyj-manage'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import { useNavigate } from 'react-router-dom'
interface Record {
	id?: any
	levelId?: any
}

function CharacterModal(props: any) {
	const { onOK, onCancel, selectNode } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<Record | null>(null)

	const navigate = useNavigate()

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		initialValues(data)
	}

	// 初始化数据
	const initialValues = (initialValues: any) => {
		if (initialValues) {
			return form.setFieldsValue({
				...(initialValues || {})
			})
		}
	}

	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { key } = selectNode || {}
		const { id, levelId } = record || {}
		setLoading(true)
		addUpdatecharacterInfoApi({ ...values, id, levelId: levelId || key })
			.then(data => {
				message.success('操作成功！')
				hideModal()
				if (id) {
					return onOK && onOK()
				}
				navigate(`/szyj-menu/character-info/detail/${data}`)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Modal
			width="500px"
			confirmLoading={loading}
			title={record ? '编辑' : '创建'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 5 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'特性名称'} rules={[{ required: true, message: '请输入特性名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CharacterModal
