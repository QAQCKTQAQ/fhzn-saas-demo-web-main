import { useContext } from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './add-modal'
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
							创建训练任务
						</Button>
					</Space>
				</div>
			</div>
			<AddModal
				onOK={() => {
					queryList({})
				}}
			/>
		</>
	)
}
