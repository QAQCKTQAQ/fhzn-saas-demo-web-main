import { List } from 'antd'
import { RedditOutlined } from '@ant-design/icons'
import { rdmRgbColor } from '@/utils/util'

const TestList = () => {
	const data = [
		{
			title: '破损玻璃绝缘子检测',
			des: '检测出图片中破损的绝缘子，适用于输电线路的无人巡检场景。'
		},
		{
			title: '舰船旋转框关键点检测',
			des: '舰船识别'
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
									<RedditOutlined style={{ color: rdmRgbColor() }} />
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
export default TestList
