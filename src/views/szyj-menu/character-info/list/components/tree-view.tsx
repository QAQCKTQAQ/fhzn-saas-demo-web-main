/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-13 17:05:23
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-12 15:02:02
 */
/***
 * tree
 */
import { ASYNC_SUBSCRIBE_UPDATE_MODAL } from '../const'
import React, { useContext, useEffect, useState } from 'react'
import { Tree, Row, Space } from 'antd'
const { DirectoryTree } = Tree
import { Context } from '../store/reducerContent'
import { getLevelRelation } from '@/api/modules/szyj-manage'
import { PlusSquareOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import UpdateModal from './update-modal'

const TreeView: React.FC = () => {
	const {
		setSelectNode,
		queryList,
		state: { selectNode }
	} = useContext(Context)
	const [treeData, setTreeData] = useState([])

	useEffect(() => {
		getLevelRelationData('service-level')
	}, [])
	// 获取层级信息
	const getLevelRelationData = (param: any) => {
		getLevelRelation(param).then((res: any) => {
			const data = res || {}
			let arr: any = filterArray(data, '')
			setTreeData(arr)
		})
	}
	// 按照菜单层级进行数据解析
	const filterArray = (data: any, parentId: any) => {
		let tree: any = []
		let temp
		for (let i = 0; i < data.length; i++) {
			if (data[i].parentId == parentId) {
				let obj: any = { key: data[i].id, title: data[i].name, children: [], isLeaf: false, parentId: data[i].parentId }
				temp = filterArray(data, data[i].id)
				if (temp.length > 0) {
					obj.children = temp
				} else {
					if (obj.parentId === 0) {
						obj.isLeaf = false
					} else {
						obj.isLeaf = true
					}
					delete obj.children
				}
				tree.push(obj)
			}
		}
		return tree
	}
	// 节点选择
	const onSelect = (keys: any, info: any) => {
		const { node } = info || {}
		setSelectNode(node || {})
		queryList({ levelId: node.key })
	}
	// 点击新增文件
	const addFile = () => {
		let data: any = {
			id: '',
			name: '',
			type: 'service-level',
			parentId: selectNode?.key || 0
		}
		PubSub.publish(ASYNC_SUBSCRIBE_UPDATE_MODAL, data)
	}

	// 修改命名弹窗
	const updateName = () => {
		let data: any = {
			id: selectNode?.key || '',
			name: selectNode?.title || '',
			type: 'service-level',
			parentId: selectNode?.parentId || 0
		}
		PubSub.publish(ASYNC_SUBSCRIBE_UPDATE_MODAL, data)
	}
	const update = () => {
		getLevelRelationData('service-level')
	}
	return (
		<>
			<Row>
				<Space className="add-icon">
					<PlusSquareOutlined onClick={addFile} />
				</Space>
			</Row>
			<div onDoubleClick={updateName}>
				<DirectoryTree multiple defaultExpandAll onSelect={onSelect} treeData={treeData} />
			</div>
			<UpdateModal onOK={update} />
		</>
	)
}
export default TreeView
