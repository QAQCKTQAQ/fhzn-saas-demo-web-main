import { useEffect, useRef, useState } from 'react'
import { Drawer } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL } from '../../const'
import DataAugmentation from '@/views/data-manage/data-augmentation'
import './index.less'

function ImgAugmentationModal() {
	const [visible, setVisible] = useState(false)
	const currentRecord: any = useRef()

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_FILE_AUGMENTATION_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentRecord.current = data
	}

	const hideModal = () => {
		setVisible(false)
	}

	return (
		<Drawer className="img-augmenttation-modal" title={'图片增广'} open={visible} destroyOnClose onClose={hideModal}>
			<DataAugmentation imageInfo={currentRecord.current} />
		</Drawer>
	)
}
export default ImgAugmentationModal
