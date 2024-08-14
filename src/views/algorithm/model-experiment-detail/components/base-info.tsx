import { Form, Input } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
const BaseInfo = () => {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}
	const renderSource = () => {
		const { resources } = detailData
		const { cpu, gpu, memory } = resources || {}
		return {
			source: `${cpu || ''}CPU ${gpu || ''}GPU ${memory || ''}G内存`,
			type: gpu ? 'GPU' : 'CPU'
		}
	}
	return (
		<div className="side-left">
			<div className="title-box mt16">
				<div className="title">基础信息</div>
			</div>
			<Form preserve={false}>
				<Form.Item name={'name'} label={'测试名称:'}>
					{detailData.name}
				</Form.Item>
				<Form.Item label={'创建用户:'}> {detailData.creator}</Form.Item>
				<Form.Item label={'创建时间:'}>{detailData.createdTime}</Form.Item>
				<Form.Item label={'模型名称:'}>
					{detailData?.modelName}-{detailData?.model?.version}
				</Form.Item>
				<Form.Item label="镜像名称">{detailData.imageName}</Form.Item>
				<Form.Item label="关联算法">{detailData.codeName}</Form.Item>
				<Form.Item label="资源配置">{renderSource()?.source}</Form.Item>
				<Form.Item label={'运行命令:'}>
					<div className="command-info">{detailData.command}</div>
				</Form.Item>
				<Form.Item label={'任务描述:'} className="comment">
					<Input.TextArea disabled value={detailData.comment} />
				</Form.Item>
			</Form>
		</div>
	)
}

export default BaseInfo
