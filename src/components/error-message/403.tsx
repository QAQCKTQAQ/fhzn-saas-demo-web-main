import { Button, Result, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import './index.less'

const NotAuth = () => {
	const navigate = useNavigate()
	const goHome = () => {
		navigate(HOME_URL)
	}
	return (
		<Result
			status="403"
			title="403"
			subTitle="抱歉，您暂时无权限访问该页面，请联系管理开通相关权限！"
			extra={
				<Space>
					<Button type="primary" onClick={goHome}>
						首页
					</Button>
					<Button onClick={() => navigate(-2)}>返回</Button>
				</Space>
			}
		/>
	)
}

export default NotAuth
