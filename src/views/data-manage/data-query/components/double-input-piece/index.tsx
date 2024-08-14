/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-18 13:29:16
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-06 18:29:31
 */
import { InputNumber, Row, Col } from 'antd'
import { useState } from 'react'
import './index.less'

export default function DoubleInputPiece(props: any) {
	const { onChange, field, ...rest } = props
	rest
	const [start, setStart] = useState('')
	const [end, setEnd] = useState('')
	// 处理最小值输入跟最大值处理逻辑和变量不一样
	const onChangeStart = (e: any) => {
		const { value } = e.target || {}
		setStart(value)
		let obj: any = { field: '', values: [] }
		obj.field = field
		if (end == '' && value == '') {
			obj.values = []
		} else if (value && end == '') {
			obj.values = [value, '-']
		} else if (value == '' && end) {
			obj.values = ['-', value]
		} else if (value != '' && end != '') {
			obj.values = [start, end]
		} else {
			obj.values = []
		}
		onChange({ field: field, values: obj.values })
	}
	// 处理最大值输入跟最小值处理逻辑和变量不一样
	const onChangeEnd = (e: any) => {
		const { value } = e.target || {}
		setEnd(value)
		let obj: any = { field: '', values: [] }
		obj.field = field
		if (value == '' && start == '') {
			obj.values = []
		} else if (start && value == '') {
			obj.values = [start, '-']
		} else if (start == '' && value) {
			obj.values = ['-', value]
		} else if (start != '' && value != '') {
			obj.values = [start, value]
		} else {
			obj.values = []
		}
		onChange({ field: field, values: obj.values })
	}

	return (
		<div className="content-double-input-piece">
			<Row gutter={24}>
				<Col span={8}>
					<InputNumber onChange={onChangeStart} type="number" controls={true} placeholder="最小值" value={start} />
				</Col>
				<Col span={3}></Col>
				<Col span={8}>
					<InputNumber onChange={onChangeEnd} type="number" controls={true} placeholder="最大值" value={end} />
				</Col>
			</Row>
		</div>
	)
}
