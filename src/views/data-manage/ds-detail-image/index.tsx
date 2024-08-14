/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-29 11:17:53
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-05 13:36:27
 */
import { ReducerContent } from './store/reducerContent'
import BaseInfo from './components/base-info'
import List from './components/list'
import './index.less'
const DataDS = () => {
	return (
		<ReducerContent>
			<div className="content-box p-data-set-image-list">
				<BaseInfo />
				<List />
			</div>
		</ReducerContent>
	)
}

export default DataDS
