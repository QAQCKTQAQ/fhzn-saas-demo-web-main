/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-16 14:31:58
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-16 15:36:46
 */
import { Checkbox } from 'antd'
import szyjMask from '@/assets/images/szyjMask.jpg'
const data: any = [
	{ name: 'DD运动行为模型', url: szyjMask },
	{ name: '探测模型', url: szyjMask },
	{ name: 'GR设备模型', url: szyjMask },
	{ name: '数据链模型', url: szyjMask }
]
export default function YjList() {
	return (
		<>
			<div className="side-bottom-box">
				{data.map((item: any, index: any) => {
					return (
						<Checkbox key={index}>
							<img className="yj-img" src={item.url} />
						</Checkbox>
					)
				})}
			</div>
		</>
	)
}
