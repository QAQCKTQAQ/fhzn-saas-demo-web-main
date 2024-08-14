import { Drawer } from 'antd'
import './index.less'

const TopologyDrawer = (props: any) => {
	let { visible, hideModal, children } = props

	return (
		<Drawer
			width={'60%'}
			className="p-code-data-topology-drawer"
			open={visible}
			onClose={hideModal}
			destroyOnClose
			title="YJGZ总体状态"
		>
			<div className="code-data-box">
				<div className="data-box">{children}</div>
			</div>
		</Drawer>
	)
}
export default TopologyDrawer
