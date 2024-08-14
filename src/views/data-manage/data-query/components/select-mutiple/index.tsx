/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 14:01:34
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-06 18:35:04
 */
import { Select } from 'antd'
import { useState, useEffect } from 'react'
import { getMultiDimensionalValue } from '@/api/modules/nultiple-manage'
export default function SelectMultiple(props: any) {
	const { field, onChange } = props
	const [valueSelect, setValueSelect] = useState<any>([])
	const [options, setOptions] = useState<any>([])
	useEffect(() => {
		getMultiDimensionalValueData(field)
	}, [field])
	const onChangeData = (v: any) => {
		setValueSelect(v)
		onChange({ field: field, values: v })
	}
	// 获取多维度检索字段枚举值信息
	const getMultiDimensionalValueData: any = async (field: any) => {
		const data: any = await getMultiDimensionalValue(field)
		const options: any = handleOptions(data)
		setOptions(options)
	}
	// 处理options
	const handleOptions = (data: any) => {
		let arr: any = []
		;(data || []).map((item: any) => {
			arr.push({ label: item, value: item })
		})
		return arr
	}
	return (
		<div>
			<Select
				options={options}
				onChange={onChangeData}
				value={valueSelect}
				mode={'multiple'}
				placeholder={'请选择(可多选)'}
				showArrow={true}
				allowClear
			/>
		</div>
	)
}
