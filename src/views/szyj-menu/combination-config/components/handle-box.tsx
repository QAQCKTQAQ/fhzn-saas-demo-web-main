import React, { useContext, useState } from 'react'
import { Button, Space, message } from 'antd'
import { Context } from '../store/reducerContent'
import { useNavigate } from 'react-router-dom'

const HandleBox: React.FC = () => {
	const { state } = useContext(Context)
	const checkedKeys = state?.checkedKeys || []
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const save = () => {
		if (!checkedKeys || !checkedKeys.length) {
			return message.info('模块YJ配置错误')
		}
		setLoading(true)
		setTimeout(() => {
			message.success('配置成功')
			navigate(-1)
			setLoading(false)
		}, 2000)
	}
	return (
		<Space className="handle-box">
			<Button onClick={() => navigate(-1)}>取消</Button>
			<Button type="primary" onClick={save} loading={loading}>
				保存
			</Button>
		</Space>
	)
}
export default HandleBox
