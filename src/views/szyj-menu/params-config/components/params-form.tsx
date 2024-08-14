import { Col, Empty, Form, Input, Row, Select } from 'antd'
import { Context } from '../store/reducerContent'
import { useContext, forwardRef, useImperativeHandle, useEffect } from 'react'
import { VALUE_TYPE_MAP } from '../const'

const ParamsForm = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const { state } = useContext(Context)
	const editable = state?.editable || false
	const configInfo = state?.configInfo || []

	useImperativeHandle(ref, () => ({
		// getFormData 就是暴露给父组件的方法
		getFormData: async () => {
			return await form.validateFields().then(values => {
				return values
			})
		}
	}))

	useEffect(() => {
		form.resetFields()
		initFormData()
	}, [editable, configInfo])

	// 初始化数据
	const initFormData = () => {
		const initValues: any = {}
		;(configInfo || []).map((item: any) => {
			initValues[item.field] = item.value
		})
		form.setFieldsValue(initValues)
	}

	const config_rules: any = {
		zzOpenCount: {
			rules: [
				{
					required: true,
					type: 'number',
					min: 4,
					max: 80,
					message: '输入范围：4～80',
					transform: (value: string) => Number(value)
				}
			],
			placeholder: '输入范围：4～80'
		},
		gongzuomoshi: {
			rules: [
				{
					required: true,
					message: '请选择工作模式'
				}
			],
			placeholder: '请选择工作模式',
			options: [
				{
					label: '主动功能',
					value: 1
				},
				{
					label: '干扰功能',
					value: 2
				},
				{
					label: '被动功能',
					value: 3
				},
				{
					label: '通信功能',
					value: 4
				}
			]
		},
		dantongdaogonglv: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		duodtongxinidfenpei: {
			rules: [
				{
					required: true,
					message: '请选择多D通信ID'
				}
			],
			placeholder: '请选择多D通信ID',
			options: [
				{
					label: 'DD1',
					value: 1
				},
				{
					label: 'DD2',
					value: 4
				}
			]
		},
		zdtcfwjdz: {
			rules: [
				{
					required: true,
					message: '输入范围：-90～0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) > 0 || Number(value) < -90) {
								callback(new Error('输入范围：-90～0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：-90～0'
		},
		zdtcfwjdy: {
			rules: [
				{
					required: true,
					message: '输入范围：0～90'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) < 0 || Number(value) > 90) {
								callback(new Error('输入范围：0～90'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：0～90'
		},
		zdtcfwjdx: {
			rules: [
				{
					required: true,
					message: '输入范围：-90～0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) > 0 || Number(value) < -90) {
								callback(new Error('输入范围：-90～0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：-90～0'
		},
		zdtcfwjds: {
			rules: [
				{
					required: true,
					message: '输入范围：0～90'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) < 0 || Number(value) > 90) {
								callback(new Error('输入范围：0～90'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：0～90'
		},
		zdgzplfwzxz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
							const maxValue = form.getFieldValue('zdgzplfwzdz')
							if (Number(value) > Number(maxValue)) {
								callback(new Error('主动工作频率范围最小值必须小于等于最大值'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		zdgzplfwzdz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		grplzxz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
							const maxValue = form.getFieldValue('grplzdz')
							if (Number(value) > Number(maxValue)) {
								callback(new Error('GR频率最小值必须小于等于最大值'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		grplzdz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		bdtcfwzxz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
							const maxValue = form.getFieldValue('bdtcfwzdz')
							if (Number(value) > Number(maxValue)) {
								callback(new Error('被动探测范围最小值必须小于等于最大值'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		bdtcfwzdz: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		bdssxcfwjdz: {
			rules: [
				{
					required: true,
					message: '输入范围：-90～0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) > 0 || Number(value) < -90) {
								callback(new Error('输入范围：-90～0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：-90～0'
		},
		bdssxcfwjdy: {
			rules: [
				{
					required: true,
					message: '输入范围：0～90'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) < 0 || Number(value) > 90) {
								callback(new Error('输入范围：0～90'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：0～90'
		},
		bdgzjlsx: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
							const minValue = form.getFieldValue('bdgzjlxx')
							if (Number(value) < Number(minValue)) {
								callback(new Error('被动工作距离上限必须大于等于下限'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		bdgzjlxx: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		zdgzjlsx: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
							const minValue = form.getFieldValue('zdgzjlxx')
							if (Number(value) < Number(minValue)) {
								callback(new Error('主动工作距离上限必须大于等于下限'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		},
		zdgzjlxx: {
			rules: [
				{
					required: true,
					message: '输入范围：> 0'
				},
				{
					validator: (rule: any, value: any, callback: any) => {
						if (value) {
							if (Number(value) <= 0) {
								callback(new Error('输入范围：> 0'))
							}
						}
						callback()
					}
				}
			],
			placeholder: '输入范围：> 0'
		}
	}

	const renderFormSelectItem = (item: any) => {
		const filed: any = config_rules[item.field]
		return <Select placeholder={filed?.placeholder || '请选择'} options={filed?.options || []} allowClear disabled={!editable} />
	}

	// 渲染formItem
	const renderFormItem = (item: any) => {
		const { field, fieldCn } = item
		return (
			<Form.Item
				name={`${field}`}
				label={`${fieldCn}：`}
				rules={config_rules[field]?.rules || [{ required: true, message: '请输入' }]}
			>
				{(['gongzuomoshi', 'duodtongxinidfenpei'].includes(field) && renderFormSelectItem(item)) || (
					<Input
						placeholder={config_rules[field]?.placeholder || '请输入'}
						allowClear
						type={VALUE_TYPE_MAP[item.type] || 'text'}
						disabled={!editable}
					/>
				)}
			</Form.Item>
		)
	}

	if (configInfo && configInfo.length) {
		return (
			<div className="params-box">
				<Form form={form} style={{ width: '100%' }} labelCol={{ span: 12 }} preserve={false}>
					<Row gutter={[16, 16]}>
						{configInfo.map((item: any) => {
							return (
								<Col span={12} key={item.field}>
									{renderFormItem(item)}
								</Col>
							)
						})}
					</Row>
				</Form>
			</div>
		)
	}
	return <Empty description="暂无参数配置，请上传配置文件" />
}

export default forwardRef(ParamsForm)
