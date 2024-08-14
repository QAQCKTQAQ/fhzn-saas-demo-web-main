import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export default function Tool() {
	const navigate = useNavigate()
	return (
		<>
			<div className="m-transfer-table-tool-wrapper">
				<div className="button">
					<Space>
						<Button
							onClick={() => {
								navigate('/szyj-menu/combination-yj/create')
							}}
							icon={<PlusOutlined />}
							type="primary"
						>
							创建组合实例YJ
						</Button>
					</Space>
				</div>
			</div>
		</>
	)
}
