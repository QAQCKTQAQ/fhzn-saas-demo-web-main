import './index.less'
import { ReducerContent } from './store/reducerContent'
import { Tabs } from 'antd'
import BaseInfo from './components/base-info'
import ImageInfo from './components/image-info'
// import CharacterInfo from './components/character-info'
// import TestInfo from './components/test-info'
import BaseInfoModal from './components/base-info-modal'
import ParamInfoModal from './components/param-info-modal'
import CharacterFileModal from './components/character-file-modal'
const SingleYjDetail = () => {
	const tabItems = [
		{
			label: '基础信息',
			key: '1',
			children: <BaseInfo />
		},
		{
			label: '组合信息',
			key: '2',
			children: <ImageInfo />
		}
	]

	return (
		<ReducerContent>
			<div className="content-box m-page-combination-detail">
				<Tabs defaultActiveKey="1" type="card" items={tabItems} />
			</div>
			<BaseInfoModal />
			<ParamInfoModal />
			<CharacterFileModal />
		</ReducerContent>
	)
}

export default SingleYjDetail
