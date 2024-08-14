/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-19 14:45:09
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-19 15:16:55
 */
import { useContext, useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
// import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import ImageViewer from '../image'
import { Context } from '../../store/reducerContent'
import { baseURL } from '@/config/config'
// import { useNavigate, useLocation } from 'react-router-dom'

const SwiperContainer = () => {
	const { state } = useContext(Context)
	const { fileDetailData = {} } = state || {}
	const [path, setPath] = useState('')
	// const navigate = useNavigate()
	// const location = useLocation()

	useEffect(() => {
		const { fileCode, name } = fileDetailData
		if (fileCode) {
			setPath(`${baseURL}/bff/download?fileCode=${fileCode}&fileName=${name}`)
		}
	}, [fileDetailData])

	// const prevClick = () => {
	// 	return
	// 	navigate(`/data-manage/folder-file/file-detail/${prevId}${location.search}`)
	// }

	// const nextClick = () => {
	// 	return
	// 	navigate(`/data-manage/folder-file/file-detail/${nextId}${location.search}`)
	// }

	return (
		<Row justify="center" align="middle" className="file-detail-swiper">
			{(path && (
				<>
					{/* <Col span={2}>
						<LeftCircleOutlined onClick={prevClick} className={`step-icon ${prevId ? '' : 'disabled'}`} />
					</Col> */}
					<Col span={20} className="file-detail-swiper-view">
						<ImageViewer path={path} />
					</Col>
					{/* <Col span={2}>
						<RightCircleOutlined onClick={nextClick} className={`step-icon ${nextId ? '' : 'disabled'}`} />
					</Col> */}
				</>
			)) || <Spin />}
		</Row>
	)
}

export default SwiperContainer
