import './index.less'
import { Row, Col } from 'antd'
import PassQuery from './components/pws-query'
import PassReset from './components/pws-reset'
import PassEdit from './components/pws-edit'
const PassWord = () => {
	return (
		<div className="content-box m-page-user-password">
			<Row gutter={[8, 8]}>
				<Col span={12}>
					<PassQuery />
				</Col>
				<Col span={12}>
					<PassReset />
				</Col>
				<Col span={24}>
					<PassEdit />
				</Col>
			</Row>
		</div>
	)
}

export default PassWord
