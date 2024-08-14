import { Form, Tag } from 'antd'
import { useContext, useEffect } from 'react'
import { Context } from '../store/reducerContent'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { LinkOutlined } from '@ant-design/icons'
import { getModelDetailApi } from '@/api/modules/models-mange'
import TrainingSettingInfo from './training-setting'

// 基础信息
export default function BaseInfo() {
	const [form] = Form.useForm()
	const { id } = useParams()
	const [search] = useSearchParams()
	const version = search.get('version')

	const {
		state: { baseInfo },
		setBaseInfo
	} = useContext(Context)

	useEffect(() => {
		if (id && version) {
			getModelDetailApi(id, version).then((res: any) => {
				const data = res || {}
				setBaseInfo(data)
			})
		}
	}, [id, version])

	const sourceText: any = {
		1: '本地上传',
		4: '训练导入'
	}

	const useRenderSource = () => {
		const { source } = baseInfo || {}
		if (source) {
			return source === 4 ? (
				<Link to="/algorithm/training-task">
					<Tag icon={<LinkOutlined />} color="success">
						{sourceText[source]}
					</Tag>
				</Link>
			) : (
				<Tag color="success">{sourceText[source]}</Tag>
			)
		}
		return '-'
	}

	return (
		<div className="side-left">
			<div className="header-title">基础信息</div>
			<Form form={form} preserve={false}>
				<Form.Item name={'name'} label={'模型:'}>
					{baseInfo?.name}
				</Form.Item>
				<Form.Item label={'模型来源:'}>{useRenderSource()}</Form.Item>
				<Form.Item label={'创建用户:'}>{baseInfo?.creator}</Form.Item>
				<Form.Item label={'创建时间:'}>{baseInfo?.createdTime}</Form.Item>
				<Form.Item name="comment" label={'模型版本:'}>
					{baseInfo?.version}
				</Form.Item>
				<Form.Item name="comment" label={'模型描述:'}>
					{baseInfo?.comment}
				</Form.Item>
			</Form>
			<TrainingSettingInfo />
		</div>
	)
}
