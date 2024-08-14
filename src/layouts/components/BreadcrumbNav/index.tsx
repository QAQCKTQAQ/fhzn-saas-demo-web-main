import { Breadcrumb } from 'antd'
import { useLocation, useSearchParams, matchRoutes, matchPath } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { connect } from 'react-redux'
import './index.less'
import { useEffect } from 'react'
import { setCurrentBreadcrumb } from '@/redux/modules/breadcrumb/action'
import { setCurrentRouter } from '@/redux/modules/auth/action'
import { AUTH_TYPE_ENUM } from '@/const/constants'
import { uniqueFunc } from '@/utils/util'
import { rootRouter } from '@/routers/index'
import { setBusModule } from '@/utils/logReport'
import { HomeOutlined } from '@ant-design/icons'

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation()
	const [params] = useSearchParams()
	const {
		setCurrentBreadcrumb,
		setCurrentRouter,
		global: { themeConfig },
		breadcrumb: { currentBreadcrumb = [], breadcrumbList },
		auth: { authRouter }
	} = props

	useEffect(() => {
		handleInnerPage()
	}, [pathname, location])

	// 处理内置页面的面包屑，根据入口
	const handleInnerPage = () => {
		// //根据 当前url获取匹配路由信息
		const mathchs: any[] | null = matchRoutes(rootRouter, location)
		const { route } = (mathchs || []).find((item: any) => item.pathname === pathname) || {}
		const { path } = route
		const currentInfo = (path && authRouter.find((item: any) => item.resourceUrl === path)) || null
		setCurrentRouter(currentInfo)
		// 处理内置页面的面包屑
		if (currentInfo && `${currentInfo.resourceType}` === AUTH_TYPE_ENUM.INNER_PAGE) {
			const index = currentBreadcrumb.findIndex((item: any) => item.path === pathname)

			// 面包屑已包含当前路由信息，回退之类处罚
			if (index !== -1) {
				const crumbInnerList = currentBreadcrumb.slice(0, index + 1)
				return setDisptch(crumbInnerList)
			}
			// 是否自定义title
			const title = params.getAll('title')[0]
			// 过滤重复路由
			const filterRoute = currentBreadcrumb.find((item: any) => {
				return matchPath({ path: currentInfo.resourceUrl }, item.path)
			})
			if (!filterRoute) {
				// 增加resourceType 用于标识是内置页面，日志上报业务依赖面包屑
				const crumbInnerList = uniqueFunc(
					[...currentBreadcrumb, { path: pathname, title: title || currentInfo.name, resourceType: currentInfo.resourceType }],
					'path'
				)
				setDisptch(crumbInnerList)
			}
			return
		}
		const currentMenuBreadcrumb = breadcrumbList[pathname] || []
		return setDisptch(currentMenuBreadcrumb)
	}

	const setDisptch = (currentBreadcrumb: any) => {
		setBusModule(currentBreadcrumb.filter((item: any) => `${item.resourceType}` !== AUTH_TYPE_ENUM.INNER_PAGE))
		setCurrentBreadcrumb(currentBreadcrumb)
	}

	return (
		<>
			{!themeConfig.breadcrumb && (
				<div className="bread-crumb">
					<Breadcrumb>
						<Breadcrumb.Item href={HOME_URL}>
							<label>
								<HomeOutlined /> 首页
							</label>
						</Breadcrumb.Item>
						{currentBreadcrumb.map((item: any) => {
							return <Breadcrumb.Item key={item.path}>{item.title !== '首页' ? item.title : null}</Breadcrumb.Item>
						})}
					</Breadcrumb>
				</div>
			)}
		</>
	)
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = { setCurrentBreadcrumb, setCurrentRouter, setBusModule }

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbNav)
