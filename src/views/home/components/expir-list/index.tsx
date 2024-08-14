import { List } from 'antd'
import { RocketOutlined } from '@ant-design/icons'
import { rdmRgbColor } from '@/utils/util'

const ExpirList = () => {
	const data = [
		{
			title: '仿真试验',
			des: '通过仿真平台验证算法模型'
		},
		{
			title: '飞行试验',
			des: '验证算法模型'
		}
	]

	return (
		<div className="list-box">
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							avatar={
								<div className="avatar-icon">
									<RocketOutlined style={{ color: rdmRgbColor() }} />
								</div>
							}
							title={<span>{item.title}</span>}
							description={item.des}
						/>
					</List.Item>
				)}
			/>
		</div>
	)
}
export default ExpirList
