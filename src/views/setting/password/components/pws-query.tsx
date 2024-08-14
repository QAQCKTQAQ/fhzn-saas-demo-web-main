import { Card, Form, Input, Modal } from 'antd'
import { queryUserPassWordApi } from '@/api/modules/user'

const PassQuery = () => {
	const [form] = Form.useForm()

	const onSearch = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		queryUserPassWordApi(values).then(res => {
			Modal.success({
				content: `账号${values.nickname}的密码为：${res || ''}`
			})
		})
	}

	return (
		<Card title="查询密码">
			<Form form={form} labelCol={{ span: 4 }} preserve={false}>
				<Form.Item label="账号" name="nickname" rules={[{ required: true, message: '请输入账号' }]}>
					<Input.Search placeholder="请输入账号" onSearch={onSearch} enterButton="查询" allowClear />
				</Form.Item>
			</Form>
		</Card>
	)
}

export default PassQuery
