/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-10 14:29:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-27 14:06:14
 */
import { Form, Input } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'

// 基础信息
export default function BaseInfo() {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}

	return (
		<div className="side-left">
			<div className="header-title">基础信息</div>
			<Form preserve={false}>
				<Form.Item name={'name'} label={'任务名称:'}>
					{detailData.name}
				</Form.Item>
				<Form.Item label={'创建用户:'}> {detailData.creator}</Form.Item>
				<Form.Item label={'创建时间:'}>{detailData.createdTime} </Form.Item>
				<Form.Item label={'任务描述:'} className="comment">
					<Input.TextArea disabled value={detailData.comment} />
				</Form.Item>
			</Form>
		</div>
	)
}
