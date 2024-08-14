import { ReducerContent } from './store/reducerContent'
import './index.less'
import { Space } from 'antd'
import TreeView from './components/tree-view'
import { CodepenOutlined } from '@ant-design/icons'
import SpaceContainer from './components/space'

const SpaceView = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-space">
				<div className="space-container">
					<div className="tree-view">
						<div className="tree-view-title">
							<Space>
								<CodepenOutlined />
								目录结构
							</Space>
						</div>
						<TreeView />
					</div>
					<div className="list-view">
						<SpaceContainer />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default SpaceView
