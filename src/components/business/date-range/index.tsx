// 日期范围限制在一个月以内，且不超出当前日期
import { DatePicker } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
const { RangePicker } = DatePicker

export default function DateRange(props: any) {
	const { defaultValue, onChange, ...rest } = props
	const [dates, setDates] = useState<any>(null)
	const [value, setValue] = useState<any>(null)

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue)
			onChange(defaultValue)
		}
	}, [])

	// 限制范围30天
	const disabledDate = (current: any) => {
		if (dates && dates.length) {
			if (dates[1]) {
				return (
					moment(dates[1]).subtract(29, 'days') > moment(current) ||
					moment(dates[1]).add(29, 'days') < moment(current) ||
					current >= moment()
				)
			}
			return (
				moment(dates[0]).subtract(29, 'days') > moment(current) ||
				moment(dates[0]).add(29, 'days') < moment(current) ||
				current >= moment()
			)
		}
		return current && current >= moment()
	}

	const onOpenChange = (open: boolean) => {
		if (open) {
			setDates([null, null])
		} else {
			setDates(null)
		}
	}
	return (
		<RangePicker
			value={dates || value}
			disabledDate={disabledDate}
			onCalendarChange={val => setDates(val)}
			onChange={val => {
				setValue(val)
				onChange(val)
			}}
			onOpenChange={onOpenChange}
			{...rest}
			style={{ width: '100%' }}
		/>
	)
}
