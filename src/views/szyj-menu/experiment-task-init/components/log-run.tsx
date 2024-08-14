/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 19:15:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-05 15:43:18
 */
import { Row } from 'antd'
// let currentDate = new Date()
const logData: any = [
	{ date: '12', des: 'DD1初始化开始！' },
	{ date: '2', des: 'LD识别算法YJ1自检完成！' },
	{ date: '3', des: 'LD识别算法YJ2自检完成！' },
	{ date: '3', des: 'LD识别算法YJ3自检完成！' },
	{ date: '3', des: 'DD2初始化开始...' }
]

const LogRun = () => {
	return (
		<div>
			{logData.map((item: any, index: any) => {
				const { des } = item
				const date: any =
					new Date().getFullYear() +
					'/' +
					(new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) +
					'/' +
					new Date().getDate() +
					'  ' +
					new Date().getHours() +
					': ' +
					(new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) +
					': ' +
					(new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds())
				return (
					<div key={index}>
						<Row>
							<span style={{ color: index === logData.length - 1 ? '#005DE5' : '#33333' }}>[{date} ] </span>
							<span style={{ color: index === logData.length - 1 ? '#005DE5' : '#33333' }}> {des}</span>
						</Row>
					</div>
				)
			})}
		</div>
	)
}

export default LogRun
