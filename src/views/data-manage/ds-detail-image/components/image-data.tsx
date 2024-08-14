/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-19 13:57:01
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-13 15:05:27
 */
import React, { useReducer, useRef, useEffect, useState } from 'react'
import { Tabs, Image } from 'antd'
import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks'
import '../index.less'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PlayCircleOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { dataSetAnnotationCount } from '@/api/modules/data-set'
interface type {
	annotatedFileNumber?: any
	notAnnotatedFileNumber?: any
}
function ImageData() {
	useEffect(() => {
		getBasicInformation()
	}, [])
	const [annotationCount, setAnnotationCount] = useState<type>({})
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const version = search.get('version')

	const imgReducer = (state: any, action: any) => {
		switch (action.type) {
			case 'STACK_IMAGES':
				return { ...state, images: state.images.concat(action.images) }
			case 'FETCHING_IMAGES':
				return { ...state, fetching: action.fetching }
			default:
				return state
		}
	}

	const pageReducer = (state: any, action: any) => {
		switch (action.type) {
			case 'ADVANCE_PAGE':
				return { ...state, page: state.page + 1 }
			default:
				return state
		}
	}

	const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1, id: id, version: version })
	const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })

	let bottomBoundaryRef = useRef(null)
	useFetch(pager, imgDispatch)
	useLazyLoading('.card-img-top', imgData.images)
	useInfiniteScroll(bottomBoundaryRef, pagerDispatch)
	// tab切换
	const onChange = (key: string) => {
		console.log(key)
		const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1, id: id, version: version })
		const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })

		let bottomBoundaryRef = useRef(null)
		useFetch(pager, imgDispatch)
		useLazyLoading('.card-img-top', imgData.images)
		useInfiniteScroll(bottomBoundaryRef, pagerDispatch)
	}
	// 获取数据集数量
	const getBasicInformation = () => {
		dataSetAnnotationCount(id, version, {})
			.then((res: any) => {
				console.log(res)
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
					{imgData.images.map((image: any, index: any) => {
						const { fileCode, id, type } = image
						return (
							<div key={index} className="card">
								<div className="card-body">
									<Link to={`/data-manage/ds-version-details-item?id=${id}`}>
										{type === 2 && <Image src={`/api/bff/download?fileCode=${fileCode}`} />}
										{type === 3 && <PlayCircleOutlined />}
										{type === 1 && <FolderOpenOutlined />}
									</Link>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{imgData.fetching && (
				<div className="text-center bg-secondary m-auto p-3">
					<p className="m-0 text-white">Getting images</p>
				</div>
			)}
			<div id="page-bottom-boundary" style={{ border: '1px solid transparent' }} ref={bottomBoundaryRef}></div>
		</div>
	)
}

export default ImageData
