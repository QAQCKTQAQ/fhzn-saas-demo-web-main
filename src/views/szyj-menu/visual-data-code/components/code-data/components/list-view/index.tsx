import ListTable from '../list-table'
import './index.less'
import ParamItem from '../param-item'
// 更多参数抽屉
export default function ListView(props: any) {
	const { col } = props

	// 根据状态渲染表个还是
	const renderItemByType = () => {
		const { _type, _name, ...rest } = col?.value || {}
		if (_name && _type === 'array') {
			return <ListTable col={col} />
		}
		if (_name && _type === 'object') {
			const { body } = col
			const params: any = []
			Object.entries(rest || {}).map((item: any) => {
				const [hKey, hValue] = item || []
				if (hValue && Object.prototype.toString.call(hValue) === '[object Object]') {
					params.push({
						name: hValue._name || '',
						value: hValue,
						key: hKey,
						body: body[hKey]
					})
				} else {
					params.push({
						name: hValue,
						value: body[hKey],
						key: hKey
					})
				}
			})
			return <ParamItem params={params} />
		}
	}
	return <div className="code-data-list-drawer-wrap">{renderItemByType()}</div>
}
