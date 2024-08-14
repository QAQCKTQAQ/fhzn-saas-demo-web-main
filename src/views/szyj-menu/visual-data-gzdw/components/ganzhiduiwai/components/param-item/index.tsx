import './index.less'
import ListView from '../list-view'
import { useState } from 'react'

// 参数指令
export default function ParamItem(props: any) {
	const { params = [] } = props
	const [visibleKeys, setVisibleKeys] = useState<any>([])

	const handleVisibleKeys = (key: any) => {
		let data = [...visibleKeys]
		const indexOf = data.indexOf(key)
		if (indexOf > -1) {
			data.splice(indexOf, 1) // 存在就删除
		} else {
			data.push(key)
		}
		setVisibleKeys(data)
	}

	const renderValue = (col: any) => {
		const { value, key } = col || {}
		if (value && Object.prototype.toString.call(value) === '[object Object]') {
			return (
				<>
					<div className="value">
						<a onClick={() => handleVisibleKeys(key)}>{visibleKeys.indexOf(key) > -1 ? '收起列表数据' : '展开列表数据'}</a>
					</div>
				</>
			)
		}
		return <div className="value">{handleValue(value)}</div>
	}

	// 处理特殊值为字符串展示
	const handleValue = (value: any) => {
		if (value === undefined) {
			return ''
		}
		if (typeof value === 'object') {
			return JSON.stringify(value)
		}
		return value
	}

	return (
		<>
			{params.map((col: any, index: any) => {
				const { name, key } = col || {}
				return (
					<>
						<div className="param-col-box" key={index}>
							<div className="label">{name}：</div>
							{renderValue(col)}
						</div>
						{(visibleKeys.indexOf(key) > -1 && <ListView col={col} key={key} />) || null}
					</>
				)
			})}
		</>
	)
}
