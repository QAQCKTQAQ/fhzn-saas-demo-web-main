import { Space, Table, Button, message, Card, Descriptions } from 'antd'
import { FileZipOutlined, UploadOutlined } from '@ant-design/icons'
import { ASYNC_SUBSCRIBE_CHARACTER_FILE_MODAL } from '../const'
import PubSub from 'pubsub-js'

const CharacterInfo = () => {
	const dataSource = [
		{
			name: '特性文件',
			comment: 'DD的特性文件',
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

	const operateColumn: any = {
		title: '操作',
		render: () => {
			return (
				<span className="actions">
					<a
						onClick={() => {
							message.success('下载成功！')
						}}
					>
						查看
					</a>
				</span>
			)
		}
	}

	return (
		<div className="character-info">
			<Card title="关键参数" bordered={false} extra={<Button icon={<UploadOutlined />}>上传</Button>}>
				<Descriptions bordered column={3} style={{ width: '100%', marginBottom: '24px' }}>
					<Descriptions.Item label="最小速度">680km/h</Descriptions.Item>
					<Descriptions.Item label="最大速度">6.80km/h</Descriptions.Item>
					<Descriptions.Item label="翼展">20m</Descriptions.Item>
					<Descriptions.Item label="高度">8m</Descriptions.Item>
				</Descriptions>
			</Card>
			<Card
				title="特性文件"
				bordered={false}
				extra={
					<Button icon={<UploadOutlined />} onClick={() => PubSub.publishSync(ASYNC_SUBSCRIBE_CHARACTER_FILE_MODAL)}>
						上传
					</Button>
				}
			>
				<Table
					rowKey="id"
					columns={[...columns, operateColumn]}
					dataSource={dataSource}
					scroll={{ x: 'max-content' }}
					pagination={false}
				/>
			</Card>
		</div>
	)
}

export default CharacterInfo
