import { useContext, useEffect } from 'react'
import BaseForm from '@/components/business/SearchForm'
import { Context } from '../store/reducerContent'

const SearchForm = () => {
	const { queryList } = useContext(Context)

	useEffect(() => {
		queryList()
	}, [])
	const prefix = 'searchFrom'

	const formItems = [
		{
			name: [prefix, 'name'],
			label: '角色名称',
			type: 'input'
		},
		{
			name: [prefix, 'code'],
			label: '角色编码',
			type: 'input'
		},
		{
			name: [prefix, 'status'],
			label: '角色状态',
			type: 'select',
			fieldProps: {
				options: [
					{
						label: '启用',
						value: '1'
					},
					{
						label: '停用',
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
