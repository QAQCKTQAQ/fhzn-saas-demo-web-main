import { useContext, useEffect } from 'react'
import BaseForm from '@/components/business/SearchForm'
import { Context } from '../store/reducerContent'
import { AUTH_TYPE_OPTIONS } from '@/const/constants'

const SearchForm = () => {
	const { queryList } = useContext(Context)

	useEffect(() => {
		queryList()
	}, [])

	const prefix = 'searchFrom'

	const formItems = [
		{
			name: [prefix, 'name'],
			label: '资源名称',
			type: 'input'
		},
		{
			name: [prefix, 'code'],
			label: '资源编码',
			type: 'input'
		},
		{
			name: [prefix, 'resourceType'],
			label: '资源类型',
			type: 'select',
			fieldProps: {
				options: AUTH_TYPE_OPTIONS
			}
		},
		{
			name: [prefix, 'level'],
			label: '所处层级',
			type: 'input'
		},
		{
			name: [prefix, 'parentCode'],
			label: '父资源编码',
			type: 'input'
		},
		{
			name: [prefix, 'status'],
			label: '状态',
			type: 'select',
			fieldProps: {
				options: [
					{
						label: '启用',
						value: '1'
					},
					{
						label: '禁用',
						value: '2'
					}
				]
			}
		}
	]

	return (
		<div className="search-form">
			<BaseForm
				formItems={formItems}
				onSearch={(params: any) => {
					const data = params[prefix]
					queryList({ ...data, page: 1 })
				}}
			/>
		</div>
	)
}

export default SearchForm
