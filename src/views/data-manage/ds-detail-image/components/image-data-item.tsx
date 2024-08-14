/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-19 14:41:30
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-18 16:11:15
 */
import React, { useState, useEffect } from 'react'
import { Tabs, Image, Empty } from 'antd'
import '../imageItem.less'
import { dataSetImgMap } from '@/api/modules/data-set'
import { useSearchParams } from 'react-router-dom'
function ImageDataItem() {
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const version = search.get('version')
	const onChange = (key: string) => {
		console.log(key)
	}
	const [imageData, setImageData] = useState([])
	console.log(imageData)
	useEffect(() => {
		getDataSetImgMap()
	}, [])
	const getDataSetImgMap = () => {
		let params = { id: id, page: 1, pageSize: 50 }
		dataSetImgMap(id, version, params)
			.then((res: any) => {
				setImageData(res?.items || [])
			})
			.finally(() => {
				// setLoading(false)
			})
	}

	return imageData && imageData.length > 1 ? (
		<div className="container-div">
			<Tabs
				defaultActiveKey="1"
				onChange={onChange}
				items={[
					{
						label: `全部`,
						key: '1'
					}
					// ,
					// {
					// 	label: `有标注信息`,
					// 	key: '2'
					// },
					// {
					// 	label: `无标注信息`,
					// 	key: '3'
					// }
				]}
			/>
			<div id="images" className="image-content">
				<div className="image-content-group">
					{imageData.map((image: any, index: any) => {
						// const { author, download_url } = image
						const { fileCode } = image
						return (
							<div key={index} className="card">
								<div className="card-body">
									<Image src={`/api/bff/download?fileCode=${fileCode}`} />
									{/* <img alt={author} data-src={download_url} className="card-img-top" src={download_url} /> */}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	) : (
		<div className="container-div">
			<Tabs
				defaultActiveKey="1"
				onChange={onChange}
				items={[
					{
						label: `全部`,
						key: '1'
					},
					{
						label: `有标注信息`,
						key: '2'
					},
					{
						label: `无标注信息`,
						key: '3'
					}
				]}
			/>
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
		</div>
	)
}

export default ImageDataItem
