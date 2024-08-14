import './index.less'
import { ReducerContent } from './store/reducerContent'
import TestInfo from './components/test-info'
import BaseInfo from './components/base-info'
import IndicatorInfo from './components/indicator-info'

const ModelDetail = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-model-detail">
				<div className="layout-box">
					<BaseInfo />
					<div className="side-right">
						<IndicatorInfo />
						<TestInfo />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default ModelDetail
