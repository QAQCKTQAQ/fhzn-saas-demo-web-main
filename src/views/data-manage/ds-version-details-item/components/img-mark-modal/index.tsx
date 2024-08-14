import { useEffect, useRef, useState } from 'react'
import { Drawer } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_FILE_MARK_MODAL } from '../../const'
import './index.less'
import DataRemark from '@/views/data-manage/data-mark'

function ImgMarkModal() {
	const [visible, setVisible] = useState(false)
	const currentRecord: any = useRef()

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_FILE_MARK_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_FILE_MARK_MODAL)
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
		<Drawer className="img-mark-modal" title={'图片标注'} open={visible} destroyOnClose onClose={hideModal}>
			<DataRemark extraInfo={currentRecord.current} />
		</Drawer>
	)
}
export default ImgMarkModal
