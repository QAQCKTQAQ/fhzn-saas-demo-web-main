import { useContext, useEffect } from 'react'
import { Button, Modal, Space, message } from 'antd'
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons'
import FilesModal from './files-modal'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL, ASYNC_SUBSCRIBE_SAVE_DATA_SET_MODAL, ASYNC_SUBSCRIBE_UPLOAD_MODAL } from '../const'
import { deleteFilesApi, getFilesTypeApi } from '@/api/modules/data-manage'
import { FOLDER_TYPE_ENUM } from '@/const/constants'
import UploadModal from './upload-modal/index'
import CreateDataSetModal from './data-set-modal'

export default function Tool() {
	const {
		queryList,
		state: { selectedRowKeys, folderType },
		setSelectedRowKeys,
		routerId,
		setFolderType
	} = useContext(Context)

	useEffect(() => {
		getFilesType()
	}, [routerId])

	// 获取当前文件类型，目前只需要有一种类型，联动操作按钮
	const getFilesType = () => {
		getFilesTypeApi(routerId).then(res => {
			const type = (res && `${res}`) || FOLDER_TYPE_ENUM.EMPTY
			setFolderType(type)
		})
	}

	const patchDelete = () => {
		Modal.confirm({
			title: '提示',
			content: '是否确认删除？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				deleteFilesApi({ ids: selectedRowKeys }).then(() => {
					message.success('操作成功！')
					setSelectedRowKeys([])
					queryList({})
				})
			}
		})
	}

	const fileRenderTool = () => {
		if (folderType !== FOLDER_TYPE_ENUM.FOLDER) {
			return (
				<>
					<Button
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_UPLOAD_MODAL, {
								title: '上传文件',
								id: routerId,
								isAnnotation: false
							})
						}}
						icon={<CloudUploadOutlined />}
						type="primary"
					>
						上传文件
					</Button>
					<Button
						onClick={() => {
							PubSub.publish(ASYNC_SUBSCRIBE_UPLOAD_MODAL, {
								title: '上传标注文件',
								id: routerId,
								isAnnotation: true
							})
						}}
						icon={<CloudUploadOutlined />}
						type="primary"
					>
						上传标注文件
					</Button>
				</>
			)
		}
		return null
	}

	const folderRenderTool = () => {
		if (folderType !== FOLDER_TYPE_ENUM.FILES) {
			return (
				<Button
					onClick={() => {
						PubSub.publish(ASYNC_SUBSCRIBE_MODAL)
					}}
					icon={<PlusOutlined />}
					type="primary"
				>
					创建文件夹
				</Button>
			)
		}
		return null
	}

	const onOk = () => {
		if (!folderType || folderType === FOLDER_TYPE_ENUM.EMPTY) {
			getFilesType()
		}
		queryList({})
	}

	const saveDataSet = () => {
		PubSub.publish(ASYNC_SUBSCRIBE_SAVE_DATA_SET_MODAL)
	}

	if (folderType) {
		return (
			<>
				<div className="m-transfer-table-tool-wrapper">
					<div className="button">
						<Space>
							{folderRenderTool()}
							{fileRenderTool()}
							<Button onClick={saveDataSet} disabled={!selectedRowKeys.length} type="primary">
								保存为数据集
							</Button>
							<Button onClick={patchDelete} disabled={!selectedRowKeys.length} type="primary" danger>
								批量删除
							</Button>
						</Space>
					</div>
				</div>
				<FilesModal parentId={routerId} onOK={onOk} />
				<UploadModal onOK={onOk} />
				<CreateDataSetModal selectedRowKeys={selectedRowKeys} onOK={() => setSelectedRowKeys([])} folderType={folderType} />
			</>
		)
	}
	return null
}
