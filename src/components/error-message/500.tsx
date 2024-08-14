import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import './index.less'

const NotNetwork = () => {
	const navigate = useNavigate()
	const goHome = () => {
		navigate(HOME_URL)
	}
	return (
		<Result
			status="500"
			title="500"
			subTitle="抱歉，您访问的页面发生异常，请联系系统管理员！"
			extra={
				<Button type="primary" onClick={goHome}>
					返回首页
				</Button>
			}
		/>
	)
}

export default NotNetwork
