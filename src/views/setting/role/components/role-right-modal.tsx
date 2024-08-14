import { useEffect, useRef, useState } from 'react'
import { Modal, message } from 'antd'
import { getRoleRelateResource } from '@/api/modules/role'
import { queryResourceList } from '@/api/modules/resource'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_RIGHT_MODAL } from '../const'
import TreeCheck from './tree-check'
import { configRoleResources } from '@/api/modules/role'
interface RoleRecord {
	id?: any
	name?: string
}

function RoleRightModal() {
	const [visible, setVisible] = useState(false)
	const [loading] = useState(false)
	const [record, setRecord] = useState<RoleRecord | null>(null)
	const [treeData, setTreeData] = useState([])
	const [defaultSelectKeys, setDefaultSelectKeys] = useState([])

	const currenCheckedKeys: any = useRef()

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_RIGHT_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_RIGHT_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setRecord(data || null)
		getInitData(data)
	}

	// 获取初始化数据
	const getInitData = (data: any) => {
		Promise.all([getResourceList(), geRelateResource(data)]).then(res => {
			const [treeData, defaultSelectKey]: [any, any] = res || []
			setTreeData(parseMenus(treeData.items, ''))
			setDefaultSelectKeys(defaultSelectKey.resourceIds || [])
		})
	}

	// 获取系统资源列表
	const getResourceList = () => {
		return queryResourceList({
			page: 1,
			pageSize: 1000
		})
	}

	// 获取角色绑定的资源列表
	const geRelateResource = (data: any) => {
		const { id = '' } = data || {}
		return getRoleRelateResource({ id })
	}

	const hideModal = () => {
		setVisible(false)
	}
	// 按照菜单层级进行数据解析
	const parseMenus = (menus: any, parentCode: string) => {
		if (!menus.length) return
		return menus
			.filter((menu: any) => {
				// 针对一级菜单，parentCode可能为空或者不存在
				if (!parentCode) {
					return !menu.parentCode
				}

				return menu.parentCode === parentCode
			})
			.map((menu: any) => {
				const children = parseMenus(menus, menu.code)
				return Object.assign(toJSON(menu.resourceExt), {
					key: menu.id,
					title: menu.name,
					path: menu.resourceUrl,
					icon: menu.icon,
					children
				})
			})
	}
	const toJSON = (str: string) => {
		let obj = {}
		if (str) {
			try {
				obj = JSON.parse(str)
			} catch (e) {
				// eslint-disable-next-line
			}
		}
		return obj
	}

	// 绑定权限到角色
	const submit: any = () => {
		const { id } = record || {}
		configRoleResources({
			id,
			resourceList: currenCheckedKeys.current
		}).then(() => {
			message.success('操作成功！')
			hideModal()
		})
	}

	if (visible) {
		return (
			<Modal
				width="600px"
				confirmLoading={loading}
				title={record ? `用户角色分配：${record.name}` : ''}
				open={visible}
				onCancel={hideModal}
				maskClosable={false}
				destroyOnClose
				onOk={submit}
				className="role-right-modal"
			>
				{treeData && treeData.length && (
					<TreeCheck
						treeData={treeData || []}
						defaultSelectKeys={defaultSelectKeys}
						roleId={(record && record.id) || ''}
						onChecked={(data: number[]) => {
							currenCheckedKeys.current = data || []
						}}
					></TreeCheck>
				)}
			</Modal>
		)
	}
	return null
}

export default RoleRightModal
