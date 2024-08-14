/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-09 09:37:39
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-03 17:57:56
 */
/***
 * tree
 */
import { ASYNC_SUBSCRIBE_MODAL } from '../const'
import React, { useContext, useEffect, useState } from 'react'
import { Tree, Row, Space } from 'antd'
const { DirectoryTree } = Tree
import { Context } from '../store/reducerContent'
import { getDataSpaceTreeRelation } from '@/api/modules/data-manage'
import { PlusSquareOutlined, ApartmentOutlined, EditOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
import UpdateModal from './update-modal'
import spaceIcon from '@/assets/images/space.png'
import checkAll from '@/assets/images/checkAll.png'
import { BUZ_TYPE_ENUM } from '@/const/constants'
import { queryPermitsApi } from '@/api/modules/data-manage'

const TreeView: React.FC = () => {
	const {
		setSelectNode,
		state: { selectNode }
	} = useContext(Context)
	const [treeData, setTreeData] = useState([])
	const [isCanCreat, setIsCanCreat] = useState(true)
	const [isCanEdit, setIsCanEdit] = useState(true)

	useEffect(() => {
		getDataSpaceTreeRelationData()
	}, [])
	const isHaveSpaceId: any = () => {
		if (selectNode?.key && selectNode?.spaceId) {
			return false
		}
		return true
	}

	const childrenHaveSpace: any = (data: any) => {
		const { children = [] } = data
		if (!selectNode?.key) {
			return true
		}
		if (!children.length && !selectNode?.spaceId) {
			return false
		}
		if (!children.length && selectNode?.spaceId) {
			return true
		}
		if (children.length) {
			const result: any = children.map((item: any) => {
				if (item.spaceId) {
					return false
				} else {
					return true
				}
			})
			return result[0]
		}
	}
	// 选中节点是否是叶子节点
	useEffect(() => {
		const selectKey: any = selectNode
		const isSpace: any = childrenHaveSpace(selectKey) || false
		const isEdit: any = isHaveSpaceId(selectKey) || false
		setIsCanCreat(isSpace)
		setIsCanEdit(isEdit)
		console.log('selectNode==', selectNode)
	}, [selectNode])

	const renderIcon = () => {
		return <img style={{ width: '15px', height: '15px' }} src={spaceIcon} />
	}
	const renderEditIcon = () => {
		return <img style={{ width: '15px', height: '15px' }} src={checkAll} />
	}
	// 获取层级信息
	const getDataSpaceTreeRelationData = () => {
		getDataSpaceTreeRelation().then((res: any) => {
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
				let obj: any = {
					key: data[i].id,
					title: data[i].name,
					children: [],
					isLeaf: false,
					parentId: data[i].parentId,
					spaceId: data[i].spaceId,
					spaceType: data[i].spaceType,
					icon: '',
					comment: data[i]?.comment || '',
					creator: data[i]?.creator || '-',
					createdTime: data[i]?.createdTime || '-',
					updatedTime: data[i]?.updatedTime || '-'
				}
				temp = filterArray(data, data[i].id)
				if (temp.length > 0) {
					obj.children = temp
				} else {
					if (obj.parentId === 0) {
						obj.isLeaf = false
					} else if (obj.spaceId) {
						obj.isLeaf = true
						obj.icon = renderIcon()
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
		console.log(info, 'info======')
		const { node } = info || {}
		setSelectNode(node || {})
		node.icon = renderEditIcon()
	}
	// 点击新增空间
	const addFile = () => {
		if (isCanCreat) return
		let data: any = {
			id: null,
			name: '',
			parentId: selectNode?.key || 0
		}
		PubSub.publish(ASYNC_SUBSCRIBE_MODAL, data)
	}
	// 获取空间权限人员
	const getRoleQuery = async () => {
		const id: any = selectNode.spaceId || {}
		const res: any = await queryPermitsApi(BUZ_TYPE_ENUM.FOLDER, `${id}`)
		const users = res?.users || []
		const userNames = users.map((item: any) => item.nickname)
		return userNames
	}
	// 修改命名弹窗
	const updateName = async () => {
		if (!selectNode?.spaceId) return
		let data: any = {
			id: selectNode?.key || '',
			name: selectNode?.title || '',
			parentId: selectNode?.parentId || 0,
			comment: selectNode?.comment,
			spaceType: selectNode?.spaceType.toString(),
			creator: selectNode?.creator,
			createdTime: selectNode?.createdTime,
			users: await getRoleQuery()
		}
		PubSub.publish(ASYNC_SUBSCRIBE_MODAL, data)
	}
	const update = () => {
		getDataSpaceTreeRelationData()
	}
	return (
		<>
			<Row>
				<Space className="add-icon">
					<PlusSquareOutlined
						style={{ color: !isCanCreat ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }}
						disabled={isCanCreat}
						onClick={addFile}
					/>
					<EditOutlined
						style={{ color: !isCanEdit ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }}
						disabled={isCanEdit}
						onClick={updateName}
					/>
				</Space>
			</Row>
			<div>
				<DirectoryTree icon={<ApartmentOutlined />} multiple defaultExpandAll onSelect={onSelect} treeData={treeData} />
			</div>
			<UpdateModal onOK={update} />
		</>
	)
}
export default TreeView
