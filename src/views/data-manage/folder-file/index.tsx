import SearchForm from './components/search-form'
import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import Tool from './components/tool'
import './index.less'

const FolderFile = (props: any) => {
	const { id } = props
	return (
		<ReducerContent id={id}>
			<SearchForm />
			<Tool />
			<List />
		</ReducerContent>
	)
}

export default FolderFile
