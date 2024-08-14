/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 14:19:48
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-20 16:23:55
 */
import React, { forwardRef, useImperativeHandle } from 'react'
import SelectMultiple from '../select-mutiple'
import RangeDate from '../date-multiple'
import DoubleInputPiece from '../double-input-piece'
import InputSingle from '../input-single'
import { Form, Col } from 'antd'
function MultipleLeftSearch(props: any, ref: any) {
	const [form] = Form.useForm()
	const { formData = [], ...rest } = props
	useImperativeHandle(ref, () => ({
		// getFormData 就是暴露给父组件的方法
		getFormData: async () => {
			let values: any = await form.getFieldsValue()
			return values
		},
		resetForm: () => {
			form.resetFields()
		}
	}))
	// 表单字段组件
	const renderItem = (item: any) => {
		const { type, fieldCn, frontType, field, ...rest } = item
		if (frontType === 'select') {
			return (
				<Form.Item span={24} label={fieldCn} name={field} {...rest}>
					<SelectMultiple field={field} fieldCn={fieldCn} options={item.options} type={type} />
				</Form.Item>
			)
		}
		if (frontType === 'input') {
			return (
				<Form.Item span={24} label={fieldCn} name={field} {...rest}>
					<InputSingle field={field} fieldCn={fieldCn} type={type} />
				</Form.Item>
			)
		}
		if (frontType === 'inputRange') {
			return (
				<Form.Item span={24} label={fieldCn} name={field} {...rest}>
					<DoubleInputPiece field={field} fieldCn={fieldCn} type={type} />
				</Form.Item>
			)
		}
		if (frontType === 'date') {
			return (
				<Form.Item span={24} label={fieldCn} name={field} {...rest}>
					<RangeDate field={field} fieldCn={fieldCn} type={type} />
				</Form.Item>
			)
		}
	}
	// 渲染整个Form
	const renderFormItems = (items: any[]) => {
		return items.map((item: any) => {
			return (
				<Col span={24} key={item.field}>
					{renderItem(item)}
				</Col>
			)
		})
	}
	return (
		<div>
			<Form form={form} labelCol={{ xs: { span: 24 }, sm: { span: 9 } }} {...rest}>
				{renderFormItems(formData)}
			</Form>
		</div>
	)
}
export default forwardRef(MultipleLeftSearch)
