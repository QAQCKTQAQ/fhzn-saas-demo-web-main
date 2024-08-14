import { connect } from 'react-redux'
import './index.less'

const LayoutFooter = (props: any) => {
	const { themeConfig } = props
	return (
		<>
			{!themeConfig.footer && (
				<div className="footer">
					<a href="https://www.zjfhzn.com:22222/" target="_blank" rel="noreferrer">
						2022 © 飞航智能云 By Hooks Technology.
					</a>
				</div>
			)}
		</>
	)
}

const mapStateToProps = (state: any) => state.global
export default connect(mapStateToProps)(LayoutFooter)
