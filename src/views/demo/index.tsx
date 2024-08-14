import SearchForm from './components/search-form'
import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import Tool from './components/tool'
import './index.less'

const User = () => {
	return (
		<ReducerContent>
			<div className="card content-box m-page-demo">
				<SearchForm />
				<Tool />
				<List />
			</div>
		</ReducerContent>
	)
}

export default User
