import { useContext } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UseModal from './tag-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import Auth from '@/components/auth'

export default function Tool() {
	const { queryList } = useContext(Context)

	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Auth requires="SYSTEM_SETTINGS_USER_ADD">
						<Button
							onClick={() => {
								PubSub.publish(ASYNC_SUBSCRIBE_MODAL)
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							添加标签
						</Button>
					</Auth>
				</div>
			</div>
			<UseModal
				onOK={() => {
					queryList({})
				}}
			/>
		</>
	)
}
