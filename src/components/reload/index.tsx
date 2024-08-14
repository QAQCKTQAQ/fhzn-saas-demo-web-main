import './index.less'
import { RedoOutlined } from '@ant-design/icons'

const ReLoad = (props: any) => {
	const { reload } = props
	const reloadData = () => {
		reload && reload()
	}
	return <RedoOutlined style={{ fontSize: '15px' }} onClick={reloadData} />
}

export default ReLoad
