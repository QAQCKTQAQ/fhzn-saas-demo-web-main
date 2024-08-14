import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import './index.less'
import Tool from './components/tool'

const DataDS = () => {
	return (
		<ReducerContent>
			<>
				<div className="card content-box">
					<Tool />
					<List />
				</div>
			</>
		</ReducerContent>
	)
}

export default DataDS
