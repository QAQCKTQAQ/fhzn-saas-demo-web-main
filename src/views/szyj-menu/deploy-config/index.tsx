import './index.less'
import { ReducerContent } from './store/reducerContent'
// import OverView from './components/overview'
import ConfigDetail from './components/config-detail'
const DeployConfig = () => {
	return (
		<ReducerContent>
			<div className="m-page-deploy-config">
				{/* <OverView /> */}
				<ConfigDetail />
			</div>
		</ReducerContent>
	)
}

export default DeployConfig
