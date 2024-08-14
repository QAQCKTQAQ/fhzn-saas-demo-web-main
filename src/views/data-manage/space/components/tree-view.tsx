/***
 * tree的空间结构总览
 */
import React, { useEffect, useState, useContext } from 'react'
import { Tree } from 'antd'
import { CodeSandboxOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { filesQueryApi, getFilesTypeApi } from '@/api/modules/data-manage'
import { FOLDER_TYPE_ENUM } from '@/const/constants'
import { Context } from '../store/reducerContent'
import { useNavigate } from 'react-router-dom'
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
	const {
		setSelectKeys,
		state: { selectKeys }
	} = useContext(Context)

	const navigate = useNavigate()

	const [treeData, setTreeData] = useState([])

	//data 数据转化tree结构
	const handleSpaceDataToTree = (data: any, icon: any) => {
		return (data || []).map((item: any) => {
			const { name, id } = item
			return {
				title: name,
				key: id,
				icon
			}
		})
	}

	const getSpaceList = async () => {
		const res: any = await filesQueryApi({ pageSize: 1000, page: 1 })
		const treeData = handleSpaceDataToTree(res?.items || [], <CodeSandboxOutlined />)
		setTreeData(treeData)
	}

	const getFolderList = async (key: any) => {
		const res: any = await filesQueryApi({ pageSize: 1000, page: 1, parentId: key })
		const treeData = handleSpaceDataToTree(res?.items || [], <FolderOpenOutlined />)
		setTreeData(origin => updateTreeData(origin, key, treeData))
	}

	useEffect(() => {
		getSpaceList()
	}, [])

	const onLoadData = async ({ key }: any) => {
		const type = await getFilesTypeApi(key)
		if (FOLDER_TYPE_ENUM.FOLDER === `${type}`) {
			return getFolderList(key)
		}
	}

	// 触发选中
	const onSelect = (selectedKeys: any, e: any) => {
		const { title } = e.node || {}
		setSelectKeys({ keys: selectedKeys, title })
		const id = selectedKeys[0]
		navigate((id && `/data-manage/space?parentId=${id}`) || '/data-manage/space')
	}

	return <Tree showIcon treeData={treeData} loadData={onLoadData} onSelect={onSelect} selectedKeys={selectKeys.keys || []} />
}
export default TreeView
