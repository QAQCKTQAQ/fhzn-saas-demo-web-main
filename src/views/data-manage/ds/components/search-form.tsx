/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-31 16:18:58
 */
import { useEffect, useContext, useState } from 'react'
import BaseForm from '@/components/business/SearchForm'
import { Context } from '../store/reducerContent'
import { DATA_SET_SOURCE_OPTIONS } from '../const'
import { userQueryApi } from '@/api/modules/user'
// 日志
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'
const SearchForm = () => {
	const prefix = 'searchFrom'
	const { queryList, state } = useContext(Context)
	const [userList, setUserList] = useState<any[]>([])
	const { dataSetTypes, dataSetTags } = state?.dicts || {}

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

	const formItems = [
		{
			name: [prefix, 'name'],
			label: '数据集名称',
			type: 'input'
		},
		{
			name: [prefix, 'source'],
			label: '数据集来源',
			type: 'select',
			fieldProps: {
				options: DATA_SET_SOURCE_OPTIONS
			}
		},
		{
			name: [prefix, 'types'],
			label: '数据集类型',
			type: 'select',
			fieldProps: {
				options: dataSetTypes || []
			}
		},
		{
			name: [prefix, 'tags'],
			label: '数据集标签',
			type: 'select',
			fieldProps: {
				options: dataSetTags || []
			}
		},
		{
			name: [prefix, 'creator'],
			label: '创建用户',
			type: 'select',
			fieldProps: {
				options: userList,
				showSearch: true
			}
		}
	]

	return (
		<div className="search-form">
			<BaseForm
				formItems={formItems}
				onSearch={(params: any) => {
					const data = params[prefix]
					LogReport(OPERATION_ENUM?.COMMON?.QUERY, `数据集管理-查询数据集`)
					queryList({ ...data, page: 1 })
				}}
			/>
		</div>
	)
}

export default SearchForm
