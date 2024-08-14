import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AuthRouter from '@/routers/utils/authRouter'
import Router from '@/routers/index'
import useTheme from '@/hooks/useTheme'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const App = (props: any) => {
	const { assemblySize, themeConfig } = props

	// 全局使用主题
	useTheme(themeConfig)

	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	)
}

const mapStateToProps = (state: any) => state.global
export default connect(mapStateToProps)(App)
