/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-15 16:11:59
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-04 10:23:13
 */

import { useEffect, useState } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_EDIT_MODAL } from '../../const'
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
import { algorithmUpdate } from '@/api/modules/algorithm'

interface FilesRecord {
	id?: any
}
function EditTaskModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<FilesRecord | null>(null)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_EDIT_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_EDIT_MODAL)
		}
	})

	// 展开蒙层
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
	// 关闭蒙层
	const hideModal = () => {
		form.resetFields()
		setVisible(false)
		onCancel && onCancel()
	}
	// 提交数据
	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = record || {}
		setLoading(true)
		algorithmUpdate({ ...values, id })
			.then(() => {
				message.success('操作成功！')
				setLoading(false)
				hideModal()
				onOK && onOK()
				LogReport(OPERATION_ENUM.COMMON.EDIT, `${values?.name} - 训练任务编辑成功`)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return (
		<Modal
			width="500px"
			confirmLoading={loading}
			title={record ? '编辑任务' : '新建任务'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 6 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'任务名称'} rules={[{ required: true, message: '请输入任务名称' }]}>
							<Input placeholder={'请输入任务名称'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入任务描述'} allowClear maxLength={500} showCount />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default EditTaskModal
