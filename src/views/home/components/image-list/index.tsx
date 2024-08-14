import { List } from 'antd'
import { SlackOutlined } from '@ant-design/icons'
import { rdmRgbColor } from '@/utils/util'

const ImageList = () => {
	const data = [
		{
			title: 'yolo8通用框架-V2',
			des: '基于ultralytics:8.0.166，进行配置修改和模型文件预置'
		},
		{
			title: '边坡检测',
			des: '舰船旋转框关键点检测基础镜像'
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
									<SlackOutlined style={{ color: rdmRgbColor() }} />
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
export default ImageList
