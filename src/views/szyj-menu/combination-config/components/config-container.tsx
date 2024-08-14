import React, { useContext } from 'react'
import { Col, Row, Space } from 'antd'
import { Context } from '../store/reducerContent'
import { OrderedListOutlined } from '@ant-design/icons'
import TreeView from './tree-view'
import DDCase from './case-view'

const ConfigContainer: React.FC = () => {
	const { state } = useContext(Context)
	const checkedKeys = state?.checkedKeys || []

	return (
		<Row className="combination-config-container">
			<Col span={4} className="tree-view">
				<div className="tree-view-title">
					<Space>
						<OrderedListOutlined />
						模块YJ列表
					</Space>
				</div>
				<TreeView />
			</Col>
			<Col span={20} className="list-view">
				<DDCase checkedKeys={checkedKeys} />
			</Col>
		</Row>
	)
}
export default ConfigContainer
