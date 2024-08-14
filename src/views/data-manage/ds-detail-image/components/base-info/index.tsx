import { Button, Form, Input, Space, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import './index.less'
import { Context } from '../../store/reducerContent'
import { dataSetVersionUpdateApi } from '@/api/modules/data-set'
import { useSearchParams } from 'react-router-dom'
// import { DATA_SET_TAG_COLOR_MAP } from '@/const/constants'

// 基础信息
export default function BaseInfo() {
	const [editable, setEditable] = useState(false)
	const [form] = Form.useForm()

	const {
		state: { baseInfo },
		state,
		setBaseInfo
	} = useContext(Context)
	const { dataSetTags } = state?.dicts || {}
	dataSetTags

	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	// 不可编辑时初始化数据
	const initDataForm = () => {
		form.setFieldsValue(baseInfo)
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
		form.resetFields()
		setEditable(false)
	}

	// 保存数据
	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { version } = baseInfo
		dataSetVersionUpdateApi({
			...values,
			datasetId: id,
			version,
			directoryConfig: [
				{
					type: 'train',
					fileDirectory: 'dataset/train/',
					propertyDirectory: 'dataset/train/',
					annotationDirectory: 'dataset/train/'
				},
				{
					type: 'validation',
					fileDirectory: 'dataset/validation/',
					propertyDirectory: 'dataset/validation/',
					annotationDirectory: 'dataset/validation/'
				},
				{
					type: 'test',
					fileDirectory: 'dataset/test/',
					propertyDirectory: 'dataset/test/',
					annotationDirectory: 'dataset/test/'
				}
			]
		}).then(() => {
			cancelEdit()
			message.success('保存成功！')
			setBaseInfo({ ...baseInfo, ...values })
		})
	}

	return (
		<div className="base-info-box">
			<div className="header-title">
				版本信息
				{renderEdit()}
			</div>

			<Form form={form} preserve={false}>
				<Form.Item label={'数据集名称:'} rules={[{ required: editable, message: '请输入特性名称' }]}>
					{baseInfo?.name}
				</Form.Item>
				<Form.Item label={'数据集版本:'}>{baseInfo?.version}</Form.Item>
				<Form.Item label={'创建用户:'}>{baseInfo?.creator}</Form.Item>
				<Form.Item label={'创建时间:'}>{baseInfo?.createdTime}</Form.Item>
				<Form.Item label={'版本发布:'}>{baseInfo?.ifPublished ? '已发布' : '未发布'}</Form.Item>
				<Form.Item name="comment" label={'版本描述:'}>
					{(editable && <Input.TextArea placeholder="请输入" />) || baseInfo?.comment || '-'}
				</Form.Item>
			</Form>
		</div>
	)
}
