import { ReducerContent } from './store/reducerContent'
import './index.less'
import { Row, Col } from 'antd'
import SwiperContainer from './components/swiper'
import FileInfo from './components/file-info'

const FileDetail = () => {
	return (
		<ReducerContent>
			<div className="card content-box p-file-detail">
				<Row className="file-detail">
					<Col span={18} className="file-detail-container">
						<SwiperContainer />
					</Col>
					<Col span={6} className="file-info">
						<FileInfo />
					</Col>
				</Row>
			</div>
		</ReducerContent>
	)
}

export default FileDetail
