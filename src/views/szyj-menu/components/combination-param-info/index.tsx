import { Button, Descriptions, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './index.less'
const ParamInfo = () => {
	return (
		<div className="param-info">
			<div className="tool">
				<Upload name="file">
					<Button icon={<UploadOutlined />}>上传配置</Button>
				</Upload>
			</div>
			<Descriptions bordered column={2}>
				<Descriptions.Item label="探测角度">90°</Descriptions.Item>
				<Descriptions.Item label="探测范围">18KM2</Descriptions.Item>
				<Descriptions.Item label="频率测量精度">19MHZ</Descriptions.Item>
				<Descriptions.Item label="脉宽测量精度">US</Descriptions.Item>
				<Descriptions.Item label="中频道数">17MHZ</Descriptions.Item>
				<Descriptions.Item label="天线方向图">方向图一</Descriptions.Item>
				<Descriptions.Item label="工作频率">16MHZ</Descriptions.Item>
				<Descriptions.Item label="重频测量精度">12KHZ</Descriptions.Item>
				<Descriptions.Item label="天线布局方式">布局口面</Descriptions.Item>
			</Descriptions>
		</div>
	)
}

export default ParamInfo
