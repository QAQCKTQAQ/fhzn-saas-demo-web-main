import { Popover, Table } from 'antd'
import { useEffect, useState } from 'react'
import ParamItem from '../param-item'
import './index.less'
// 渲染列表数据
export default function ListTable(props: any) {
	const { col } = props
	const [dataSource, setDataSource] = useState([])
	const [columns, setColumns] = useState([])

	useEffect(() => {
		const { value, body } = col
		setDataSource(body || [])
		const { _type, _name, ...rest } = value || {}
		console.log(_type, _name)
		setColumns(handleColumns(rest))
	}, [col])

	const renderChildTable = (hValue: any, data: any) => {
		const columns: any = []
		const { _type, _name, ...rest } = hValue || {}
		if (_name && _type === 'array') {
			Object.entries(rest || {}).map((item: any) => {
				const [hKey, hValue] = item || []
				columns.push({
					title: hValue && Object.prototype.toString.call(hValue) === '[object Object]' ? hValue._name : hValue,
					dataIndex: hKey,
					key: hKey,
					ellipsis: true,
					render: (text: any) => {
						return handleValue(text)
					}
				})
			})
			return <Table dataSource={data || []} columns={columns} pagination={false} scroll={{ x: '80vw' }} />
		}
		if (_name && _type === 'object') {
			const params: any = []
			Object.entries(rest || {}).map((item: any) => {
				const [hKey, hValue] = item || []
				params.push({
					name: hValue,
					value: data[hKey],
					key: hKey
				})
			})
			return (
				<div className="data-params-box params-object-child-box">
					<ParamItem params={params} />
				</div>
			)
		}
	}

	// 处理table header
	const handleColumns = (data: any) => {
		const columns: any = []
		Object.entries(data || {}).map((item: any) => {
			const [hKey, hValue] = item || []
			columns.push({
				title: hValue && Object.prototype.toString.call(hValue) === '[object Object]' ? hValue._name : hValue,
				dataIndex: hKey,
				key: hKey,
				ellipsis: true,
				width: 160,
				render: (text: any) => {
					if (Object.prototype.toString.call(hValue) === '[object Object]') {
						return (
							<Popover content={renderChildTable(hValue, text)}>
								<a>点击查看更多</a>
							</Popover>
						)
					}
					return handleValue(text)
				}
			})
		})
		return columns
	}

	// 处理特殊值为字符串展示
	const handleValue = (value: any) => {
		if (value === undefined) {
			return ''
		}
		if (typeof value === 'object') {
			return JSON.stringify(value)
		}
		return value
	}

	return (
		<div className="code-data-list-table">
			<Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '100%' }} />
		</div>
	)
}
