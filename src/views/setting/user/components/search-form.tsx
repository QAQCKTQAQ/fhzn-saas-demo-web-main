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
			label: '账号名称',
			type: 'input'
		},
		{
			name: [prefix, 'status'],
			label: '用户状态',
			type: 'select',
			fieldProps: {
				options: [
					{
						label: '启用',
						value: '0'
					},
					{
						label: '停用',
						value: '1'
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
