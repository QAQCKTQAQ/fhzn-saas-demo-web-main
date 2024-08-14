/***
 * tree层级结构
 */
import React from 'react'
import { Tree } from 'antd'
// import { CodeSandboxOutlined, FolderOpenOutlined } from '@ant-design/icons'
// import { filesQueryApi, getFilesTypeApi } from '@/api/modules/data-manage'
// import { FOLDER_TYPE_ENUM } from '@/const/constants'
import { ZHYJTreeData } from '@/api/mock/szyj-manage'
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
	// const [treeData, setTreeData] = useState([])

	// const handleSpaceDataToTree = (data: any, icon: any) => {
	// 	return (data || []).map((item: any) => {
	// 		const { name, id } = item
	// 		return {
	// 			title: name,
	// 			key: id,
	// 			icon
	// 		}
	// 	})
	// }

	// const getSpaceList = async () => {
	// 	const res: any = await filesQueryApi({ pageSize: 1000, page: 1 })
	// 	const treeData = handleSpaceDataToTree(res?.items || [], <CodeSandboxOutlined />)
	// 	setTreeData(treeData)
	// }

	// const getFolderList = async (key: any) => {
	// 	const res: any = await filesQueryApi({ pageSize: 1000, page: 1, parentId: key })
	// 	const treeData = handleSpaceDataToTree(res?.items || [], <FolderOpenOutlined />)
	// 	setTreeData(origin => updateTreeData(origin, key, treeData))
	// }

	// useEffect(() => {
	// 	setTreeData(MKYJTreeData)
	// }, [])

	// const onLoadData = async ({ key }: any) => {
	// 	const type = await getFilesTypeApi(key)
	// 	if (FOLDER_TYPE_ENUM.FOLDER === `${type}`) {
	// 		return getFolderList(key)
	// 	}
	// }

	return <Tree treeData={ZHYJTreeData} defaultExpandAll />
}
export default TreeView
