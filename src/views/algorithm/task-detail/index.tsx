/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-10 14:29:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-13 14:42:21
 */
import './index.less'
import { ReducerContent } from './store/reducerContent'
import BaseInfo from './components/base-info'
import OperationInfo from './components/operation-info'
import TrainingSettingInfo from './components/training-setting'
import SourceInfo from './components/source-info'
import ModelModal from '../training-task/components/model-modal'
import IndicatorsInfo from './components/indicators-info'

const TaskDetail = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-training-task-detail">
				<div className="layout-box">
					<BaseInfo />
					<div className="side-right">
						<OperationInfo />
						<SourceInfo />
						<TrainingSettingInfo />
						<IndicatorsInfo />
					</div>
				</div>
			</div>
			<ModelModal />
		</ReducerContent>
	)
}

export default TaskDetail
