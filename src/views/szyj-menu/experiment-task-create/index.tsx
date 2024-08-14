/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-11 11:31:34
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-17 11:34:10
 */
import { Card } from 'antd'
import './index.less'
import { ReducerContent } from './store/reducerContent'
import CreateExperimentTask from './components/create-add'
import React from 'react'

const ExperimentTaskCreate = () => {
	return (
		<ReducerContent>
			<div className="content-box experiment-page-create">
				<Card title="创建试验任务">
					<CreateExperimentTask />
				</Card>
			</div>
		</ReducerContent>
	)
}

export default ExperimentTaskCreate
