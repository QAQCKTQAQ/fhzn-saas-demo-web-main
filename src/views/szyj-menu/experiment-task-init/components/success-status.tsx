/* eslint-disable react/jsx-key */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 19:15:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-05 15:04:38
 */
import React, { Row, Col, Steps } from 'antd'
import success from '@/assets/images/success.png'
import not_start from '@/assets/images/not_start.png'
import process from '@/assets/images/process.png'
import '../index.less'
import '../index.css'
const SuccessStatus = () => {
	const initData: any = [
		{
			status: 1,
			dname: 'DD1',
			icon: '主',
			current: 3,
			items: [{ title: 'LD识别算法YJ1' }, { title: 'LD识别算法YJ2' }, { title: 'LD识别算法YJ3' }]
		},
		{
			status: 2,
			dname: 'DD2',
			icon: '从',
			current: 1,
			items: [{ title: 'LD识别算法YJ1' }, { title: 'LD识别算法YJ2' }, { title: 'LD识别算法YJ3' }, { title: 'LD识别算法YJ4' }]
		},
		{
			status: 0,
			dname: 'DD3',
			icon: '从',
			current: -1,
			items: [
				{ title: 'LD识别算法YJ1' },
				{ title: 'LD识别算法YJ2' },
				{ title: 'LD识别算法YJ3' },
				{ title: 'LD识别算法YJ4' },
				{ title: 'LD识别算法YJ5' }
			]
		}
	]
	return (
		<div className="row">
			{initData.map((item: any, index: any) => {
				const { status, dname } = item
				return (
					<div key={index}>
						<Row gutter={24} style={{ marginTop: '50px' }}>
							<Col span={4}>
								<Row gutter={24}>
									<Col span={24}>
										<Row>
											<Col>
												<img
													className={'icon loader-init-experiment'}
													style={{ display: status === 2 ? '' : 'none' }}
													src={status === 1 ? success : status === 2 ? process : not_start}
												/>
												{/* <div style={{ display: 'flex', flexDirection: 'column' }}>
													<img
														className={'icon loader-init-experiment'}
														style={{ display: status === 2 ? '' : 'none' }}
														src={status === 1 ? success : status === 2 ? process : not_start}
													/>
													<img
														className={'icon loader-init-experiment-end'}
														style={{ display: status === 2 ? '' : 'none' }}
														src={status === 1 ? success : status === 2 ? process : not_start}
													/>
												</div> */}
											</Col>
											<img
												className={'icon'}
												style={{ display: status === 2 ? 'none' : '' }}
												src={status === 1 ? success : status === 2 ? process : not_start}
											/>
											<p className="icon_name">{dname}</p>
										</Row>
									</Col>
								</Row>
							</Col>
							<Col span={20}>
								<div>
									<Steps current={item.current} items={item?.items} />
								</div>
							</Col>
						</Row>
						<Row>{index < initData.length - 1 && <div className="line"></div>}</Row>
					</div>
				)
			})}
		</div>
	)
}

export default SuccessStatus
