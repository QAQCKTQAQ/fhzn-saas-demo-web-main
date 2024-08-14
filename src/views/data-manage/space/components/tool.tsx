import { useContext } from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import UseModal from './files-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'

export default function Tool() {
	const { queryList } = useContext(Context)

	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Space>
						<Button
							onClick={() => {
								PubSub.publish(ASYNC_SUBSCRIBE_MODAL)
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							创建空间
						</Button>
					</Space>
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
