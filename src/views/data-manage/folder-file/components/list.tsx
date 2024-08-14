import { Table, Image, Space, Tag } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import { FolderOpenOutlined, PlaySquareOutlined, FileTextOutlined } from '@ant-design/icons'
import { FILE_TYPE_ENUM } from '../../const'
import { FOLDER_TYPE_ENUM } from '@/const/constants'
import { filterFileSize } from '@/utils/util'
import { useNavigate } from 'react-router-dom'
import { Context as SpaceContext } from '../../space/store/reducerContent'
import { getSuffix } from '@/utils/util'

const List: React.FC = () => {
	const { state, queryList, setSelectedRowKeys, routerId: currentRouterId } = useContext(Context)
	const { setSelectKeys } = useContext(SpaceContext)

	const { loading, list, selectedRowKeys, folderType } = state
	const { dataSource = [], pageInfo = {} } = list || {}
	// const { id: currentRouterId } = useParams()
	const navigate = useNavigate()

	// 渲染名称
	const renderIconName = (record: any) => {
		const { type } = record
		if (FILE_TYPE_ENUM.VIDEO === `${type}`) {
			return <PlaySquareOutlined />
		}
		if (FILE_TYPE_ENUM.FOLDER === `${type}`) {
			return <FolderOpenOutlined />
		}
		return <FileTextOutlined />
	}

	// 根据文件夹/文件动态渲染列
	const renderColumnsDy = () => {
		if (folderType === FOLDER_TYPE_ENUM.FILES) {
			return {
				dataIndex: 'annotationContent',
				title: '标注类型',
				render: (text: string, record: any) => {
					const { haveAnnotation, annotationContent } = record
					if (haveAnnotation) {
						return <Tag>{getSuffix(annotationContent?.originFilename || '')}</Tag>
					}
					return '无标注'
				}
			}
		}
		return {
			dataIndex: 'comment',
			title: '描述',
			render: (text: string) => {
				return text || '--'
			}
		}
	}

	const columns = [
		{
			dataIndex: 'name',
			title: '名称',
			render: (text: string, record: any) => {
				const { type, fileCode } = record
				// 文件预览
				if (FILE_TYPE_ENUM.IMAGE === `${type}`) {
					return (
						<Space>
							<Image src={`/api/bff/download?fileCode=${fileCode}`} height={40} width={40} />
							<a onClick={() => toLinkRender(record)}>{text}</a>
						</Space>
					)
				}
				return (
					<a onClick={() => toLinkRender(record)}>
						<Space>
							{renderIconName(record)}
							{text}
						</Space>
					</a>
				)
			}
		},
		renderColumnsDy(),
		{
			dataIndex: 'length',
			title: '文件大小',
			render: (text: string) => {
				if (text) {
					return filterFileSize(Number(text))
				}
				return text || '--'
			}
		},
		{
			dataIndex: 'updatedTime',
			title: '更新时间'
		}
	]

	// 根据当前目录类型 跳转不动链接
	const toLinkRender = (record: any) => {
		const { id, name } = record
		if (folderType === FOLDER_TYPE_ENUM.FILES) {
			return navigate(`/data-manage/folder-file/file-detail/${id}?parentId=${currentRouterId}`)
		}
		navigate(`/data-manage/space?parentId=${id}`)
		return setSelectKeys({
			keys: [id],
			title: name
		})
	}

	const renderOperate = (record: any) => {
		if (folderType === FOLDER_TYPE_ENUM.FILES) {
			return <a onClick={() => toLinkRender(record)}>查看</a>
		}
		return <a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_MODAL, record)}>编辑</a>
	}

	const operateColumn = {
		title: '操作',
		render: (_: any, record: any) => {
			return <span className="actions">{renderOperate(record)}</span>
		}
	}

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys)
	}

	return (
		<>
			<Table
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys,
					onChange: onSelectChange,
					getCheckboxProps: (record: any) => {
						const { id } = record
						if (folderType === FOLDER_TYPE_ENUM.FOLDER) {
							return {
								disabled: (selectedRowKeys.length && id !== selectedRowKeys[0]) || false
							}
						}
						return {}
					}
				}}
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
				scroll={{ x: 'max-content' }}
				loading={loading}
				pagination={{
					total: pageInfo.total,
					pageSize: pageInfo.pageSize,
					current: pageInfo.page,
					showQuickJumper: true,
					showSizeChanger: true,
					showTotal: total => `共 ${total} 条`,
					onChange: (pageNum, pageSize) => queryList({ page: pageNum, pageSize })
				}}
			/>
		</>
	)
}

export default List
