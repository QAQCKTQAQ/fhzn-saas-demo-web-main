import { Form, Row, Col, Input } from 'antd'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

const ParamInfo = (props: any, ref: any) => {
	const [form] = Form.useForm()

	const { initValues } = props

	useEffect(() => {
		initValues && form.setFieldsValue(initValues)
	}, [initValues])

	useImperativeHandle(ref, () => ({
		// onCallback 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => values)
		}
	}))

	return (
		<Form form={form} labelCol={{ span: 4 }} preserve={false}>
			<Row gutter={12}>
				<Col span={24}>
					<Form.Item name={''} label={'训练数据集'} rules={[{ required: false, message: '请输入参数名称' }]}>
						<Input placeholder={'如需传入训练数据集，请填写您的算法代码中用于接收训练数据集路径的参数'} allowClear />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name={''} label={'验证数据集'} rules={[{ required: false, message: '请输入参数名称' }]}>
						<Input placeholder={'如需传入验证数据集，请填写您的算法代码中用于接收验证数据集路径的参数'} allowClear />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name={''} label={'训练模型'} rules={[{ required: false, message: '请输入参数名称' }]}>
						<Input placeholder={'如需断点续训或加载已有模型，请填写您的算法代码中用于接收训练模型路径的参数'} allowClear />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name={''} label={'模型输出'} rules={[{ required: false, message: '请输入参数名称' }]}>
						<Input placeholder={'如需输出模型，请填写您的算法代码中用于接收模型输出路径的参数'} allowClear />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default forwardRef(ParamInfo)
