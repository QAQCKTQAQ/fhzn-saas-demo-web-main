/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 13:29:16
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-08 14:43:36
 */
import { DatePicker } from 'antd'
import { useState } from 'react'

export default function RangeDate(props: any) {
	const { onChange, field } = props
	const { RangePicker } = DatePicker
	const [setValueDate] = useState<any>([])
	const dateFormat = 'YYYY-MM-DD'
	const onChangeDate = (e: any) => {
		let date: any = e ? [e[0].format('YYYY-MM-DD'), e[1].format('YYYY-MM-DD')] : []
		let dateData: any = {
			field: field,
			values: date || []
		}
		setValueDate(date)
		onChange(dateData)
	}

	return (
		<div>
			<RangePicker onChange={onChangeDate} format={dateFormat} allowClear style={{ width: '100%' }} />
		</div>
	)
}
