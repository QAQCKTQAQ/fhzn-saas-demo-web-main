import { Card } from 'antd'
import './index.less'
import { ReducerContent } from './store/reducerContent'
import CreateAddYj from './components/create-add'

const SingleYjCreate = () => {
	return (
		<ReducerContent>
			<div className="content-box m-page-single-create">
				<Card title="创建数字样机" className="m-page-single-create-card">
					<CreateAddYj />
				</Card>
			</div>
		</ReducerContent>
	)
}

export default SingleYjCreate
