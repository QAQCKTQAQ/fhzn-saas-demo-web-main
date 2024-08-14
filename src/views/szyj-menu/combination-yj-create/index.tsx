import { Card } from 'antd'
import './index.less'
import { ReducerContent } from './store/reducerContent'
import CreateAddYj from './components/create-add'

const SingleYjCreate = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-combination-yj-create">
				<Card title="创建组合实例YJ" className="m-page-combination-yj-card">
					<CreateAddYj />
				</Card>
			</div>
		</ReducerContent>
	)
}

export default SingleYjCreate
