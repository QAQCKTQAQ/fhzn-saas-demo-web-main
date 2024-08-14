import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { searchRoute } from '@/utils/util'
import { connect } from 'react-redux'
import type { MenuProps } from 'antd'
import * as Icons from '@ant-design/icons'
import Logo from './components/Logo'
import './index.less'
import { AUTH_TYPE_ENUM } from '@/const/constants'

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation()
	const { menuList: actionMenuList, currentRoute } = props
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setMenuStyle()
	}, [currentRoute])

	// 内置页面的菜单高亮
	const setMenuStyle = () => {
		const { resourceType, parentCode, code } = currentRoute || {}
		if (resourceType && `${resourceType}` === AUTH_TYPE_ENUM.INNER_PAGE) {
			setSelectedKeys([parentCode])
		} else {
			setSelectedKeys([code])
		}
	}

	// 定义 menu 类型
	type MenuItem = Required<MenuProps>['items'][number]
	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group'
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem
	}
	// 动态渲染 Icon 图标
	const customIcons: { [key: string]: any } = Icons
	const addIcon = (name: string) => {
		return (name && React.createElement(customIcons[name])) || null
	}

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)))
		})
		return newArr
	}

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([])

	useEffect(() => {
		setMenuList(deepLoopFloat(actionMenuList))
	}, [actionMenuList])

	// 点击当前菜单跳转页面
	const navigate = useNavigate()
	const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList)
		if (route.isLink) window.open(route.isLink, '_blank')
		navigate(route?.path || '/')
	}

	return (
		<div className="menu-row">
			<Logo></Logo>
			<Menu mode="horizontal" selectedKeys={selectedKeys} items={menuList} onClick={clickMenu}></Menu>
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { ...state.menu, ...state.breadcrumb, ...state.auth }
}
export default connect(mapStateToProps)(LayoutMenu)
