import DdCase from '@/assets/images/dd-case-bg.png'
import { ASYNC_SUBSCRIBE_CONFIG_INFO_MODAL } from '../../const'
import PubSub from 'pubsub-js'
import gxIcon from '@/assets/images/szyj/gx-yj-icon.png'
import ldIcon from '@/assets/images/szyj/ld-yj-icon.png'
import rhIcon from '@/assets/images/szyj/rh-yj-icon.png'
import './index.less'

const DDCase = (props: any) => {
	const checkedKeys = props?.checkedKeys || []
	// GXYJ
	const renderGxYJ = (title: string, key?: string) => {
		return (
			<div className="yj-info">
				{(checkedKeys.find((val: any) => val === key) && (
					<>
						<img src={gxIcon} className="yj-icon" />
						<label>{title}</label>
					</>
				)) ||
					null}
			</div>
		)
	}

	// lDYJ
	const renderLdYJ = (title: string, key?: string) => {
		return (
			<div className="yj-info">
				{(checkedKeys.find((val: any) => val === key) && (
					<>
						<img src={ldIcon} className="yj-icon" />
						<label>{title}</label>
					</>
				)) ||
					null}
			</div>
		)
	}

	// 融合YJ
	const renderRhYJ = (title: string, key?: string) => {
		return (
			<div className="yj-info">
				{(checkedKeys.find((val: any) => val === key) && (
					<>
						<img src={rhIcon} className="yj-icon" />
						<label>{title}</label>
					</>
				)) ||
					null}
			</div>
		)
	}

	// 数组是否包含另一个数据
	const arrHasOtherArr = (arr: any[], arr1: any[]) => {
		return arr1.every(item => arr.includes(item))
	}
	// 根据通信配置是否显示topic
	const lineRender = (relationTopic: any[]) => {
		return arrHasOtherArr(checkedKeys, relationTopic)
	}

	const topicConfig = () => {
		PubSub.publishSync(ASYNC_SUBSCRIBE_CONFIG_INFO_MODAL)
	}

	const renderLine = () => {
		if (checkedKeys && checkedKeys.length) {
			return (
				<div className="line">
					<svg>
						<defs>
							<marker id="triangle" markerWidth="4" markerHeight="4" refY="2">
								<path d="M0 0 L4, 2 L0 4 z" style={{ fill: 'rgb(229 200 200)' }}></path>
							</marker>
						</defs>

						<defs>
							<marker id="down-triangle" markerWidth="4" markerHeight="4" refX="2">
								<path d="M0 0 L2, 4 L4 0" style={{ fill: 'rgb(229 200 200)' }}></path>
							</marker>
						</defs>
						<defs>
							<marker id="up-triangle" markerWidth="4" markerHeight="4" refY="2" refX="2">
								<path d="M0 4 L2, 0 L4 4" style={{ fill: 'rgb(229 200 200)' }}></path>
							</marker>
						</defs>
						{lineRender(['0-0-1', '0-1-1']) && (
							<g>
								<text
									fill="rgb(229 200 200)"
									x="90"
									y="180"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
									onClick={topicConfig}
								>
									topic
								</text>
								<line
									x1="60"
									y1="190"
									x2="110"
									y2="190"
									style={{ stroke: 'rgb(229 200 200)', strokeWidth: '1', markerEnd: 'url("#triangle")' }}
								/>
							</g>
						)}
						{lineRender(['0-1-1', '0-2-1']) && (
							<g>
								<text
									onClick={topicConfig}
									fill="rgb(229 200 200)"
									x="200"
									y="180"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
								>
									topic
								</text>
								<line
									x1="170"
									y1="190"
									x2="220"
									y2="190"
									style={{ stroke: 'rgb(229 200 200)', strokeWidth: '1', markerEnd: 'url("#triangle")' }}
								/>
							</g>
						)}
						{lineRender(['0-2-1', '0-0-2']) && (
							<g>
								<text
									onClick={topicConfig}
									fill="rgb(229 200 200)"
									x="310"
									y="180"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
								>
									topic
								</text>
								<line
									x1="283"
									y1="190"
									x2="333"
									y2="190"
									style={{ stroke: 'rgb(229 200 200)', strokeWidth: '1', markerEnd: 'url("#triangle")' }}
								/>
							</g>
						)}
						{lineRender(['0-0-2', '0-1-2']) && (
							<g>
								<text
									onClick={topicConfig}
									fill="rgb(229 200 200)"
									x="410"
									y="180"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
								>
									topic
								</text>
								<line
									x1="383"
									y1="190"
									x2="433"
									y2="190"
									style={{ stroke: 'rgb(229 200 200)', strokeWidth: '1', markerEnd: 'url("#triangle")' }}
								/>
							</g>
						)}
						{lineRender(['0-0-1', '0-2-1']) && (
							<g>
								<text
									onClick={topicConfig}
									fill="rgb(229 200 200)"
									x="146"
									y="126"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
								>
									topic
								</text>
								<path
									d="M 30 158 V 136 H 252 L 252 154"
									style={{
										stroke: 'rgb(229 200 200)',
										strokeWidth: '1',
										markerEnd: 'url("#down-triangle")',
										fill: 'transparent'
									}}
								/>
							</g>
						)}
						{lineRender(['0-0-1', '0-1-2']) && (
							<g>
								<text
									onClick={topicConfig}
									fill="rgb(229 200 200)"
									x="246"
									y="266"
									style={{ dominantBaseline: 'middle', textAnchor: 'middle' }}
								>
									topic
								</text>
								<path
									d="M 470 226 V 250 H 30 L 30 226"
									style={{
										stroke: 'rgb(229 200 200)',
										strokeWidth: '1',
										markerEnd: 'url("#up-triangle")',
										fill: 'transparent'
									}}
								/>
							</g>
						)}
					</svg>
				</div>
			)
		}
		return null
	}

	return (
		<div className="dd-case">
			<img src={DdCase} className="dd-bg" />
			<div className="dd-case-inner">
				{renderLdYJ('LD识别YJ1', '0-0-1')}
				{renderGxYJ('GX识别YJ1', '0-1-1')}
				{renderRhYJ('多源融合YJ', '0-2-1')}
				{renderLdYJ('LD识别YJ2', '0-0-2')}
				{renderGxYJ('GX识别YJ2', '0-1-2')}
			</div>
			{renderLine()}
		</div>
	)
}
export default DDCase
