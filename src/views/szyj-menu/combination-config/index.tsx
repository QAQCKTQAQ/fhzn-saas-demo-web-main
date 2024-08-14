import { ReducerContent } from './store/reducerContent'
import './index.less'
import ConfigInfoModal from './components/config-info-modal'
import HandleBox from './components/handle-box'
import ConfigContainer from './components/config-container'

const CombinationConfig = (props: any) => {
	const { disabledAction } = props
	return (
		<ReducerContent>
			<div className="content-box m-page-combination-config">
				<ConfigContainer />
				{(!disabledAction && <HandleBox />) || null}
			</div>
			<ConfigInfoModal />
		</ReducerContent>
	)
}

export default CombinationConfig
