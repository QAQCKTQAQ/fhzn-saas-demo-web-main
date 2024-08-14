import './index.less'
import { ReducerContent } from './store/reducerContent'
import Container from './components/container'
const ParamsConfig = () => {
	return (
		<ReducerContent>
			<div className="card content-box m-page-params-config">
				<Container />
			</div>
		</ReducerContent>
	)
}

export default ParamsConfig
