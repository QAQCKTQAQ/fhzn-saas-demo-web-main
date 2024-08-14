import { useContext } from 'react'
import { Button, Modal, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CharacterModal from './character-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import { deleteCharacterInfoApi } from '@/api/modules/szyj-manage'

export default function Tool() {
	const {
		queryList,
		state: { selectedRowKeys, selectNode },
		setSelectedRowKeys
	} = useContext(Context)

	const patchDelete = () => {
		Modal.confirm({
			title: '提示',
			content: '是否确认删除？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				deleteCharacterInfoApi({ ids: selectedRowKeys }).then(() => {
					message.success('操作成功！')
					setSelectedRowKeys([])
					queryList({})
				})
			}
		})
	}

	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Space>
						{(selectNode?.isLeaf && (
							<Button
								onClick={() => {
									PubSub.publish(ASYNC_SUBSCRIBE_MODAL)
								}}
								icon={<PlusOutlined />}
								type="primary"
							>
								创建
							</Button>
						)) ||
							null}

						{/* <Button disabled={!selectedRowKeys?.length} type="primary">
							下载
						</Button> */}
						<Button disabled={!selectedRowKeys?.length} onClick={patchDelete} type="primary" danger>
							批量删除
						</Button>
					</Space>
				</div>
			</div>
			<CharacterModal
				onOK={() => {
					queryList({})
				}}
				selectNode={selectNode}
			/>
		</>
	)
}
