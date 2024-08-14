import { useContext } from 'react'
import { Context } from '../../store/reducerContent'
import { Button, Space } from 'antd'
import './index.less'
import { RocketOutlined, FieldTimeOutlined } from '@ant-design/icons'

export default function Header() {
	const { state, setSelectDdId } = useContext(Context)
	const selectTime = state?.selectTime || ''
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const dDList = state?.dDList || []

	return (
		<div className="visual-header">
			<Button className="time-box" shape="round">
				<FieldTimeOutlined style={{ color: '#000', fontSize: '14px' }} />
				<label className="time">当前时间戳： {selectTime}</label>
				<div className="select-dd-info">
					<div>
						<label>DanId:</label>
						{selectDdId}
					</div>
					<div>
						<label>主/从D:</label>
						{selectDdId?.isMain ? '主弹' : '从弹'}
					</div>
					<div>
						<label>Dmu距:</label>222m
					</div>
				</div>
			</Button>
			<div className="title-info">
				<div className="title">GZDW样机可视化</div>
			</div>
			<div className="dd-select-box">
				<Space>
					{(dDList || []).map((item: any) => {
						return (
							<div
								className={selectDdId === item?.instanceGroupId ? 'rocket-item active' : 'rocket-item'}
								key={item?.instanceGroupId}
								onClick={() => {
									setSelectDdId(item)
								}}
							>
								<RocketOutlined style={{ fontSize: '20px' }} />
								<div>{item.instanceGroupId}</div>
							</div>
						)
					})}
				</Space>
			</div>
		</div>
	)
}
