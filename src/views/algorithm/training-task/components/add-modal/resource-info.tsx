import { Form, Row, Col, Input, InputNumber, Radio } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const ResourceInfo = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const [noteType, setNoteType] = useState('CPU')
	const { initValues } = props

	useEffect(() => {
		initValues && initFormValues()
	}, [initValues])

	const initFormValues = () => {
		const gpu = initValues?.resources?.gpu
		gpu && setNoteType('GPU')
		form.setFieldsValue(initValues)
	}

	useImperativeHandle(ref, () => ({
		// onCallback 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => values)
		}
	}))

	const noteTypeChange = (e: any) => {
		setNoteType(e.target.value)
	}

	return (
		<Form form={form} labelCol={{ span: 4 }} preserve={false}>
			<Row gutter={12}>
				<Col span={24}>
					<Form.Item label={'节点类型'}>
						<Radio.Group onChange={noteTypeChange} value={noteType}>
							<Radio value={'CPU'}>CPU</Radio>
							<Radio value={'GPU'}>GPU</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label={'节点数量'}>
						<InputNumber disabled placeholder="请输入" defaultValue={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item label={'节点规格'}>
						<Row gutter={12}>
							<Col span={8}>
								<Form.Item name={['resources', 'cpu']}>
									<Input addonAfter="CPU" placeholder="请输入" />
								</Form.Item>
							</Col>
							{noteType === 'GPU' && (
								<Col span={8}>
									<Form.Item name={['resources', 'gpu']}>
										<Input addonAfter="GPU" placeholder="请输入" />
									</Form.Item>
								</Col>
							)}

							<Col span={8}>
								<Form.Item name={['resources', 'memory']}>
									<Input addonAfter="GB内存" placeholder="请输入" />
								</Form.Item>
							</Col>
						</Row>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default forwardRef(ResourceInfo)
