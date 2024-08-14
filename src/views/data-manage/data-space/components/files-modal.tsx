/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-24 14:32:06
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-03 17:29:28
 */
import { useEffect, useState, useContext } from 'react'
import { Form, Input, Modal, message, Row, Col } from 'antd'
import { addUpdateFilesApi } from '@/api/modules/data-manage'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_FILEFOLDER_MODAL } from '../const'
import { Context } from '../store/reducerContent'
interface FilesRecord {
	id?: any
}

function FilesModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<FilesRecord | null>(null)

	const {
		queryList,
		state: { selectNode, fileFolderIdList }
	} = useContext(Context)

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_FILEFOLDER_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_FILEFOLDER_MODAL)
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

	const queryDetails = () => {
		if (selectNode?.spaceId) {
			queryList({
				parentId:
					fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId
			})
		}
	}

	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = record || {}
		setLoading(true)
		addUpdateFilesApi({
			...values,
			id,
			parentId:
				fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId
		})
			.then(() => {
				message.success('操作成功！')
				hideModal()
				onOK && onOK({ name: values?.name })
				queryDetails()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Modal
			width="500px"
			confirmLoading={loading}
			title={record ? '编辑文件夹' : '新建文件夹'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 5 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'名称'} rules={[{ required: true, message: '请输入空间名称' }]}>
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

export default FilesModal
