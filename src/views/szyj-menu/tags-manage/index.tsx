import SearchForm from './components/search-form'
import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import Tool from './components/tool'

const User = () => {
	return (
		<ReducerContent>
			<div className="card content-box m-page-user">
				<SearchForm />
				<Tool />
				<List />
			</div>
		</ReducerContent>
	)
}

export default User
