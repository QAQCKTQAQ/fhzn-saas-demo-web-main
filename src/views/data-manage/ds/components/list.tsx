import { Table, Tag } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_CREAT_DATA_MODAL, ASYNC_SUBSCRIBE_AUTH_MODAL, ASYNC_SUBSCRIBE_CREATE_VERSION_MODAL } from '../const'
import AuthModal from '../components/auth-modal'
import React, { useContext, useState } from 'react'
import { Context } from '../store/reducerContent'
import { DATA_SET_TAG_COLOR_MAP } from '@/const/constants'
import VersionList from './version-list'
import { DownSquareOutlined } from '@ant-design/icons'
import CreateDataSetVModal from './create-dataset-v-modal'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

const List: React.FC = () => {
	const { state, queryList } = useContext(Context)
	const { loading, list } = state
	const { dataSource = [], pageInfo = {} } = list || {}
	const { dataSetTagMap = {}, dataSettypeMap = {} } = state?.dicts || {}
	const [expandedRowKeys, setExpandedRowKeys] = useState<any>()

	const creatVersionOk = (v: any) => {
		LogReport(OPERATION_ENUM?.COMMON?.ADD, `数据集管理-新建${v?.name}数据集版本`)
	}

	const AuthModalonOk = (v: any) => {
		LogReport(OPERATION_ENUM?.COMMON?.EDIT, `数据集管理-${v?.name}数据集更新权限`)
	}

	// 匹配标签
	const useRenderTags = (types: any) => {
		if (types && types?.length) {
			let label: any = '-'
			label = types.map((item: any, index: any) => {
				let labelCopy: any = []
				labelCopy.push(dataSetTagMap[item])
				return (
					<Tag key={index} color={DATA_SET_TAG_COLOR_MAP[item] || 'lime'}>
						{labelCopy.join(',')}
					</Tag>
				)
			})
			return label
		}
		return '-'
	}

	const columns: any = [
		{
			dataIndex: 'name',
			title: '数据集名称'
		},
		{
			dataIndex: 'type',
			title: '数据集类型',
			render: (text: any) => {
				return (text && <Tag color="lime">{dataSettypeMap[text]}</Tag>) || '--'
			}
		},
		{
			dataIndex: 'tags',
			title: '数据集标签',
			render: useRenderTags
		},
		{
			dataIndex: 'comment',
			title: '简介描述'
		},
		{
			dataIndex: 'creator',
			title: '创建用户',
			render: (text: any) => {
				return text || '-'
			}
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		}
	]

	const operateColumn: any = {
		title: '操作',
		fixed: 'right',
		render: (_: any, record: any) => {
			return (
				<span className="actions">
					<a
						onClick={(e: any) => {
							e.stopPropagation()
							PubSub.publish(ASYNC_SUBSCRIBE_CREAT_DATA_MODAL, record)
						}}
					>
						编辑
					</a>
					<a
						onClick={(e: any) => {
							e.stopPropagation()
							PubSub.publish(ASYNC_SUBSCRIBE_CREATE_VERSION_MODAL, record)
						}}
					>
						创建版本
					</a>
					<a
						onClick={(e: any) => {
							e.stopPropagation()
							PubSub.publish(ASYNC_SUBSCRIBE_AUTH_MODAL, record)
						}}
					>
						共享数据集
					</a>
					{/* {record.version && <Link to={`/data-manage/ds-detail-image?id=${record.id}&version=${record.version}`}>详情</Link>} */}
				</span>
			)
		}
	}

	return (
		<>
			<Table
				rowKey="id"
				columns={[...columns, operateColumn]}
				dataSource={dataSource}
				scroll={{ x: 'max-content' }}
				loading={loading}
				expandRowByClick={true}
				className="row-item-expand"
				expandable={{
					expandedRowRender: (record: any, index: any, indent: any, expanded: any) => {
						if (expanded) {
							return <VersionList record={record} />
						}
						return null
					}
				}}
				expandedRowKeys={expandedRowKeys}
				onExpand={(expanded: any, record: any) => {
					const { id } = record
					if (expanded) {
						return setExpandedRowKeys([id])
					}
					setExpandedRowKeys([])
				}}
				expandIcon={({ expanded, onExpand, record }: any) =>
					expanded ? (
						<DownSquareOutlined onClick={e => onExpand(record, e)} className="expanded-icon" />
					) : (
						<DownSquareOutlined onClick={e => onExpand(record, e)} className="expand-icon" />
					)
				}
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
			<AuthModal
				onOk={(v: any) => {
					AuthModalonOk(v)
				}}
			/>
			<CreateDataSetVModal
				onOk={(v: any) => {
					creatVersionOk(v)
					setExpandedRowKeys([])
				}}
			/>
		</>
	)
}

export default List
