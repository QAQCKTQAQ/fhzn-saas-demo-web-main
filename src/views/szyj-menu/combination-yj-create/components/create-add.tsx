import { useState } from 'react'
import { Button, Space, message } from 'antd'
import CombinationInfo from './combination-info'
import { useNavigate } from 'react-router-dom'
import BaseInfo from '../../components/combination-base-info'

function CreateAddYj() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const stepPrev = () => {
		navigate('/szyj-menu/combination-yj-management')
	}

	const prevRender = () => {
		return <Button onClick={stepPrev}>取消</Button>
	}

	const submit = () => {
		setLoading(true)
		setTimeout(() => {
			message.success('操作成功！')
			setLoading(false)
			stepPrev()
		}, 2000)
	}

	const nextRender = () => {
		return (
			<Button type="primary" onClick={submit} loading={loading}>
				提交
			</Button>
		)
	}

	const renderFooter = () => {
		return (
			<Space>
				{prevRender()}
				{nextRender()}
			</Space>
		)
	}

	return (
		<>
			<div className="m-page-yj-create-steps-content">
				<BaseInfo />
				<CombinationInfo />
				{renderFooter()}
			</div>
		</>
	)
}

export default CreateAddYj
