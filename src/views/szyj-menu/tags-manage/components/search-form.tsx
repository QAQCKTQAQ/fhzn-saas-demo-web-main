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
			label: '标签名称',
			type: 'input'
		},
		{
			name: [prefix, 'time'],
			label: '创建日期',
			type: 'dateRange'
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
