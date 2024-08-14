import './index.less'
import { ReducerContent } from './store/reducerContent'
import AssociatedResource from './components/associated-resource'
import SettingInfo from './components/setting-info'
import BaseInfo from './components/base-info'

const CharacterInfoDetail = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-charactar-info-detail">
				<div className="layout-box">
					<BaseInfo />
					<div className="side-right">
						<SettingInfo />
						<AssociatedResource />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default CharacterInfoDetail
