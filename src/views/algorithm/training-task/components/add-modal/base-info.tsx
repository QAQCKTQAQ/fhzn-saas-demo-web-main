import { Form, Row, Col, Input } from 'antd'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

const BaseInfo = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const { initValues } = props

	useEffect(() => {
		initValues && form.setFieldsValue(initValues)
	}, [initValues])

	useImperativeHandle(ref, () => ({
		// getFormData 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => values)
		}
	}))

	return (
		<Form form={form} labelCol={{ span: 4 }} preserve={false}>
			<Row gutter={12}>
				<Col span={24}>
					<Form.Item name={'name'} label={'任务名称'} rules={[{ required: true, message: '请输入任务名称' }]}>
						<Input placeholder={'请输入'} allowClear maxLength={50} showCount />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name={'comment'} label={'任务描述'}>
						<Input.TextArea placeholder={'请输入'} allowClear maxLength={256} showCount />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default forwardRef(BaseInfo)
