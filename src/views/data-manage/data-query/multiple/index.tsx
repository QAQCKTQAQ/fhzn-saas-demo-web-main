import { ReducerContent } from './store/reducerContent'
import './index.less'
import List from './components/list'
import MultipleSearchForm from './components/multiple-search-form'

const DataQuery = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-data-query-multiple">
				<MultipleSearchForm />
				<List />
			</div>
		</ReducerContent>
	)
}

export default DataQuery
