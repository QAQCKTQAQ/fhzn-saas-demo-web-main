import { Select, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/reducerContent'
import { FieldTimeOutlined } from '@ant-design/icons'
import { getTimeListApi } from '@/api/modules/visual-data'
import { debounce } from 'lodash'

export default function SelectTime() {
	const { state, testId, setChangeSelectTime } = useContext(Context)
	// dd id
	const selectDdId = state?.selectDdId || ''
	const changeSelectTime = state?.changeSelectTime || ''
	// 时间片列表
	const [selectTimeList, setSelectTimeList] = useState<any>([])

	useEffect(() => {
		if (selectDdId) {
			getTimeList('')
		}
	}, [selectDdId])

	// 获取时间戳列表
	const getTimeList = async (time: any) => {
		const res: any = await getTimeListApi(testId, {
			page: 1,
			pageSize: 100000,
			time
		})
		const selectTimeList = res?.items || []
		setSelectTimeList(selectTimeList)
	}

	return (
		<Select
			className="time-select-box"
			placeholder="请选择时间戳"
			value={changeSelectTime || undefined}
			onChange={(v: any) => setChangeSelectTime(v)}
			optionFilterProp="label"
			showSearch
			onSearch={debounce((value: any) => {
				getTimeList(value)
			}, 800)}
			filterOption={(input, option) => {
				const label = option?.label ?? ''
				return `${label}`.toLowerCase().includes(input.toLowerCase())
			}}
		>
			{selectTimeList.map((value: any) => {
				return (
					<Select.Option value={value} label={value} key={value}>
						<Space>
							<FieldTimeOutlined />
							{value}
						</Space>
					</Select.Option>
				)
			})}
		</Select>
	)
}
