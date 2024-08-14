/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-18 19:41:08
 */
import { ReducerContent } from './store/reducerContent'
import './index.less'
import MultipleSearchForm from './components/multiple-search-form'
import List from './components/list'

const DataQuery = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-data-query-earth">
				<MultipleSearchForm />
				<List />
			</div>
		</ReducerContent>
	)
}

export default DataQuery
