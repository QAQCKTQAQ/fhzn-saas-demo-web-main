import { ReducerContent } from './store/reducerContent'
import './index.less'
import TreeView from './components/tree-view'
import DictList from './components/dict-list'

const User = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-digital-dict">
				<div className="space-container">
					<div className="tree-view">
						<TreeView />
					</div>
					<div className="list-view">
						<DictList />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default User
