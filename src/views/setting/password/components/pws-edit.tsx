import { Card, Form, Input, Row, message, Col, Button } from 'antd'
import { editUserPassWordApi } from '@/api/modules/user'
import { connect } from 'react-redux'
import { rsaEnc } from '@/utils/util'

const PassEdit = (props: any) => {
	const {
		userInfo: { nickname }
	} = props
	const [form] = Form.useForm()

	const onConfirm = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { newpass, confirmPassword, mpass } = values
		if (newpass !== confirmPassword) {
			message.error('两次密码输入不一致')
			return
		}
		editUserPassWordApi({ newpass: rsaEnc(newpass), mpass: rsaEnc(mpass), nickname }).then(() => {
			message.success('密码修改成功！')
			form.resetFields()
		})
	}

	const maxLength = (length: any) => {
		return { max: length, message: `长度不能超过${length}字` }
	}

	const checkPsd = (rule: any, value: any, callback: any) => {
		const data = form.getFieldsValue()
		const newPassword = data.newPassword
		if (value) {
			if (newPassword && newPassword !== value) {
				callback(new Error('两次密码输入不一致'))
			}
			const flag = new RegExp('^(?![\\d]+$)(?![a-zA-Z]+$)(?![_\\-&*:?~!@#$%^()+}{]+$)[\\da-zA-Z_\\-&*:?~!@#$%^()+}{]{6,20}$')
			if (flag.test(value)) {
				callback()
			}
			callback(new Error('请填入正确格式的密码'))
		}
		callback()
	}

	const passwordRule = {
		pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![_\-&*:?~!@#$%^()+}{]+$)[\da-zA-Z_\-&*:?~!@#$%^()+}{]{6,20}$/,
		message: '请填入正确格式的密码'
	}

	return (
		<Card title="修改密码">
			<Form form={form} labelCol={{ span: 6 }} layout="horizontal" preserve={false}>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Col span={24}>
							<Form.Item name={'mpass'} label={'旧密码'} rules={[{ required: true, message: '请输入旧密码' }]}>
								<Input.Password placeholder={'请输入'} allowClear />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name={'newpass'} label={'新密码'} rules={[{ required: true }, passwordRule, maxLength(20)]}>
								<Input.Password placeholder={'请输入'} allowClear />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name={'confirmPassword'}
								label={'确认密码'}
								rules={[
									{ required: true },
									{
										validator: (rule, value, callback) => {
											checkPsd(rule, value, callback)
										}
									},
									maxLength(20)
								]}
							>
								<Input.Password placeholder={'请输入'} allowClear />
							</Form.Item>
						</Col>
					</Col>
					<Col span={12}>
						<div className={'password-text'}>
							1、6~20位数字、字母或特殊字符 <br />
							2、不能为空格 <br />
							3、不能全部为数字 <br />
							{`4、特殊字符只能为：_-&*:?~!@#$%^()+}{`}
						</div>
					</Col>
				</Row>
				<Form.Item wrapperCol={{ offset: 10 }} className="actions">
					<Button type="primary" onClick={onConfirm}>
						确认
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}

const mapStateToProps = (state: any) => state.global

export default connect(mapStateToProps)(PassEdit)
