import { useRef, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Login } from '@/api/interface'
import { loginApi } from '@/api/modules/login'
import { HOME_URL } from '@/config/config'
import { connect } from 'react-redux'
import { setTabsList } from '@/redux/modules/tabs/action'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { rsaEnc } from '@/utils/util'
import ImageCode from '@/components/image-check'
import safeCheck1 from '@/assets/images/safe-check/1.webp'
import safeCheck2 from '@/assets/images/safe-check/2.jpg'
import safeCheck3 from '@/assets/images/safe-check/3.jpeg'
import safeCheck4 from '@/assets/images/safe-check/4.jpeg'
import safeCheck5 from '@/assets/images/safe-check/5.jpg'

const safeCheckImages = [safeCheck1, safeCheck2, safeCheck3, safeCheck4, safeCheck5]

const LoginForm = (props: any) => {
	const { setTabsList } = props
	const [form] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)

	// 图片随机index
	const currentData = useRef({
		index: Math.floor(Math.random() * 5)
	})

	const getImage = () => {
		let { index } = currentData.current
		const image = safeCheckImages[index]
		currentData.current.index = index < 4 ? ++index : 0
		return image
	}

	const [safeCheckImage, setSafeCheckImage] = useState(getImage())

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true)
			loginForm.password = rsaEnc(loginForm.password)
			await loginApi(loginForm)
			setTabsList([])
			message.success('登录成功！')
			window.location.href = HOME_URL
		} finally {
			setLoading(false)
			setSafeCheckImage(getImage())
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="请输入用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item name="safeCheck" rules={[{ required: true, message: '请完成智能安全验证' }]} className="safe-check">
				<ImageCode
					imageUrl={safeCheckImage}
					onReloadCallBack={(type: string) => {
						if (!type) {
							setSafeCheckImage(getImage())
						}
						form.setFieldValue('safeCheck', undefined)
					}}
					onMatch={(data: any) => {
						form.setFieldValue('safeCheck', data)
						form.validateFields(['safeCheck'])
					}}
				/>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields()
					}}
					icon={<CloseCircleOutlined />}
				>
					重置
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					登录
				</Button>
			</Form.Item>
		</Form>
	)
}

const mapDispatchToProps = { setTabsList }
export default connect(null, mapDispatchToProps)(LoginForm)
