import { useContext, useEffect, useState } from 'react'
import BaseForm from '@/components/business/SearchForm'
import { Context } from '../store/reducerContent'
import { userQueryApi } from '@/api/modules/user'
import moment from 'moment'
import { FORMATTER } from '@/const/constants'
import { getTagsDicts } from '@/api/modules/common'
import { transitionArrToMap, transitionArrKey } from '@/utils/util'

const SearchForm = () => {
	const {
		queryList,
		setProxyTypeMap,
		setProxyTargetTypeMap,
		setModelFormMap,
		setModelTypeMap,
		state: { selectNode }
	} = useContext(Context)
	const [userList, setUserList] = useState<any[]>([])
	const [propertyProxyTypes, setPropertyProxyType] = useState([])
	const [propertyProxyTargetTypes, setPropertyProxyTargetTypes] = useState([])
	const [propertyModelForms, setPropertyModelForm] = useState([])

	useEffect(() => {
		getUserList()
		initData()
	}, [])

	const initData = () => {
		Promise.all([getPropertyProxyTypes(), getPropertyProxyTargetTypes(), getPropertyModelForms(), getPropertyModelType()]).then(
			(res: any) => {
				const [propertyProxyTypes, propertyProxyTargetTypes, propertyModelForms, propertyModelType] = res || []
				const proxyTypeList = propertyProxyTypes?.items || []
				const proxyTargetTypeList = propertyProxyTargetTypes?.items || []
				const modalFormList = propertyModelForms?.items || []
				const modalTypeList = propertyModelType?.items || []

				setPropertyProxyType(transitionArrKey(proxyTypeList))
				setPropertyProxyTargetTypes(transitionArrKey(proxyTargetTypeList))
				setPropertyModelForm(transitionArrKey(modalFormList))
				// 设置Store
				setProxyTypeMap(transitionArrToMap(proxyTypeList))
				setProxyTargetTypeMap(transitionArrToMap(proxyTargetTypeList))
				setModelFormMap(transitionArrToMap(modalFormList))
				setModelTypeMap(transitionArrToMap(modalTypeList))
				queryList()
			}
		)
	}

	useEffect(() => {
		const { key } = selectNode || {}
		// 每次切换层级，page置为1
		key && queryList({ levelId: key, page: 1 })
	}, [selectNode])

	// 代理类型
	const getPropertyProxyTypes = () => {
		return getTagsDicts({
			type: 'property-proxy-type',
			page: 1,
			pageSize: 1000
		})
	}

	// 代理对象
	const getPropertyProxyTargetTypes = () => {
		return getTagsDicts({
			type: 'property-proxy-target-type',
			page: 1,
			pageSize: 1000
		})
	}

	// 模型类型
	const getPropertyModelType = () => {
		return getTagsDicts({
			type: 'property-model-type',
			page: 1,
			pageSize: 1000
		})
	}

	// 模型形式
	const getPropertyModelForms = () => {
		return getTagsDicts({
			type: 'property-model-form',
			page: 1,
			pageSize: 1000
		})
	}

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
			label: '特性名称',
			type: 'input'
		},
		{
			name: [prefix, 'proxyTargetType'],
			label: '代理对象',
			type: 'select',
			fieldProps: {
				options: propertyProxyTargetTypes
			}
		},
		{
			name: [prefix, 'proxyType'],
			label: '代理类型',
			type: 'select',
			fieldProps: {
				options: propertyProxyTypes
			}
		},
		{
			name: [prefix, 'modelForm'],
			label: '模型形式',
			type: 'select',
			fieldProps: {
				options: propertyModelForms
			}
		},
		{
			name: [prefix, 'creator'],
			label: '创建用户',
			type: 'select',
			fieldProps: {
				options: userList
			}
		},
		{
			name: [prefix, 'createTime'],
			label: '创建时间',
			type: 'dateRange'
		}
	]

	// 处理日期范围字段
	const handleQueryDateRange = (values: any) => {
		const { createTime, ...rest } = values || {}
		const startTime = (createTime && moment(createTime[0]).format(FORMATTER)) || ''
		const endTime = (createTime && moment(createTime[1]).format(FORMATTER)) || ''
		return { startTime, endTime, ...rest }
	}

	return (
		<div className="search-form">
			<BaseForm
				formItems={formItems}
				onSearch={(params: any) => {
					const data = params[prefix]
					queryList({ ...handleQueryDateRange(data), page: 1 })
				}}
			/>
		</div>
	)
}

export default SearchForm
