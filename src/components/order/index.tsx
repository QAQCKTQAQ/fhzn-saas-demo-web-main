/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-11-06 14:12:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-08 15:16:48
 */
import order from '@/assets/images/data-space/order2.png'
import { Select, Divider, Space, Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import './index.less'
import React, { useState } from 'react'
const items = [
	{ value: 3, label: '文件类型' },
	{ value: 1, label: '创建时间' },
	{ value: 2, label: '更新时间' },
	{ value: 4, label: '默认' }
]
function OrderCom(props: any) {
	const { data = items, changeOrderSort } = props
	const [typeOrder, setTypeOrder] = useState<any>('dwon')
	const [visible, setVisible] = useState(false)
	const [selectedValue, setSelectedValue] = useState(null)

	const addItem = (e: React.MouseEvent<HTMLAnchorElement>, type: any) => {
		e.preventDefault()
		setTypeOrder(type)
		if (selectedValue) {
			setVisible(false) // 收起下拉框
			changeOrderSort && changeOrderSort({ e: selectedValue, type: type })
		}
	}
	const onChangeSelect = (e: any) => {
		console.log('onChangeSelect', e)
		setSelectedValue(e)
		setVisible(false) // 收起下拉框
		changeOrderSort && changeOrderSort({ e, type: typeOrder })
	}
	// 图标展开下拉框
	const openSelect = () => {
		let selectElement = document.getElementById('order-select-sort')
		let event = new MouseEvent('mousedown', {
			view: window,
			bubbles: true,
			cancelable: true
		})
		selectElement?.dispatchEvent(event)
	}
	// 拓展点击
	const handleVisibleChange = (flag: any) => {
		setVisible(flag)
	}
	const dropdownRender = (menu: any) => {
		return (
			<div>
				<div>{menu}</div>
				<Divider style={{ margin: '8px 0' }} />
				<Space direction="vertical" style={{ padding: '0 12px 4px' }}>
					<Button
						type="text"
						size="small"
						style={{
							backgroundColor: typeOrder === 'up' ? '#1890ff' : '#ffffff',
							color: typeOrder === 'up' ? '#ffffff' : '#000000'
						}}
						icon={<ArrowUpOutlined />}
						onClick={(e: any) => {
							addItem(e, 'up')
						}}
					>
						升序
					</Button>
					<Button
						size="small"
						type="text"
						style={{
							backgroundColor: typeOrder === 'dwon' ? '#1890ff' : '#ffffff',
							color: typeOrder === 'dwon' ? '#ffffff' : '#000000'
						}}
						icon={<ArrowDownOutlined />}
						onClick={(e: any) => {
							addItem(e, 'dwon')
						}}
					>
						降序
					</Button>
				</Space>
			</div>
		)
	}
	return (
		<div className="order-com-content">
			<Select
				id="order-select-sort"
				style={{ width: 84 }}
				bordered={false}
				showArrow={false}
				size="small"
				value={selectedValue}
				onSelect={onChangeSelect}
				onDropdownVisibleChange={handleVisibleChange}
				open={visible}
				dropdownRender={dropdownRender}
				options={data.map((item: any) => ({ label: item.label, value: item.value }))}
			/>
			{<img onClick={openSelect} id="img-select-button" className="order-list" src={order} />}
		</div>
	)
}
export default OrderCom
