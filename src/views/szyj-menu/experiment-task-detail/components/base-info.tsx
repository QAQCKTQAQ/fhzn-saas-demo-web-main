/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 17:45:30
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-16 18:17:06
 */
import { Descriptions } from 'antd'
const BaseInfo = () => {
	const getUrlParams = () => {
		const searchParams = new URLSearchParams(window.location.search)
		const params: any = {}
		for (const [key, value] of searchParams) {
			params[key] = value
		}
		return params
	}

	const baseInfo = getUrlParams()

	return (
		<div className="base-info">
			<Descriptions bordered className="descriptions" column={3}>
				<Descriptions.Item label="试验名称">{baseInfo?.name || '--'}</Descriptions.Item>
				<Descriptions.Item label="创建用户">--</Descriptions.Item>
				<Descriptions.Item label="试验平台">--</Descriptions.Item>
				<Descriptions.Item label="试验创建时间">{baseInfo?.createdTime || '--'}</Descriptions.Item>
				<Descriptions.Item label="试验开始时间">{baseInfo?.startTime || '--'}</Descriptions.Item>
				<Descriptions.Item label="试验结束时间">{baseInfo?.endTime || '--'}</Descriptions.Item>
			</Descriptions>
		</div>
	)
}

export default BaseInfo
