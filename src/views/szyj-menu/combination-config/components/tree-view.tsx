import React, { useContext } from 'react'
import { Tree } from 'antd'
import { Context } from '../store/reducerContent'
import { MKYJTreeData } from '@/api/mock/szyj-manage'

const TreeView: React.FC = () => {
	const { state, setCheckedKeys } = useContext(Context)
	const checkedKeys = state?.checkedKeys || []
	return (
		<Tree
			treeData={MKYJTreeData}
			onCheck={(values: any, e: any) => {
				setCheckedKeys(values, e)
			}}
			defaultExpandAll
			checkable
			checkedKeys={checkedKeys}
			selectable={false}
		/>
	)
}
export default TreeView
