/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-20 16:37:46
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-15 15:20:38
 */
import { useContext } from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreateDataSetModal from './creat-data-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREAT_DATA_MODAL } from '../const'
import Auth from '@/components/auth'

export default function Tool() {
	const { queryList } = useContext(Context)
	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Space>
						<Auth requires="DATA_MANAGE_DS_ADD_DATA_SET">
							<Button
								onClick={() => {
									PubSub.publish(ASYNC_SUBSCRIBE_CREAT_DATA_MODAL)
								}}
								icon={<PlusOutlined />}
								type="primary"
							>
								创建数据集
							</Button>
						</Auth>
					</Space>
				</div>
			</div>
			<CreateDataSetModal
				onOK={() => {
					queryList({})
				}}
			/>
		</>
	)
}
