/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-13 15:08:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-13 16:13:39
 */
import React, { useEffect, useState } from 'react'
import { dataSetImgMap } from '@/api/modules/data-set'
import { Tabs, Image, Pagination } from 'antd'
import '../index.less'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PlayCircleOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { dataSetAnnotationCount } from '@/api/modules/data-set'

interface type {
	annotatedFileNumber?: any
	notAnnotatedFileNumber?: any
}

interface pageType {
	page?: any
	total?: any
	pageSize?: any
}
const initParams: any = {
	page: 1,
	pageSize: 24
}
function ImageList() {
	const [annotationCount, setAnnotationCount] = useState<type>({})
	const [imgData, setImgData] = useState([])
	const [pageInfo, setPageInfo] = useState<pageType>(initParams)
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const version = search.get('version')
	useEffect(() => {
		getAnnotationCount()
		GetDataSetImgMap(initParams)
	}, [])

	// tab切换
	const onChange = (key: any) => {
		console.log(key)
		let num = key == 2 ? true : key == 3 ? false : ''
		let value = num
		GetDataSetImgMap({ ...initParams, isAnnotated: value })
	}
	// 获取数据集数据
	const GetDataSetImgMap = (params: any) => {
		let newParams = params || initParams
		dataSetImgMap(id, version, { ...newParams })
			.then((res: any) => {
				const { items = [], ...rest } = res
				setImgData(items || [])
				setPageInfo(rest)
			})
			.finally(() => {})
	}
	// 获取数据集数量
	const getAnnotationCount = () => {
		dataSetAnnotationCount(id, version, {})
			.then((res: any) => {
				setAnnotationCount(res)
			})
			.finally(() => {})
	}
	return (
		<div className="container-div">
			<Tabs
				defaultActiveKey="1"
				onChange={onChange}
				items={[
					{
						label: `全部${annotationCount.annotatedFileNumber + annotationCount.notAnnotatedFileNumber}`,
						key: '1'
					},
					{
						label: `有标注${annotationCount.annotatedFileNumber}`,
						key: '2'
					},
					{
						label: `无标注${annotationCount.notAnnotatedFileNumber}`,
						key: '3'
					}
				]}
			/>

			<div id="images" className="image-content">
				<div className="image-content-group">
					{imgData.map((image: any, index: any) => {
						const { fileCode, id, type } = image
						return (
							<div key={index} className="card">
								<div className="card-body">
									<Link to={`/data-manage/ds-version-details-item?id=${id}`}>
										{type === 2 && <Image className="card-image" src={`/api/bff/download?fileCode=${fileCode}`} />}
										{type === 3 && <PlayCircleOutlined />}
										{type === 1 && <FolderOpenOutlined />}
									</Link>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className="bot_page">
				{/* <Pagination
					total={pageInfo.total}
					pageSize={pageInfo.pageSize}
					current={pageInfo.page}
					showQuickJumper={true}
					showSizeChanger={true}
					showTotal={total => `共 ${total} 条`}
					onChange={(pageNum, pageSize) => GetDataSetImgMap({ page: pageNum, pageSize })}
					defaultCurrent={1}
				/> */}
				<Pagination
					defaultCurrent={1}
					current={pageInfo.page}
					total={pageInfo.total}
					pageSize={pageInfo.pageSize}
					onChange={(pageNum, pageSize) => GetDataSetImgMap({ page: pageNum, pageSize })}
				/>
			</div>
		</div>
	)
}

export default ImageList
