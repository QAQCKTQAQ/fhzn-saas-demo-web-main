import { Space, Tooltip, message } from 'antd'
import { DownloadOutlined, DeleteOutlined, SaveOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons'
import Loader from './loader'
import { Context } from '../store/reducerContent'
import { useContext, useRef } from 'react'
import Editer from './editer'
import { ASYNC_IMAGE_HANDLE } from '../const'
import PubSub from 'pubsub-js'
import { saveAugmentationFileApi } from '@/api/modules/data-manage'

const Container = () => {
	const { state, imageInfo } = useContext(Context)
	const imageData = state?.imageData || {}
	const editerRef: any = useRef(null)

	const deleteImg = () => {
		PubSub.publishSync(ASYNC_IMAGE_HANDLE, 'reset')
	}

	const rendereExtra = () => {
		return (
			<Space className="handle-tools">
				{imageData.cropped && <RollbackOutlined onClick={() => PubSub.publishSync(ASYNC_IMAGE_HANDLE, 'restore')} />}
				{imageData.cropping && <StopOutlined onClick={() => PubSub.publishSync(ASYNC_IMAGE_HANDLE, 'clear')} />}
				{/* {imageData.cropping && <CheckCircleOutlined onClick={() => PubSub.publishSync(ASYNC_IMAGE_HANDLE, 'crop')} />} */}
				{imageData.loaded && !imageData.cropping && <DeleteOutlined onClick={deleteImg} />}
				{imageData.loaded && (
					<a href={imageData.url} download={imageData.name}>
						<DownloadOutlined />
					</a>
				)}
				<Tooltip title="保存" placement="bottom">
					<SaveOutlined onClick={saveImage} />
				</Tooltip>
			</Space>
		)
	}

	const saveImage = () => {
		editerRef.current.saveImage().then((file: any) => {
			const { id } = imageInfo || {}
			const { code } = file || {}
			code &&
				saveAugmentationFileApi({
					id,
					fileCode: code
				}).then(() => {
					message.success('增广文件信息保存成功！')
				})
		})
	}

	return (
		<>
			{imageData.url && rendereExtra()}
			<div className="ant-card">{(imageData.url && imageData.loaded && <Editer ref={editerRef} />) || <Loader />}</div>
		</>
	)
}

export default Container
