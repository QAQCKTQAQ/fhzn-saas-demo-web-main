/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-19 14:33:37
 * @LastEditors: ZeroSi
 * @LastEditTime: 2023-11-02 17:58:39
 */
import { ReducerContent } from './store/reducerContent'
import './index.less'
import SwiperContainer from './components/swiper'
import FileInfo from './components/file-info'

const DsVersionDetailsItem = () => {
	return (
		<ReducerContent>
			<div className="content-box ds-item-detail">
				<div className="ds-version-detail-item">
					<div className="file-info">
						<FileInfo />
					</div>
					<div className="file-detail-container">
						<SwiperContainer />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default DsVersionDetailsItem
