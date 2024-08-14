/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-21 14:59:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-04 13:37:53
 */
import { ReducerContent } from './store/reducerContent'
import './index.less'
import TreeView from './components/tree-view'
import Container from './components/container'

const DataSpaceContent = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-data-space-manage">
				<div className="space-container">
					<div className="tree-view">
						<TreeView />
					</div>
					<div className="list-view">
						<Container />
					</div>
				</div>
			</div>
		</ReducerContent>
	)
}

export default DataSpaceContent
