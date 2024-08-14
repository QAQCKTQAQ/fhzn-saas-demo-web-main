import { Card, Form, Input, message } from 'antd'
import { resetUserPassWordApi } from '@/api/modules/user'

const PassReset = () => {
	const [form] = Form.useForm()

	const onSearch = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		resetUserPassWordApi(values).then(() => {
			message.success('密码重置成功！')
		})
	}

	return (
		<Card title="初始化密码">
			<Form form={form} labelCol={{ span: 4 }} preserve={false}>
				<Form.Item label="账号" name="nickname" rules={[{ required: true, message: '请输入账号' }]}>
					<Input.Search placeholder="请输入账号" onSearch={onSearch} enterButton="重置" allowClear />
				</Form.Item>
			</Form>
		</Card>
	)
}

export default PassReset
