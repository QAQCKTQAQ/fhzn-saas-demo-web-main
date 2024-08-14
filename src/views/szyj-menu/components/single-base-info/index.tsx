import { Form, Row, Col, Input, Select } from 'antd'
import './index.less'
import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { isEmpty } from 'lodash'

const BaseInfo = (props: any, ref: any) => {
	const { initValues } = props
	const [form] = Form.useForm()

	useImperativeHandle(ref, () => ({
		// getFormData 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => values)
		}
	}))

	useEffect(() => {
		if (initValues && !isEmpty(initValues)) {
			initFormValues()
		}
	}, [initValues])

	// 初始化数据
	const initFormValues = () => {
		form.setFieldsValue(initValues)
	}

	return (
		<Form form={form} labelCol={{ span: 5 }} preserve={false}>
			<div className="module-container">
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'name'} label={'样机名称'} rules={[{ required: true, message: '请选择数字样机名称' }]}>
							<Select
								placeholder="请选择"
								options={[
									{ label: 'LD', value: '1' },
									{ label: 'GX', value: '2' }
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'buzType'} label={'样机类型'} rules={[{ required: true, message: '请选择智能/机能' }]}>
							<Select
								placeholder="请选择"
								options={[
									{ label: '智能', value: '1' },
									{ label: '机能', value: '2' }
								]}
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'样机描述'}>
							<Input.TextArea placeholder={'请输入'} allowClear maxLength={150} showCount />
						</Form.Item>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default forwardRef(BaseInfo)
