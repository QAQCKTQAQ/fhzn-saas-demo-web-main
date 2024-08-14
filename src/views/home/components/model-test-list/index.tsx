import { List } from 'antd'
import { RobotOutlined } from '@ant-design/icons'
import { rdmRgbColor } from '@/utils/util'

const ModelTestList = () => {
	const data = [
		{
			title: '破损玻璃绝缘子检测',
			des: '验证检测出图片中破损的绝缘子，适用于输电线路的无人巡检场景。'
		},
		{
			title: '舰船旋转框关键点检测',
			des: '验证舰船识别，输入指标'
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
									<RobotOutlined style={{ color: rdmRgbColor() }} />
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
export default ModelTestList
