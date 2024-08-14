import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const FinishInfo = (props: any) => {
	const { id } = props
	const navigate = useNavigate()

	return (
		<Result
			status="success"
			title="创建成功！"
			extra={[
				<Button type="primary" key="console" onClick={() => navigate('/szyj-menu/single-yj-management')}>
					返回列表
				</Button>,
				<Button key="buy" onClick={() => navigate(`/szyj-menu/single-yj-detail/${id}`)}>
					查看详情
				</Button>
			]}
		/>
	)
}

export default FinishInfo
