import './index.less'
import { ReducerContent } from './store/reducerContent'
import BaseInfo from './components/base-info'
// import ImageInfo from './components/image-info'
// import { UploadOutlined } from '@ant-design/icons'
// import { ASYNC_SUBSCRIBE_IMAGE_INFO_MODAL } from './const'
// import PubSub from 'pubsub-js'
// import ImageInfoModal from './components/image-info-modal'
// import DeployInfoModal from './components/deploy-info-modal'
// import CombinationInfo from './components/combination-info'
import AssociatedResource from './components/associated-resource'
import SettingInfo from './components/setting-info'

const SingleYjDetail = () => {
	// const uploadRender = () => {
	// 	return (
	// 		<Button onClick={() => PubSub.publishSync(ASYNC_SUBSCRIBE_IMAGE_INFO_MODAL)} icon={<UploadOutlined />}>
	// 			本地上传
	// 		</Button>
	// 	)
	// }
	return (
		<ReducerContent>
			<div className="content-box m-page-single-detail">
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

export default SingleYjDetail
