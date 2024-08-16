import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { updateCollapse } from '@/redux/modules/menu/action'
import { connect } from 'react-redux'
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
import LayoutTabs from './components/Tabs'
import LayoutFooter from './components/Footer'
import './index.less'
// import { getMenuList } from '@/api/modules/login'
import { findAllBreadcrumb } from '@/utils/util'
import { setMenuList } from '@/redux/modules/menu/action'
import { setBreadcrumbList } from '@/redux/modules/breadcrumb/action'
import { setAuthRouter, setAuthButtons } from '@/redux/modules/auth/action'
import { setUserInfo } from '@/redux/modules/global/action'
import { AUTH_TYPE_ENUM } from '@/const/constants'
import getMenus from './parse-menus'

// 默认首页路由
const defaultRouter = [
	{
		icon: 'HomeOutlined',
		title: '首页',
		path: '/',
		code: 'HOME'
	},
	{
		icon: 'HomeOutlined',
		title: '用户管理',
		path: '/setting/user',
		code: 'MANAGE'
	}
]

const LayoutIndex = (props: any) => {
	const { Sider, Content } = Layout
	const { isCollapse, updateCollapse, themeConfig, setBreadcrumbList, setAuthRouter, setMenuList, setUserInfo, setAuthButtons } =
		props

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth
				if (!isCollapse && screenWidth < 1200) updateCollapse(true)
				if (!isCollapse && screenWidth > 1200) updateCollapse(false)
			})()
		}
	}

	const getMenuData = async () => {
		// const res = await getMenuList()
		const res = {
			user: {
				id: 1,
				username: 'test',
				role: 'test',
				email: 'test',
				avatar: 'test'
			},
			resourceList: [
				{
					icon: 'HomeOutlined',
					title: '用户管理',
					path: '/setting/user',
					code: 'MANAGE'
				}
			]
		}
		const { user, resourceList = [] } = res
		// 设置用户信息
		setUserInfo(user)
		// 处理菜单路由
		const menus = getMenus(resourceList.filter((item: any) => `${item.resourceType}` === AUTH_TYPE_ENUM.MENU))
		const data = [...defaultRouter, ...menus]
		setMenuList(data)
		// 处理按钮权限
		handleAuthButtons(resourceList)
		// 存储处理过后的所有面包屑导航栏到 redux 中
		setBreadcrumbList(findAllBreadcrumb(data))
		// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
		setAuthRouter(resourceList)
	}

	// 处理按钮权限的code
	const handleAuthButtons = (resourceList: any) => {
		const resoureCode: string[] = []
		;(resourceList || []).map((item: any) => {
			const { resourceType, code } = item
			if (`${resourceType}` === AUTH_TYPE_ENUM.OPERATE) {
				resoureCode.push(code)
			}
		})
		setAuthButtons(resoureCode)
	}

	useEffect(() => {
		listeningWindow()
		getMenuData()
	}, [])

	const renderLayoutMenu = () => {
		if (!themeConfig.menuMode || themeConfig.menuMode === 'COL') {
			return (
				<Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
					<LayoutMenu></LayoutMenu>
				</Sider>
			)
		}
		return null
	}

	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			{renderLayoutMenu()}
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				{/* <BreadcrumbNav /> */}
				<Content>
					<Outlet></Outlet>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	)
}

const mapStateToProps = (state: any) => {
	const { global, menu } = state
	return { ...global, ...menu }
}
const mapDispatchToProps = { updateCollapse, setBreadcrumbList, setAuthRouter, setMenuList, setUserInfo, setAuthButtons }
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex)
