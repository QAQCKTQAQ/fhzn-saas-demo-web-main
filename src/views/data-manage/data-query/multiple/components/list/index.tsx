/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: ZeroSi
 * @LastEditTime: 2023-11-06 14:20:49
 */
import { Button, Col, Row, Space, Pagination, Empty } from 'antd'
import './index.less'
import { FlagOutlined, ProfileOutlined } from '@ant-design/icons'
import { ASYNC_SUBSCRIBE_MULTIPLE_SAVE_DATA_SET } from '../../const'
import React, { useContext, useState } from 'react'
import { Context } from '../../store/reducerContent'
import zw from '@/assets/images/zw.png'

export default function List() {
	const [currentPage, setCurrentPage] = useState(1)
	const {
		state: {
			list: { dataSource, pageInfo },
			loading
		},
		queryList
	} = useContext(Context)
	dataSource
	loading
	// 保存数据集
	const saveDataMultipleSaet = () => {
		PubSub.publish(ASYNC_SUBSCRIBE_MULTIPLE_SAVE_DATA_SET)
	}
	const imageDetail = (id: any) => {
		window.open(`/data-manage/ds-version-details-item?id=${id}&from=space`)
	}
	return (
		<div className="list-box">
			<div className="tool">
				<div className="title-box">
					<div className="title">查询结果：共{pageInfo.total}条数据</div>
				</div>
				<Space>
					<Button
						type="primary"
						onClick={() => {
							saveDataMultipleSaet()
						}}
					>
						保存数据集
					</Button>
					{/* <Button>下载</Button> */}
				</Space>
			</div>
			<div className="list-view-box">
				<Row gutter={[16, 16]}>
					{(dataSource?.length &&
						(dataSource || []).map((item: any) => {
							const { fileCode, type } = item
							return (
								<Col key={item?.id}>
									<div className="list-item">
										<a className="image-info">
											{(type === 2 && (
												<img
													onClick={() => {
														imageDetail(item.id)
													}}
													className="image"
													src={`/api/bff/download?fileCode=${fileCode}`}
												/>
											)) || (
												// 非图片类型
												<img className="image" src={zw} />
											)}
											<div className="title">{item?.name}</div>
											<div className="sub-title">目录：{item?.directoryType || '-'}</div>
										</a>
										<div className="item-info">
											<Space>
												<FlagOutlined title="标注" className={item?.haveAnnotation ? 'active' : 'unactive'} />
												<ProfileOutlined title="属性" className={item?.haveProperty ? 'active' : 'unactive'} />
											</Space>
											<span className="time">{item?.createdTime}</span>
										</div>
									</div>
								</Col>
							)
						})) || (
						<Col span={24}>
							<Empty></Empty>
						</Col>
					)}
				</Row>
			</div>
			<div className="page-box">
				<Pagination
					onChange={(page: any, pageSize: any) => {
						setCurrentPage(page)
						queryList({
							page,
							pageSize: pageSize
						})
					}}
					current={currentPage}
					total={pageInfo?.total || 0}
				/>
			</div>
		</div>
	)
}
