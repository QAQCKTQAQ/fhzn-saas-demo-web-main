import { Table, Image, Space } from 'antd'
import React, { useContext } from 'react'
import { Context } from '../store/reducerContent'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL, ASYNC_SUBSCRIBE_VERSION_MODAL } from '../const'
import { Link } from 'react-router-dom'
import VersionModal from './version-modal'
import { baseURL } from '@/config/config'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo },
			loading,
			selectedRowKeys,
			proxyTypeMap,
			proxyTargetTypeMap,
			modelFormMap,
			modelTypeMap
		},
		queryList,
		setSelectedRowKeys
	} = useContext(Context)

	const columns: any = [
		{
			dataIndex: 'name',
			title: '特性名称',
			fixed: 'left',
			render: (text: string, record: any) => {
				return (
					<Space>
						<Image src={`${baseURL}/bff/download?fileCode=${record.imageFileCode}`} width={40} height={40} />
						<Link to={`/szyj-menu/character-info/detail/${record.id}`}>{text}</Link>
					</Space>
				)
			}
		},
		{
			dataIndex: 'modelType',
			title: '模型类型',
			render: (text: any) => {
				return (text && modelTypeMap[`${text}`]) || '--'
			}
		},
		{
			dataIndex: 'modelForm',
			title: '模型形式',
			render: (text: any) => {
				return (text && modelFormMap[`${text}`]) || '--'
			}
		},
		{
			dataIndex: 'version',
			title: '当前版本'
		},
		{
			dataIndex: 'creator',
			title: '创建用户'
		},
		{
			dataIndex: 'createdTime',
			title: '创建时间'
		},
		{
			dataIndex: 'proxyType',
			title: '代理类型',
			render: (text: any) => {
				return (text && proxyTypeMap[`${text}`]) || '--'
			}
		},
		{
			dataIndex: 'proxyTargetType',
			title: '代理对象',
			render: (text: any) => {
				return (text && proxyTargetTypeMap[`${text}`]) || '--'
			}
		}
	]

	const operateColumn = {
		title: '操作',
		fixed: 'right',
		render: (_: any, record: any) => {
			const { id } = record
			return (
				<span className="actions">
					<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_MODAL, record)}>编辑</a>
					<a onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_VERSION_MODAL, record)}>版本</a>
					<Link to={`/szyj-menu/character-info/detail/${id}`}>查看</Link>
				</span>
			)
		}
	}

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys)
	}

	return (
		<>
			<Table
				rowKey="id"
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys,
					onChange: onSelectChange
				}}
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
			<VersionModal />
		</>
	)
}

export default List
