/***
 * 标注文件预览
 */
import { Drawer } from 'antd'
import { useState, useEffect, useContext } from 'react'
import { ASYNC_SUBSCRIBE_LABEL_FILE_MODAL } from '../../const'
import { Context } from '../../store/reducerContent'
import ReactJson from 'react-json-view'

const FilePriview = (props: any) => {
	const { labelOriginData } = props
	const [open, setOpen] = useState(false)
	const { state } = useContext(Context)
	const labelType = state?.labelType?.type || ''

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_LABEL_FILE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_LABEL_FILE_MODAL)
		}
	}, [])

	const showModal = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const renderData = () => {
		if (labelType === 'JSON') {
			return <ReactJson src={labelOriginData || {}} />
		}
		return <div style={{ whiteSpace: 'pre-wrap' }}>{labelOriginData}</div>
	}

	return (
		<Drawer title="标注文件查看" width="50%" placement="right" onClose={onClose} open={open}>
			{renderData()}
		</Drawer>
	)
}

export default FilePriview
