import { Button, Empty, Form, Input, Space, Upload, Image, message } from 'antd'
import { EditOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import { Context } from '../store/reducerContent'
import { addUpdatecharacterInfoApi, getCharacterBasicInfoApi } from '@/api/modules/szyj-manage'
import { baseURL } from '@/config/config'
import { useParams } from 'react-router-dom'
// 基础信息
export default function BaseInfo() {
	const [editable, setEditable] = useState(false)
	const [form] = Form.useForm()
	const [fileNo, setFileNo] = useState('')
	const { id } = useParams()

	const {
		state: { baseInfo },
		setBaseInfo
	} = useContext(Context)

	useEffect(() => {
		if (id) {
			getCharacterBasicInfoApi(id).then((res: any) => {
				const data = res || {}
				setBaseInfo(data)
			})
		}
	}, [id])

	// 不可编辑时初始化数据
	const initDataForm = () => {
		const { imageFileCode, name, comment } = baseInfo
		setFileNo(imageFileCode)
		form.setFieldsValue({
			imageFileCode,
			name,
			comment
		})
	}

	// 渲染按钮
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

	// 取消按钮
	const cancelEdit = () => {
		// form.resetFields()
		setFileNo('')
		setEditable(false)
	}

	// 保存数据
	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id, levelId } = baseInfo
		addUpdatecharacterInfoApi({ ...values, id, levelId }).then(() => {
			cancelEdit()
			message.success('保存成功！')
			setBaseInfo({ ...baseInfo, ...values })
		})
	}

	// 上传图片
	const handleChange = (info: any) => {
		form.setFieldsValue({ imageCode: undefined })
		if (info.file.status === 'done') {
			const { code } = info?.file?.response?.data || {}
			setFileNo(code)
			form.setFieldsValue({ imageFileCode: code })
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
		const { imageFileCode } = baseInfo || {}
		return (
			<div className="upload-image">
				{(imageFileCode && <Image src={`${baseURL}/bff/download?fileCode=${imageFileCode}`} />) || (
					<Empty description="暂无封面图" />
				)}
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
				<Form.Item name={'imageFileCode'} rules={[{ required: editable, message: '请上传封面图' }]}>
					{renderCover()}
				</Form.Item>
				<Form.Item name={'name'} label={'特性名称:'} rules={[{ required: editable, message: '请输入特性名称' }]}>
					{(editable && <Input placeholder="请输入" maxLength={50} showCount />) || baseInfo?.name}
				</Form.Item>
				<Form.Item label={'创建用户:'}>{baseInfo?.creator}</Form.Item>
				<Form.Item label={'创建时间:'}>{baseInfo?.createdTime}</Form.Item>
				<Form.Item name="comment" label={'描述:'}>
					{(editable && <Input.TextArea placeholder="请输入" />) || baseInfo?.comment}
				</Form.Item>
			</Form>
		</div>
	)
}
