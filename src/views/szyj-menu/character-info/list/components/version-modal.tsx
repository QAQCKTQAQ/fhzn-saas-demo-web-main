import { useEffect, useRef, useState } from 'react'
import { Modal, Table } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_VERSION_MODAL } from '../const'
import { characterInfoVersionListApi } from '@/api/modules/szyj-manage'
import { Link } from 'react-router-dom'

function VersionModal() {
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [dataSource, setDataSource] = useState([])
	const currentRecord: any = useRef()

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_VERSION_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_VERSION_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setLoading(false)
		currentRecord.current = data
		getVersionLists()
	}

	const getVersionLists = () => {
		const { id } = currentRecord.current || {}
		characterInfoVersionListApi(id).then((res: any) => {
			setDataSource(res || [])
		})
	}

	const hideModal = () => {
		setVisible(false)
	}

	const columns: any = [
		{
			dataIndex: 'version',
			title: '版本号'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		}
	]

	const operateColumn = {
		title: '操作',
		render: (text: any, record: any) => {
			const { id } = currentRecord.current || {}
			const { version } = record
			return (
				<span className="actions">
					<Link to={`/szyj-menu/character-info/detail/${id}?version=${version}`}>查看</Link>
				</span>
			)
		}
	}

	return (
		<Modal
			width="500px"
			title={'历史版本'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			onOk={hideModal}
		>
			<Table
				size="small"
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
				loading={loading}
				pagination={false}
			/>
		</Modal>
	)
}

export default VersionModal
