import { useRef } from 'react'
import { Avatar, Modal, Dropdown, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { connect } from 'react-redux'
import { setToken } from '@/redux/modules/global/action'
import PasswordModal from './PasswordModal'
import InfoModal from './InfoModal'
import { setUserInfo } from '@/redux/modules/global/action'
import { logoutApi } from '@/api/modules/login'

const AvatarIcon = (props: any) => {
	const { setToken, setUserInfo, userInfo } = props
	const navigate = useNavigate()

	interface ModalProps {
		showModal: (params: { name: number }) => void
	}
	const passRef = useRef<ModalProps>(null)
	const infoRef = useRef<ModalProps>(null)

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: '提示',
			icon: <ExclamationCircleOutlined />,
			content: '是否确认退出登录？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				logoutApi().then(() => {
					setToken('')
					setUserInfo({})
					message.success('退出登录成功！')
					navigate('/login')
				})
			}
		})
	}

	// Dropdown Menu
	const menu: any = [
		{
			key: '1',
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL)
		},
		{
			type: 'divider'
		},
		{
			key: '4',
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout
		}
	]

	const renderNickName = () => {
		const { nicknameCn } = userInfo || {}
		return (nicknameCn && `${nicknameCn}`.substring(0, 1)) || ''
	}

	return (
		<>
			<Dropdown menu={{ items: menu }} placement="bottom" arrow trigger={['click']}>
				<Avatar size="large" style={{ verticalAlign: 'middle' }} className="avatar-info">
					{renderNickName()}
				</Avatar>
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	)
}
const mapStateToProps = (state: any) => state.global
const mapDispatchToProps = { setToken, setUserInfo }
export default connect(mapStateToProps, mapDispatchToProps)(AvatarIcon)
