import SearchForm from './components/search-form'
import List from './components/list'
import { ReducerContent } from './store/reducerContent'
import Tool from './components/tool'
import './index.less'
import { Row, Col } from 'antd'
import UserModal from './components/user-modal'
const User = () => {
	return (
		<ReducerContent>
			<div className="card content-box m-page-user">
				<Row gutter={[8, 8]}>
					<Col span={24}>
						<SearchForm />
					</Col>
					<Col span={24}>
						<UserModal />
					</Col>
					<Col span={12}>
						<Tool />
					</Col>
					<Col span={24}>
						<List />
					</Col>
				</Row>
			</div>
		</ReducerContent>
	)
}

export default User
