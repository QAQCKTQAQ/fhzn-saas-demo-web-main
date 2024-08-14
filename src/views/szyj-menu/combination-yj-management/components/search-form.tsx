import { useContext, useEffect, useState } from 'react'
import BaseForm from '@/components/business/SearchForm'
import { Context } from '../store/reducerContent'
import { userQueryApi } from '@/api/modules/user'

const SearchForm = () => {
	const { queryList } = useContext(Context)
	const [userList, setUserList] = useState<any[]>([])

	useEffect(() => {
		getUserList()
		queryList()
	}, [])

	// 获取创建用户信息
	const getUserList = async () => {
		const { items = [] } = await userQueryApi({ pageSize: 1000, page: 1 })
		const userLists: any[] = (items || []).map((item: any) => {
			const { nickname, nicknameCn } = item
			return { label: nicknameCn, value: nickname }
		})
		setUserList(userLists)
	}

	const prefix = 'searchFrom'

	const formItems = [
		{
			name: [prefix, 'name'],
			label: '样机名称',
			type: 'input'
		},
		{
			name: [prefix, 'createTime'],
			label: '创建时间',
			type: 'dateRange'
		},
		{
			name: [prefix, 'creator'],
			label: '创建用户',
			type: 'select',
			fieldProps: {
				options: userList
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
