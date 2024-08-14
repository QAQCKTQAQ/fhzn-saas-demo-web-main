import { Button, Empty, Form, Input, Radio, Image, Space, Upload, message } from 'antd'
import { EditOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import { Context } from '../store/reducerContent'
import { BUZ_TYPE_MAP } from '@/views/szyj-menu/const'
import { baseURL } from '@/config/config'
import { updateMkyjBaseApi } from '@/api/modules/szyj-manage'

// 基础信息
export default function BaseInfo() {
	const [editable, setEditable] = useState(false)
	const [form] = Form.useForm()
	const [fileNo, setFileNo] = useState('')
	const {
		state: { baseInfo },
		setBaseInfo
	} = useContext(Context)

	// 编辑按钮
	const renderEdit = () => {
		if (editable) {
			return (
				<Space>
					<Button size="small" type="link" onClick={cancelEdit}>
						取消
					</Button>
					<Button size="small" type="link" onClick={saveData}>
						保存
					</Button>
				</Space>
			)
		}
		return (
			<Button
				size="small"
				type="link"
				icon={<EditOutlined />}
				onClick={() => {
					setEditable(true)
					initDataForm()
				}}
			>
				编辑
			</Button>
		)
	}

	// 不可编辑时初始化数据
	const initDataForm = () => {
		const { imageCode, name, comment, buzType, categoryId } = baseInfo
		setFileNo(imageCode)
		form.setFieldsValue({
			imageCode,
			name,
			comment,
			buzType: `${buzType}`,
			categoryId: `${categoryId}`
		})
	}
	const cancelEdit = () => {
		form.resetFields()
		setFileNo('')
		setEditable(false)
	}

	// 保存
	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id, levelId } = baseInfo
		updateMkyjBaseApi({ ...values, id }).then(() => {
			cancelEdit()
			message.success('保存成功！')
			setBaseInfo({ ...baseInfo, ...values, levelId })
		})
	}

	// 封面上传
	const handleChange = (info: any) => {
		form.setFieldsValue({ imageCode: undefined })
		if (info.file.status === 'done') {
			const { code } = info?.file?.response?.data || {}
			setFileNo(code)
			form.setFieldsValue({ imageCode: code })
		}
	}

	// 封面
	const renderCover = () => {
		if (editable) {
			return (
				<div className="upload-image">
					<Upload
						className="upload-icon"
						name="file"
						action="/api/bff/upload"
						showUploadList={false}
						data={{ source: UPLOAD_SOURCE_ENUM.FILES }}
						onChange={handleChange}
						accept="image/*"
						maxCount={1}
					>
						<div className="image-upload-box">
							<img src={`/api/bff/download?fileCode=${fileNo}`} alt="avatar" style={{ width: '100%' }} />
							<div className="image-upload-mask">
								<Button type="link" icon={<CloudUploadOutlined />}>
									上传封面
								</Button>
							</div>
						</div>
					</Upload>
				</div>
			)
		}
		const { imageCode } = baseInfo || {}
		return (
			<div className="upload-image">
				{(imageCode && <Image src={`${baseURL}/bff/download?fileCode=${imageCode}`} />) || <Empty description="暂无封面图" />}
			</div>
		)
	}

	// 渲染标签
	// const renderTagSelect = () => {
	// 	if (editable) {
	// 		return <Select placeholder="请选择" options={YJ_BUZ_TYPE_OPTIONS} />
	// 	}
	// 	return YJ_BUZ_TYPE_MAP[baseInfo.categoryId]
	// }

	const renderTypeRadio = () => {
		if (editable) {
			return (
				<Radio.Group>
					<Radio value={'1'}>智能</Radio>
					<Radio value={'2'}>机能</Radio>
				</Radio.Group>
			)
		}
		return BUZ_TYPE_MAP[baseInfo.buzType]
	}

	return (
		<div className="side-left">
			<div className="header-title">
				基础信息
				{renderEdit()}
			</div>
			<Form form={form} preserve={false}>
				<Form.Item name={'imageCode'} rules={[{ required: editable, message: '请上传封面图' }]}>
					{renderCover()}
				</Form.Item>
				<Form.Item name={'name'} label={'样机名称:'} rules={[{ required: editable, message: '请输入样机名称' }]}>
					{(editable && <Input placeholder="请输入" maxLength={50} showCount />) || baseInfo?.name}
				</Form.Item>
				{/* <Form.Item label={'关联标签:'} name="categoryId" rules={[{ required: editable, message: '请选择标签' }]}>
					{renderTagSelect()}
				</Form.Item> */}
				<Form.Item label={'样机类型:'} name="buzType" rules={[{ required: editable, message: '请选择样机类型' }]}>
					{renderTypeRadio()}
				</Form.Item>
				<Form.Item label={'创建用户:'}> {baseInfo?.creator}</Form.Item>
				<Form.Item label={'创建时间:'}> {baseInfo?.createdTime}</Form.Item>
				<Form.Item name="comment" label={'样机描述:'}>
					{(editable && <Input.TextArea placeholder="请输入" />) || baseInfo?.comment}
				</Form.Item>
			</Form>
		</div>
	)
}
