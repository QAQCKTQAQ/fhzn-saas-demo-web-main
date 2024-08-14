import { Select, Space } from 'antd'
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { YJ_TYPES } from '../const'
import { RocketOutlined } from '@ant-design/icons'
import SelectTime from './select-time'

export default function SelectProto() {
	const { state, setSelectDdId } = useContext(Context)
	const selectType = state?.selectType || YJ_TYPES.SFSJ
	const selectDdId = state?.selectDdId || ''
	const selectTime = state?.selectTime || ''
	const dDList: any = state?.dDList || []
	const viewMode: any = state.viewMode

	const timeSliceRender = () => {
		if (
			selectType === YJ_TYPES.LD ||
			selectType === YJ_TYPES.RH ||
			selectType === YJ_TYPES.GZDW ||
			selectType === YJ_TYPES.GZ_STATUS
		) {
			return (
				<Space>
					<div className="title-box">
						<div className="title">当前时间戳：</div>
					</div>
					{selectTime}
				</Space>
			)
		}
		if (viewMode === 'list') {
			return <SelectTime />
		}
		return null
	}

	return (
		<div className="header">
			<Space>{timeSliceRender()}</Space>
			<Space>
				<div className="title-box">
					<div className="title">切换DD信息：</div>
				</div>
				<Select
					placeholder="请选择DD"
					value={selectDdId}
					onChange={(v: string) => setSelectDdId(v)}
					dropdownMatchSelectWidth={false}
				>
					{dDList.map((dd: any) => {
						return (
							<Select.Option value={dd.value} label={dd.label} key={dd.value}>
								<Space>
									<RocketOutlined />
									{dd.label}
								</Space>
							</Select.Option>
						)
					})}
				</Select>
			</Space>
		</div>
	)
}
