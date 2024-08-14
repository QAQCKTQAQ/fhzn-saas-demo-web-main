import { Form, Row, Col, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
// import dd from '@/assets/images/tpt/dd.png'
// import { useEffect } from 'react'

const BaseInfo = () => {
	const [form] = Form.useForm()

	// 初始化数据
	const initialValues: any = {
		image: [
			// 这里设置默认图片的信息，可以是服务器返回的文件信息
			{
				uid: '1',
				status: 'done',
				url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlspg5bP2EUbpevdRe4XBGH_Ma5AO6bBGp6g&usqp=CAU'
			}
			// 可以添加多个默认图片
		]
	}
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	return (
		<Form form={form} initialValues={initialValues} labelCol={{ span: 8 }} preserve={false}>
			<div className="module-container">
				<Row gutter={12}>
					<Col span={24}>
						<Form.Item name={'image'} label={'图片上传'} rules={[{ required: true, message: '请选择图片上传' }]}>
							<Upload
								name="avatar"
								maxCount={1}
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={true}
								defaultFileList={initialValues.image}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							>
								{uploadButton}
							</Upload>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'name'} label={'组合实例YJ名称'} rules={[{ required: true, message: '请输入组合实例YJ名称' }]}>
							<Input placeholder={'请输入'} allowClear maxLength={15} showCount />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'comment'} label={'描述'}>
							<Input.TextArea placeholder={'请输入'} allowClear maxLength={150} showCount />
						</Form.Item>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default BaseInfo
