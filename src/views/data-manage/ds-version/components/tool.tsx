/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-02 09:53:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-01 15:00:41
 */
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL } from '../const'
import Auth from '@/components/auth'

export default function Tool() {
	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Auth requires="DATA_MANAGE_DS_ADD_DATA_SET">
						<Button
							onClick={() => {
								PubSub.publish(ASYNC_SUBSCRIBE_CREAT_VERSION_MODAL)
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							创建新版本
						</Button>
					</Auth>
				</div>
			</div>
		</>
	)
}
