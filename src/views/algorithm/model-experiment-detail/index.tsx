/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-16 16:03:45
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-13 13:59:12
 */
import './index.less'
import { ReducerContent } from './store/reducerContent'
import BaseInfo from './components/base-info'

// import TableInfo from './components/table-info'
import IndicatorOutput from './components/indicator-output/index'

const ModelExperimentDetail = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-model-experiment-detail">
				<div className="layout-box">
					<BaseInfo />
					<div className="side-right">
						<IndicatorOutput />
						{/* <TableInfo /> */}
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default ModelExperimentDetail
