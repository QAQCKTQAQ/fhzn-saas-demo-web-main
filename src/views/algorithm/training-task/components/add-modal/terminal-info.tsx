import { Form, Row, Col, Input } from 'antd'
import { useEffect } from 'react'
// import { command_config } from '../../const'
const TerminalInfo = (props: any) => {
	const { command } = props
	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue({
			command: `${command}`
		})
	}, [command])

	return (
		<Form form={form} labelCol={{ span: 4 }} preserve={false}>
			<Row gutter={12}>
				<Col span={24}>
					<Form.Item label={'运行命令预览'} name="command">
						<Input.TextArea placeholder={'请输入'} disabled />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default TerminalInfo
