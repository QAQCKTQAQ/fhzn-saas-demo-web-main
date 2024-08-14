/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-21 14:59:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-07 13:52:21
 */
import { Button, Modal, message, Input, Dropdown, Row } from 'antd'
import {
	FolderAddOutlined,
	CloudUploadOutlined,
	CheckSquareOutlined,
	MinusSquareOutlined,
	SearchOutlined,
	DeleteOutlined,
	SaveOutlined,
	FolderOpenOutlined,
	FolderOutlined,
	FlagOutlined
} from '@ant-design/icons'
import { Context } from '../store/reducerContent'
import { useContext, useEffect, useState } from 'react'
import { ASYNC_SUBSCRIBE_FILEFOLDER_MODAL, ASYNC_SUBSCRIBE_UPLOAD_MODAL } from '../const'
import { SAVE_DATA_SET_MODAL } from '@/const/constants'
import FilesModal from './files-modal'
import UploadModal from './upload-modal/index'
import SaveDataSetModal from '@/components/business/save-dataset-modal'
import { deleteFilesApi } from '@/api/modules/data-manage'
import { debounce } from 'lodash'
import type { MenuProps } from 'antd'
import BreadcrumbSpace from './breadcrumb-space'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
import { spaceTypeName } from '../const'

const items: MenuProps['items'] = [
	{ key: '1', label: '上传文件夹', icon: <FolderOpenOutlined /> },
	{ key: '2', label: '上传文件', icon: <FolderOutlined /> },
	{ key: '3', label: '上传标注文件', icon: <FlagOutlined /> }
]

export default function Tool() {
	const {
		state: {
			selectNode,
			fileFolderIdList,
			checkBoxList,
			list: { dataSource }
		},
		setCheckBoxList,
		setFileFolderIdList,
		queryList
	} = useContext(Context)
	const [uploadLabel, setUploadLabel] = useState<any>('')

	// 监听selectNode
	useEffect(() => {
		setFileFolderIdList([])
		setCheckBoxList([])
	}, [selectNode])
	// 面包屑
	const renderRoute = () => {
		let str: any = ''
		fileFolderIdList?.length &&
			fileFolderIdList.map((item: any) => {
				str = `${str}${item.name}/`
			})
		return `${selectNode?.title}/${str}`
	}
	// 全选
	const checkAll = () => {
		let data: any = []
		if (checkBoxList.length < dataSource.length) {
			dataSource.map((item: any) => {
				data.push(item.id)
			})
			return setCheckBoxList(data)
		}
		return setCheckBoxList([])
	}

	const patchDelete = () => {
		Modal.confirm({
			title: '提示',
			content: '是否确认删除？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				deleteFilesApi({ ids: checkBoxList }).then(() => {
					message.success('操作成功！')
					setCheckBoxList([])
					LogReport(
						OPERATION_ENUM?.COMMON?.DELETE,
						`数据空间-${spaceTypeName[selectNode?.spaceType || '-']}空间：${
							fileFolderIdList?.length ? renderRoute() : `${selectNode?.title}/`
						}删除数据`
					)
					onOk()
				})
			}
		})
	}
	const onOk = () => {
		queryList({
			page: 1,
			parentId:
				fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId
		})
	}
	// 新建文件夹回调
	const onFilesOk = (data: any) => {
		LogReport(
			OPERATION_ENUM?.COMMON?.ADD,
			`数据空间-${spaceTypeName[selectNode?.spaceType || '-']}空间：${
				fileFolderIdList?.length ? renderRoute() : `${selectNode?.title}/`
			}新建“${data?.name}”文件夹`
		)
	}
	// 上传回调
	const onUploadOk = () => {
		onOk()
		LogReport(
			OPERATION_ENUM?.COMMON?.ADD,
			`数据空间-${spaceTypeName[selectNode?.spaceType || '-']}空间：${
				fileFolderIdList?.length ? renderRoute() : `${selectNode?.title}/`
			}${uploadLabel}`
		)
	}
	// 保存数据集回调
	const onDataSetOk = () => {
		LogReport(
			OPERATION_ENUM?.DATA_SET?.SAVE_DATA_SET,
			`数据空间-${spaceTypeName[selectNode?.spaceType || '-']}空间：${
				fileFolderIdList?.length ? renderRoute() : `${selectNode?.title}/`
			}保存数据集`
		)
	}
	const listSearch = (value: any) => {
		queryList({
			page: 1,
			name: value.target.value,
			parentId:
				fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId
		})
	}

	const onClick: MenuProps['onClick'] = (e: any) => {
		let key: any = e?.key
		items?.map((item: any) => {
			if (key == item.key) {
				setUploadLabel(item.label)
			}
		})
		if (key === '1') {
			// 上传文件夹
			PubSub.publish(ASYNC_SUBSCRIBE_UPLOAD_MODAL, {
				title: '上传文件夹',
				id: fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId,
				isAnnotation: false,
				folder: true
			})
		}
		if (key === '2') {
			// 上传文件
			PubSub.publish(ASYNC_SUBSCRIBE_UPLOAD_MODAL, {
				title: '上传文件',
				id: fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId,
				isAnnotation: false,
				folder: false
			})
		}
		if (key === '3') {
			// 上传标注文件
			PubSub.publish(ASYNC_SUBSCRIBE_UPLOAD_MODAL, {
				title: '上传标注文件',
				id: fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId,
				isAnnotation: true
			})
		}
	}

	// 筛选
	const searchList = () => {
		return (
			<Input
				prefix={<SearchOutlined />}
				placeholder="输入完整名称搜索"
				onChange={debounce((v: any) => {
					listSearch(v)
				}, 800)}
				allowClear
			/>
		)
	}

	return (
		<div className="m-space-table-tool-wrapper">
			<div className="button">
				<div className="content-button">
					<div className="content-special-button">
						{/* 空间类型操作控制 */}
						{selectNode?.spaceId && selectNode?.spaceType === 1 && (
							<Row>
								{/* 上传 */}
								<Dropdown menu={{ items, onClick }} arrow>
									<a onClick={e => e.preventDefault()}>
										<div className="item-icon">
											<Button type="primary" icon={<CloudUploadOutlined />} shape="round">
												上传
											</Button>
										</div>
									</a>
								</Dropdown>
								{/* 新建文件夹 */}
								<div className="item-icon">
									<Button
										className="icon-blue-item"
										icon={<FolderAddOutlined />}
										shape="round"
										onClick={() => {
											PubSub.publish(ASYNC_SUBSCRIBE_FILEFOLDER_MODAL)
										}}
									>
										新建文件夹
									</Button>
								</div>
							</Row>
						)}
						{/* 全选 */}
						<div className="item-icon">
							{(dataSource.length && checkBoxList.length === dataSource.length && (
								<Button
									className="icon-blue-item"
									icon={<CheckSquareOutlined />}
									shape="round"
									onClick={() => {
										checkAll()
									}}
								>
									取消全选
								</Button>
							)) ||
								(dataSource.length && checkBoxList.length !== dataSource.length && (
									<Button
										className="icon-blue-item"
										icon={<MinusSquareOutlined />}
										shape="round"
										onClick={() => {
											checkAll()
										}}
									>
										全选
									</Button>
								)) ||
								''}
						</div>
						{/* 删除 */}
						{(selectNode?.spaceId && selectNode?.spaceType === 1 && checkBoxList.length && (
							<div className="item-icon">
								<Button
									style={{ marginRight: '8px' }}
									icon={<DeleteOutlined />}
									disabled={!checkBoxList?.length}
									type="primary"
									danger
									shape="round"
									onClick={patchDelete}
								>
									{checkBoxList?.length ? `删除 (${checkBoxList.length})` : '删除'}
								</Button>
							</div>
						)) ||
							''}
						{/* 保存为数据集 */}
						{(checkBoxList.length && (
							<div className="item-icon">
								<Button
									icon={<SaveOutlined />}
									className="icon-blue-item"
									type="primary"
									shape="round"
									onClick={() => {
										PubSub.publish(SAVE_DATA_SET_MODAL, { fileIds: checkBoxList })
									}}
								>
									{`保存为数据集(${checkBoxList.length})`}
								</Button>
							</div>
						)) ||
							''}
					</div>
				</div>
				<div>{searchList()}</div>
			</div>
			<BreadcrumbSpace />
			<FilesModal
				onOK={(v: any) => {
					onFilesOk(v)
				}}
			/>
			<SaveDataSetModal
				onOK={() => {
					onDataSetOk()
				}}
			/>
			<UploadModal
				onOK={() => {
					onUploadOk()
				}}
			/>
		</div>
	)
}
