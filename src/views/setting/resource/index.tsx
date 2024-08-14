import SearchForm from './components/search-form'
import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import Tool from './components/tool'

const Resource = () => {
	return (
		<ReducerContent>
			<div className="card content-box">
				<SearchForm />
				<Tool />
				<List />
			</div>
		</ReducerContent>
	)
}

export default Resource
