import { useRef, useState } from 'react'
import { Button, Space, message } from 'antd'
import ImageInfo from '../../../components/single-image-info'
import { createMkyjApi } from '@/api/modules/szyj-manage'
import { useSearchParams, useNavigate } from 'react-router-dom'

function CreateAddYj() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [id, setId] = useState('')
	id
	const imageInfoRef: any = useRef({})
	const formData: any = useRef({
		baseInfo: { buzType: '1' },
		imageInfo: {}
	})
	// 获取层级
	const [queryParams] = useSearchParams()
	const levelId = queryParams.get('levelId')

	const prevRender = () => {
		return (
			<Button
				onClick={() => {
					navigate('/szyj-menu/single-yj-management')
				}}
			>
				取消
			</Button>
		)
	}

	const submit = async () => {
		formData.current.imageInfo = await imageInfoRef.current.getFormData()
		message.success('操作成功！')
		navigate('/szyj-menu/single-yj-management')
		return
		setLoading(true)
		const { imageInfo }: any = formData.current
		// 算法列表分开
		const algorithm = (imageInfo.code.algorithm && `${imageInfo.code.algorithm}`.split(',')) || []
		imageInfo.code.algorithm = algorithm
		createMkyjApi({ ...imageInfo, levelId })
			.then((data: any) => {
				setId(data || '')
				message.success('操作成功！')
				setLoading(false)
				navigate('/szyj-menu/single-yj-management')
			})
			.finally(() => {
				setLoading(false)
			})
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
				<div className="base-info-step">
					<ImageInfo ref={imageInfoRef} initValues={formData.current.imageInfo} />
				</div>
				{renderFooter()}
			</div>
		</>
	)
}

export default CreateAddYj
