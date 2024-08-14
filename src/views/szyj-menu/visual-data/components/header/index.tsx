import { useContext } from 'react'
import { Context } from '../../store/reducerContent'
import { Button, Space } from 'antd'
import './index.less'
import { RadarChartOutlined, CodeSandboxOutlined, SlidersOutlined, RocketOutlined, FieldTimeOutlined } from '@ant-design/icons'

export default function Header() {
	const { state, testId } = useContext(Context)
	const selectTime = state?.selectTime || ''

	const openPages = () => {
		//打开两个页面
		window.open(`/szyj-menu/visual-data/dygz?id=${testId}&playback=true`)
		window.open(`/szyj-menu/visual-data/ld?id=${testId}&playback=true`)
	}

	return (
		<div className="visual-header">
			<Button className="time-box" shape="round">
				<FieldTimeOutlined style={{ color: '#000', fontSize: '14px' }} />
				<label className="time">当前时间戳： {selectTime}</label>
			</Button>
			<div className="title-info">
				<div className="title">GZSZYJ可视化系统</div>
				<Space className="sub-title">
					<Button
						size="small"
						shape="round"
						icon={<RadarChartOutlined />}
						onClick={() => window.open(`/szyj-menu/visual-data/ld?id=${testId}`)}
					>
						LDYJ
					</Button>
					<Button
						size="small"
						icon={<CodeSandboxOutlined />}
						shape="round"
						onClick={() => window.open(`/szyj-menu/visual-data/dygz?id=${testId}`)}
					>
						DWGZSZYJ
					</Button>
					<Button
						size="small"
						shape="round"
						icon={<SlidersOutlined />}
						onClick={() => window.open(`/szyj-menu/visual-data/gzdw?id=${testId}`)}
					>
						GZDW
					</Button>
				</Space>
			</div>
			<Space>
				<Button size="small" disabled shape="round" icon={<RocketOutlined />}>
					启动实验
				</Button>
				<Button size="small" onClick={openPages} shape="round" icon={<RocketOutlined />}>
					回放实验
				</Button>
			</Space>
		</div>
	)
}
