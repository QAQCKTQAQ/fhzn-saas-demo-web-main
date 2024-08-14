/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-11 11:31:34
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-17 14:14:43
 */
/* eslint-disable react/display-name */
import { Form, Row, Col, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
// import szyjMask from '@/assets/images/szyj/szyjMask.jpg'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { url } from './mock'
const BaseInfo = forwardRef((props: any, ref: any) => {
	const { submit } = props
	const [form] = Form.useForm()
	//暴露给父组件的方法以及数据
	useImperativeHandle(ref, () => ({
		validateForm
	}))

	// const uploadButton = (
	// 	<div>
	// 		<PlusOutlined />
	// 		<div style={{ marginTop: 8 }}>Upload</div>
	// 	</div>
	// )
	const validateForm = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		console.log(values)
		submit(values)
	}
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: url
		}
	])

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj as RcFile)
				reader.onload = () => resolve(reader.result as string)
			})
		}
		const image = new Image()
		image.src = src
		const imgWindow = window.open(src)
		imgWindow?.document.write(image.outerHTML)
	}

	return (
		<Form form={form} labelCol={{ span: 6 }} preserve={false}>
			<div className="module-container">
				<Row gutter={12} className="width-50">
					<Col span={24}>
						<Form.Item
							label="图片上传"
							initialValue={fileList}
							name="fileList"
							rules={[{ required: true, message: '请选择图片上传' }]}
						>
							<Upload
								action="/upload.do"
								fileList={fileList}
								showUploadList={true}
								listType="picture-card"
								maxCount={1}
								onChange={onChange}
								onPreview={onPreview}
							>
								<div>
									<PlusOutlined />
									<div style={{ marginTop: 8 }}>Upload</div>
								</div>
							</Upload>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'name'} label={'试验任务名称'} rules={[{ required: true, message: '请输入试验任务名称' }]}>
							<Input placeholder={'请输入试验任务名称'} allowClear maxLength={15} showCount />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入描述'} allowClear maxLength={150} showCount />
						</Form.Item>
					</Col>
				</Row>
			</div>
		</Form>
	)
})

export default BaseInfo
