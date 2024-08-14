/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-27 14:49:37
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-03 17:29:43
 */
import { useEffect, useState, useContext } from 'react'
import { Form, Input, Modal, message, Row, Col, Select } from 'antd'
import { addUpdateDataSpaceApi, updatePermitsApi } from '@/api/modules/data-manage'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL, spaceTypeName } from '../const'
import { Context } from '../store/reducerContent'
import { userQueryApi } from '@/api/modules/user'
import { BUZ_TYPE_ENUM } from '@/const/constants'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

function UpdateModal(props: any) {
	const { onOK, onCancel } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [record, setRecord] = useState<any | null>(null)
	const { state } = useContext(Context)
	const { dataSpaceTypes } = state?.dicts || {}
	const [okText, setOkText] = useState<any>('提交')
	const [userList, setUserList] = useState<any[]>([])
	setOkText
	useEffect(() => {
		getUserList()
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
	// 获取创建用户信息
	const getUserList = async () => {
		const { items = [] } = await userQueryApi({ pageSize: 1000, page: 1 })
		const userLists: any[] = (items || []).map((item: any) => {
			const { nickname, nicknameCn } = item
			return { label: nicknameCn, value: nickname }
		})
		setUserList(userLists)
	}
	const updateUser = async (values: any) => {
		const { users = [], spaceId = '' } = values
		updatePermitsApi({
			buzType: BUZ_TYPE_ENUM.FOLDER,
			buzId: spaceId,
			users: (users || []).map((nickname: any) => {
				return { nickname }
			})
		})
			.then(() => {
				message.success('操作成功！')
				hideModal()
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const submit = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		setLoading(true)
		addUpdateDataSpaceApi({ ...record, ...values })
			.then((res: any) => {
				message.success('操作成功！')
				onOK && onOK()
				setLoading(false)
				updateUser({ ...values, ...res })
				spaceTypeName[values?.spaceType || '-']
				if (record?.name) {
					LogReport(
						OPERATION_ENUM?.COMMON?.EDIT,
						`数据空间-${spaceTypeName[values?.spaceType || '-']}空间：编辑${values?.name}空间`
					)
				} else {
					LogReport(
						OPERATION_ENUM?.COMMON?.ADD,
						`数据空间-${spaceTypeName[values?.spaceType] || '-'}空间：创建${values?.name}空间`
					)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Modal
			width="500px"
			confirmLoading={loading}
			title={record && record.id ? '编辑空间' : '创建空间'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			okText={okText}
			onOk={submit}
		>
			<Form form={form} style={{ width: '100%' }} labelCol={{ span: 5 }} preserve={false}>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'名称'} rules={[{ required: true, message: '请输入空间名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'spaceType'} label={'空间类型'} rules={[{ required: true, message: '请选择空间类型' }]}>
							<Select disabled={record?.id} placeholder={'请选择空间类型'} options={dataSpaceTypes}></Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入'} allowClear maxLength={50} showCount />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'users'} label={'权限分配'} rules={[{ required: true, message: '请进行数据空间权限分配' }]}>
							<Select mode="multiple" placeholder={'请选择用户'} options={userList}></Select>
						</Form.Item>
					</Col>
				</Row>
				{record?.id && (
					<>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item name={'creator'} label={'创建人'}>
									<span>{record?.creator}</span>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item name={'createdTime'} label={'创建时间'}>
									<span>{record?.createdTime}</span>
								</Form.Item>
							</Col>
						</Row>
					</>
				)}
			</Form>
		</Modal>
	)
}

export default UpdateModal
