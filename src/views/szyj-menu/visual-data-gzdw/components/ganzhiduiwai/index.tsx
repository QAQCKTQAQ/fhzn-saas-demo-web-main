import { useState } from 'react'
import './index.less'
import { Row, Col, Tabs } from 'antd'
import { GZDW_TYPE_ENUM } from './const'
import { FundProjectionScreenOutlined } from '@ant-design/icons'
import TestPlat from './components/test-plat'
const { FZBY_PT, JC_SZ_YJ } = GZDW_TYPE_ENUM

export default function GanZhiDuiWaiMultContainer() {
	const [selectCode, setSelectCode] = useState(FZBY_PT)

	const config_code_list: any = [
		{
			key: FZBY_PT,
			label: '仿真编演平台'
		},
		{
			key: JC_SZ_YJ,
			label: '决策数字样机'
		}
	]

	const renderContainerByCode = () => {
		if (selectCode === FZBY_PT) {
			return <TestPlat type={FZBY_PT} />
		}
		if (selectCode === JC_SZ_YJ) {
			return <TestPlat type={JC_SZ_YJ} />
		}
	}

	return (
		<div className="ganzhiduiwai-mult-container">
			<Tabs
				activeKey={selectCode}
				tabPosition={'left'}
				className="code-data-time-select"
				onChange={(v: any) => setSelectCode(v)}
				items={config_code_list.map((item: any) => {
					return {
						label: (
							<span>
								<FundProjectionScreenOutlined /> {item.label}
							</span>
						),
						key: item.key
					}
				})}
			/>
			<Row gutter={[0, 24]} className="mult-container-box">
				<Col span={24}>
					<div className="mult-container-item-box">{renderContainerByCode()}</div>
				</Col>
			</Row>
		</div>
	)
}
