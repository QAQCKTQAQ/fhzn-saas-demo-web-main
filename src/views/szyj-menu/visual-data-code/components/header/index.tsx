import { useContext } from 'react'
import { Context } from '../../store/reducerContent'
import { Space } from 'antd'
import './index.less'
import { RocketOutlined } from '@ant-design/icons'
import SelectTime from '../select-time'

export default function Header() {
	const { state, setSelectDdId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const dDList = state?.dDList || []

	return (
		<div className="visual-header">
			<SelectTime />
			<div className="title-info">
				<div className="title">链路数据查询</div>
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
