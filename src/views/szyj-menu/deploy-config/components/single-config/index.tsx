import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import './index.less'
import ldIcon from '@/assets/images/ld-icon.png'
import photicsIcon from '@/assets/images/photics-icon.png'
import fuseIcon from '@/assets/images/fuse-icon.png'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

const SingleConfig = (props: any) => {
	const { config } = props

	const [editable, setEditable] = useState(false)

	const [form] = Form.useForm()

	const configNameIcon: any = {
		LD: ldIcon,
		GX: photicsIcon,
		RH: fuseIcon
	}

	const renderTitle = () => {
		return (
			<div className="component-single-confi-title">
				<img src={configNameIcon[config.type]} style={{ width: '20px' }} />
				{config.name}
			</div>
		)
	}

	const extraBtn = () => {
		if (editable) {
			return (
				<>
					<Button type="text" onClick={() => setEditable(false)}>
						取消
					</Button>
					<Button type="link">保存</Button>
				</>
			)
		}
		return (
			<Button icon={<EditOutlined />} onClick={() => setEditable(true)} type="link">
				配置
			</Button>
		)
	}

	return (
		<Card title={renderTitle()} className="component-single-config" extra={extraBtn()}>
			<Form form={form} labelCol={{ span: 6 }} preserve={false}>
				<Row>
					<Col span={24}>
						<Form.Item name={'type'} label={'节点类型'} rules={[{ required: true, message: '请选择节点类型' }]}>
							{(editable && <Select placeholder={'请选择'} allowClear />) || 'GPU'}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'size'} label={'节点规格'} rules={[{ required: true, message: '请选择节点规格' }]}>
							{(editable && <Input placeholder={'请选择'} allowClear />) || '1GPU 1CPU 2G内存'}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name={'num'} label={'节点数量'} rules={[{ required: true, message: '请输入节点数量' }]}>
							{(editable && <Input placeholder={'请输入'} allowClear />) || 1}
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export default SingleConfig
