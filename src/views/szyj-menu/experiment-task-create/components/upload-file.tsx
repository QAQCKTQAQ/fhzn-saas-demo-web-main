/* eslint-disable react/display-name */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 11:43:41
 * @LastEditors: ZeroSi
 * @LastEditTime: 2023-11-06 11:18:01
 */
import { Form, Row, Col } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import UploadFile from '@/components/upload-file'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'

const UploadFileCom = forwardRef((props: any, ref: any) => {
	const [form] = Form.useForm()
	const { submit } = props
	const [fileNoList, setFileNoList] = useState<any[]>([])
	console.log(fileNoList)
	// 上传文件变更
	const onChange = (data: any) => {
		setFileNoList(data)
	}
	//暴露给父组件的方法以及数据
	useImperativeHandle(ref, () => ({
		validateForm
	}))

	const validateForm = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		console.log(values)
		submit()
	}
	return (
		<Form form={form} labelCol={{ span: 6 }} preserve={false}>
			<div className="module-container">
				<Row className="width-50">
					<Col span={24}>
						<Form.Item label={'上传预案'} name="reservePlan" rules={[{ required: false, message: '' }]}>
							<UploadFile maxCount="10" onChange={onChange} sourceType={UPLOAD_SOURCE_ENUM.CODE}></UploadFile>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'上传想定文件'} name="scenario" rules={[{ required: true, message: '请上传想定文件' }]}>
							<UploadFile maxCount="10" onChange={onChange} sourceType={UPLOAD_SOURCE_ENUM.CODE}></UploadFile>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'上传编演文件'} name="drilling" rules={[{ required: true, message: '请上传编演文件' }]}>
							<UploadFile maxCount="10" onChange={onChange} sourceType={UPLOAD_SOURCE_ENUM.CODE}></UploadFile>
						</Form.Item>
					</Col>
				</Row>
			</div>
		</Form>
	)
})

export default UploadFileCom
