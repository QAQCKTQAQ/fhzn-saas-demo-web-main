import './index.less'
import TreeView from './components/tree-view'
import VisualContainer from './components/visual-container'
import { ReducerContent } from './store/reducerContent'

const VisualData = () => {
	return (
		<ReducerContent>
			<div className="m-page-visual-more">
				<div className="visual-more-container">
					<div className="tree-view">
						<TreeView />
					</div>
					<div className="list-view">
						<VisualContainer />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default VisualData
