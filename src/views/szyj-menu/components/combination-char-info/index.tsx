import { Form, Button, Descriptions, Space, Table } from 'antd'
import './index.less'
import { PlusOutlined, FileZipOutlined } from '@ant-design/icons'

const CombinationCharInfo = () => {
	const [form] = Form.useForm()

	const dataSource = [
		{
			name: 'LD识别算法YJ1',
			comment: '该算法主要是用于某种识别',
			createTime: '2022-06-23 15:06:00',
			creator: '司工'
		}
	]

	const columns: any = [
		{
			dataIndex: 'name',
			title: '名称',
			render: (text: any) => {
				return (
					<Space>
						<FileZipOutlined />
						{text}
					</Space>
				)
			}
		},
		{
			dataIndex: 'createTime',
			title: '创建时间'
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		}
	]

	return (
		<Form form={form} labelCol={{ span: 6 }} preserve={false}>
			<div className="combination-char-info-box">
				<div className="header-title">
					关键参数 <Button icon={<PlusOutlined />}>上传配置</Button>
				</div>
				<div className="module-container">
					<Descriptions bordered column={3} style={{ width: '100%', marginBottom: '24px' }}>
						<Descriptions.Item label="最小速度">680km/h</Descriptions.Item>
						<Descriptions.Item label="最大速度">6.80km/h</Descriptions.Item>
						<Descriptions.Item label="翼展">20m</Descriptions.Item>
						<Descriptions.Item label="高度">8m</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
			<div className="combination-char-info-box">
				<div className="header-title">
					特性信息 <Button icon={<PlusOutlined />}>上传</Button>
				</div>
				<div className="module-container">
					<Table
						style={{ width: '100%', marginBottom: '24px' }}
						rowKey="id"
						columns={columns}
						dataSource={dataSource}
						scroll={{ x: 'max-content' }}
						pagination={false}
					/>
				</div>
			</div>
		</Form>
	)
}

export default CombinationCharInfo
