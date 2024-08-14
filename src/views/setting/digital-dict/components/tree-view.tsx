import React, { useContext, useEffect, useState } from 'react'
import { Tree } from 'antd'
import { Context } from '../store/reducerContent'
import { getDictTypeListApi } from '@/api/modules/settting/digital-dict'
const { DirectoryTree } = Tree

const TreeView: React.FC = () => {
	const {
		setSelectType,
		state: { selectType }
	} = useContext(Context)

	const [treeData, setTreeData] = useState<any>([])

	useEffect(() => {
		getDictList()
	}, [])

	// 获取分类列表
	const getDictList = () => {
		getDictTypeListApi().then((res: any) => {
			const dictTypes = (res || []).map((item: any) => {
				const { name, code } = item
				return {
					title: name,
					key: code
				}
			})
			setTreeData(dictTypes)
			const key = dictTypes[0]?.key
			setSelectType((key && [key]) || [])
		})
	}

	const onSelectTree = (selectedKeys: any) => {
		setSelectType(selectedKeys)
	}

	return (
		<>
			<div className="title-box">
				<div className="title">字典分类</div>
			</div>
			<div>
				<DirectoryTree
					expandAction={false}
					onSelect={onSelectTree}
					defaultExpandAll
					treeData={treeData}
					selectedKeys={selectType}
				/>
			</div>
		</>
	)
}
export default TreeView
