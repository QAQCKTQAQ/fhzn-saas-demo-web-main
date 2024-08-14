import { Layout, Button } from 'antd'
import AvatarIcon from './components/AvatarIcon'
// import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import './index.less'
import LayoutMenuRow from '../Menu-Row'
import { connect } from 'react-redux'
import { AUTH_TYPE_ENUM } from '@/const/constants'
import { useNavigate } from 'react-router-dom'
import { SwapLeftOutlined } from '@ant-design/icons'
import BreadcrumbNav from '../BreadcrumbNav'

const LayoutHeader = (props: any) => {
	const { Header } = Layout
	const {
		global: { themeConfig },
		auth: { currentRoute }
	} = props
	const navigate = useNavigate()

	// 返回上一级
	const goBack = () => {
		navigate(-1)
	}

	// 渲染返回
	const renderBack = () => {
		const { resourceType } = currentRoute || {}
		if (`${resourceType}` === AUTH_TYPE_ENUM.INNER_PAGE) {
			return (
				<div className="header-lf">
					<Button icon={<SwapLeftOutlined />} type="text" size="small" onClick={goBack} className="back">
						返回
					</Button>
					<BreadcrumbNav />
				</div>
			)
		}
		return (
			<div className="header-lf">
				<BreadcrumbNav />
			</div>
		)
	}

	return (
		<Header>
			{(themeConfig.menuMode === 'ROW' && <LayoutMenuRow />) || renderBack()}
			<div className="header-ri">
				{/* <Theme /> */}
				<Fullscreen />
				{/* <span className="username">{userInfo?.nicknameCn}</span> */}
				<AvatarIcon />
			</div>
		</Header>
	)
}

const mapStateToProps = (state: any) => state
export default connect(mapStateToProps)(LayoutHeader)
