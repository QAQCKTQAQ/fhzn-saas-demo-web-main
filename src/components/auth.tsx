import { connect } from 'react-redux'

const Auth = (props: any) => {
	const { requires, children, authButtons } = props
	return (Auth.verify(requires, authButtons) && children) || null
}

Auth.verify = (requires: any) => {
	if (!Array.isArray(requires)) {
		requires = [requires]
	}
	// return authButtons.some(resource => requires.includes(resource))
	return true
}
const mapStateToProps = (state: any, props: any) => {
	return { ...state.auth, ...props }
}

export default connect(mapStateToProps)(Auth)
