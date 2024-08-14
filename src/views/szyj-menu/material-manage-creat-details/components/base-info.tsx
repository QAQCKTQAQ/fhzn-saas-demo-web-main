import { Button, Empty, Form, Input, Space, Upload, message } from 'antd'
import { EditOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'

// 基础信息
export default function BaseInfo() {
	const [editable, setEditable] = useState(false)
	const [form] = Form.useForm()
	const [fileNo, setFileNo] = useState('')

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
			<Button size="small" type="link" icon={<EditOutlined />} onClick={() => setEditable(true)}>
				编辑
			</Button>
		)
	}

	const cancelEdit = () => {
		form.resetFields()
		setFileNo('')
		setEditable(false)
	}

	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		console.log('values', values)
		message.success('保存成功！')
		cancelEdit()
	}

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
						{(fileNo && <img src={`/api/bff/download?fileCode=${fileNo}`} alt="avatar" style={{ width: '100%' }} />) || (
							<Button type="link" icon={<CloudUploadOutlined />}>
								上传封面
							</Button>
						)}
					</Upload>
				</div>
			)
		}
		return (
			<div className="upload-image">
				<Empty description="暂无封面图" />
			</div>
		)
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
					{editable && <Input placeholder="请输入" maxLength={50} showCount />}
				</Form.Item>
				<Form.Item label={'标签:'}> LD样机</Form.Item>
				<Form.Item label={'智能/机能:'}>智能</Form.Item>
				<Form.Item label={'创建用户:'}> ZeroSi</Form.Item>
				<Form.Item label={'创建时间:'}> 2023-01-13 17:56:00</Form.Item>
				<Form.Item name="comment" label={'描述:'} className="comment">
					<Input.TextArea placeholder="请输入" disabled={!editable} />
				</Form.Item>
			</Form>
		</div>
	)
}
