import { Image, Descriptions, Card, Button, Space, Form, Input, Select, message } from 'antd'
import rocket from '@/assets/images/mock/rocket.jpg'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

const BaseInfo = () => {
	const [editable, setEditable] = useState(false)
	const [form] = Form.useForm()

	const itemStyle = {
		width: '200px'
	}

	const editRender = () => {
		if (editable) {
			return (
				<Space>
					<Button type="primary" onClick={saveData}>
						保存
					</Button>
					<Button onClick={() => setEditable(false)}>取消</Button>
				</Space>
			)
		}
		return (
			<Button icon={<EditOutlined />} onClick={() => setEditable(true)}>
				编辑
			</Button>
		)
	}

	const configParams = [
		{
			name: '组合YJ名称',
			key: 'name',
			value: 'LD识别YJ1',
			type: 'input'
		},
		{
			name: '描述',
			key: 'commont',
			value: 'LD识别目标',
			type: 'input'
		}
	]

	const renderFormItem = (item: any) => {
		const { value, type, options } = item
		if (editable) {
			if (type === 'input') {
				return <Input placeholder="请输入" allowClear />
			}
			if (type === 'select') {
				return <Select placeholder="请选择" allowClear options={options} />
			}
		}
		return value
	}

	const saveData = () => {
		message.success('保存成功！')
		setEditable(false)
	}

	return (
		<Card title="基础信息" bordered={false} extra={editRender()}>
			<div className="base-info">
				<Image src={rocket} className="image-icon" />
				<Form form={form} style={{ width: '100%' }} labelCol={{ span: 6 }} preserve={false}>
					<Descriptions className="descriptions" bordered column={1}>
						{configParams.map((item: any) => {
							return (
								<Descriptions.Item label={item.name} labelStyle={itemStyle} key={item.key}>
									<Form.Item name={[item.key]}>{renderFormItem(item)}</Form.Item>
								</Descriptions.Item>
							)
						})}
					</Descriptions>
				</Form>
			</div>
		</Card>
	)
}

export default BaseInfo
