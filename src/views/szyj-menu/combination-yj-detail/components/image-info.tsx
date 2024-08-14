import { Button, Card, Table, Space } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons'
import ldIcon from '@/assets/images/ld-icon.png'
import photicsIcon from '@/assets/images/photics-icon.png'
import fuseIcon from '@/assets/images/fuse-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import DDCase from '../../combination-config/components/case-view'
import { MKYJListData } from '@/api/mock/szyj-manage'

const ImageInfo = () => {
	const navigate = useNavigate()

	const configNameIcon: any = {
		LD: ldIcon,
		GX: photicsIcon,
		RH: fuseIcon
	}

	const columns: any = [
		{
			dataIndex: 'name',
			title: '名称',
			render: (text: string, record: any) => {
				const { type } = record
				const icon = configNameIcon[type]
				return (
					<div className="name-icon">
						{(icon && <img src={icon} width={16} />) || <FolderOpenOutlined style={{ marginRight: '8px' }} />}
						{text}
					</div>
				)
			}
		},
		{
			dataIndex: 'comment',
			title: '描述'
		},
		{
			dataIndex: 'updatedTime',
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
					<Link to="/szyj-menu/params-config" target="_blank">
						参数配置
					</Link>
				</span>
			)
		}
	}

	return (
		<div className="image-info">
			<Card
				title="组合信息"
				bordered={false}
				extra={
					<Space>
						<Button onClick={() => navigate('/szyj-menu/combination-config')}>组合配置</Button>
						<Button onClick={() => navigate('/szyj-menu/deploy-config')}>部署配置</Button>
					</Space>
				}
			>
				<div className="dd-info">
					<DDCase checkedKeys={['0-0-1', '0-0-2', '0-1-1', '0-1-2', '0-2-1']} />
				</div>
				<Table
					rowKey="id"
					columns={[...columns, operateColumn]}
					dataSource={MKYJListData.items}
					scroll={{ x: 'max-content' }}
					pagination={false}
				/>
			</Card>
		</div>
	)
}

export default ImageInfo
