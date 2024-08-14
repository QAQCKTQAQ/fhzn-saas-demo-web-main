/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 14:46:00
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-18 17:17:18
 */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-17 10:35:09
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-17 11:16:34
 */
import { Input } from 'antd'
import { useState } from 'react'
export default function InputSingle(props: any) {
	console.log('props===', props)
	const { onChange, field } = props
	const [val, setVal] = useState<any>('')
	const changeData = (e: any) => {
		const { value } = e.target || {}
		console.log(value)
		setVal(value)
		onChange({ field: field, values: [value] })
	}
	return (
		<div>
			<Input type="number" allowClear onChange={changeData} value={val} placeholder="请输入" />
		</div>
	)
}
