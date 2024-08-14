import './index.less'
import Container from './components/container'
import { ReducerContent } from './store/reducerContent'
import Header from './components/header'

const VisualDataLd = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-visual-data">
				<Header />
				<Container />
			</div>
		</ReducerContent>
	)
}

export default VisualDataLd
