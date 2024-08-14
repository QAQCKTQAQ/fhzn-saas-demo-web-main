/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 16:37:46
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-21 17:45:21
 */
import { useContext } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ResourceModal from './resource-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_RESOURCE_MODAL } from '../const'
import Auth from '@/components/auth'

export default function Tool() {
	const { queryList } = useContext(Context)

	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Auth requires="SYSTEM_SETTINGS_RESOURCE_ADD">
						<Button
							onClick={() => {
								PubSub.publish(ASYNC_SUBSCRIBE_RESOURCE_MODAL)
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							新建
						</Button>
					</Auth>
				</div>
			</div>
			<ResourceModal
				onOK={() => {
					queryList({})
				}}
			/>
		</>
	)
}
