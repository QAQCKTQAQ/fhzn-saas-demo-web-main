/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-15 17:21:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-16 14:07:29
 */
import { useContext } from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreatModal from './creat-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CRAET_MODAL } from '../const'

export default function Tool() {
	const { queryList } = useContext(Context)

	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Space>
						<Button
							onClick={() => {
								PubSub.publish(ASYNC_SUBSCRIBE_CRAET_MODAL)
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							创建测试任务
						</Button>
					</Space>
				</div>
			</div>
			<CreatModal
				onOK={() => {
					queryList({})
				}}
			/>
		</>
	)
}
