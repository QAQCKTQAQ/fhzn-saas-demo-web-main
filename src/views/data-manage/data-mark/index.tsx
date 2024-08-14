import './index.less'
import { ReducerContent } from './store/reducerContent'
import HeaderTool from './components/header-tool'
import Editer from './components/canvas/editer'

const DataRemark = (props: any) => {
	return (
		<ReducerContent extraInfo={props?.extraInfo || {}}>
			<div className="content-box data-mark-page">
				<div className="label-image-box">
					<HeaderTool />
					<Editer />
				</div>
			</div>
		</ReducerContent>
	)
}

export default DataRemark
