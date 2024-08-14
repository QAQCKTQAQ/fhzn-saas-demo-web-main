/***
 * tree层级结构
 */
import React, { useContext } from 'react'
import { Tree } from 'antd'
import { Context } from '../store/reducerContent'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateTreeData = (list: any, key: React.Key, children: any): any =>
	list.map((node: any) => {
		if (node.key === key) {
			return {
				...node,
				children
			}
		}
		if (node.children) {
			return {
				...node,
				children: updateTreeData(node.children, key, children)
			}
		}
		return node
	})

const TreeView: React.FC = () => {
	const { state, setCheckedKeys } = useContext(Context)
	const checkedKeys = state?.checkedKeys || []
	const ZHYJTreeData = [
		{
			title: 'DD1',
			key: '0-0',
			children: [
				{
					title: 'LDSZYJ',
					key: '0-0-1',
					children: [
						{
							title: '输入图像',
							key: '0-0-1-1',
							children: [
								{
									title: 'HB图像',
									key: '0-0-1-1-1'
								}
							]
						},
						{
							title: '输出图像',
							key: '0-0-1-2',
							children: [
								{
									title: '一维距离像',
									key: '0-0-1-2-1'
								},
								{
									title: 'SAR图像',
									key: '0-0-1-2-2'
								},
								{
									title: '距离多普勒',
									key: '0-0-1-2-3'
								},
								{
									title: '天线方向',
									key: '0-0-1-2-4'
								},
								{
									title: 'BXJB',
									key: '0-0-1-2-5'
								}
							]
						}
					]
				},
				{
					title: '多源融合',
					key: '0-0-2',
					children: [
						{
							title: '关联样本对',
							key: '0-0-2-1',
							children: [
								{
									title: 'RD图',
									key: '0-0-2-1-1'
								},
								{
									title: 'SAR图',
									key: '0-0-2-1-2'
								},
								{
									title: 'GX像',
									key: '0-0-2-1-3'
								}
							]
						}
					]
				}
			]
		}
	]

	return (
		<Tree
			treeData={ZHYJTreeData}
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
