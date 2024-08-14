import { Tree } from 'antd'
import './index.less'
// 渲染列表数据
export default function ListTable(props: any) {
	const { treeData } = props
	return (
		<div className="m-page-single-detail-table">
			<Tree treeData={treeData} />
		</div>
	)
}
