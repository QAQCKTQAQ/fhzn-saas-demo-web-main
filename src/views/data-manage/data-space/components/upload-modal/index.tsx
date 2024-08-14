/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useRef } from 'react'
import { Button, Modal, Progress, Space, message } from 'antd'
import { importFileApi } from '@/api/modules/data-manage'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_UPLOAD_MODAL } from '../../const'
import {
	CloudUploadOutlined,
	PaperClipOutlined,
	DeleteOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined
} from '@ant-design/icons'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import './index.less'
import axios from 'axios'
import { nanoid } from 'nanoid'
// @ts-ignore
// @ts-nocheck
const MAX_LIMIT = 6
interface AuthRecord {
	record?: any
}
declare module 'react' {
	interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
		// extends React's HTMLAttributes
		directory?: string
		webkitdirectory?: string
	}
}
function UploadModal(props: any) {
	const { onOK } = props
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [startUpload, setStartUpload] = useState('init')
	const [fileList, setFileList] = useState<any[]>([])
	const [uploadFiles, setUploadFiles] = useState(0)
	const [uploadedFiles, setUploadedFiles] = useState(0)

	const inputFileRef: any = useRef()

	const currentData = useRef<AuthRecord>({
		record: {}
	})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_UPLOAD_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_UPLOAD_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current.record = data
	}

	const hideModal = () => {
		setFileList([])
		setStartUpload('init')
		setUploadFiles(0)
		setUploadedFiles(0)
		inputFileRef.current && (inputFileRef.current.value = null)
		setVisible(false)
	}

	const submit = async () => {
		setLoading(true)
		const { id, isAnnotation, isProperty = false } = currentData.current.record
		const fileNoList = fileList
			.filter((item: any) => item.done === 'success')
			.map((item: any) => {
				return {
					code: item.code,
					path: item.webkitRelativePath.substring(0, item.webkitRelativePath.lastIndexOf('/'))
				}
			})
		importFileApi({ fileCodes: fileNoList, isProperty, id, isAnnotation })
			.then(() => {
				message.success('操作成功！')
				setFileList([])
				onOK && onOK()
				hideModal()
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const uploadFile = (file: any) => {
		return new Promise((resolve: any) => {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('source', UPLOAD_SOURCE_ENUM.FILES)
			axios({
				url: '/api/bff/upload',
				method: 'post',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				timeout: 30000 // 超时时间设置
			})
				.then((res: any) => {
					const { status, data } = res || {}
					if (status === 200 && data?.code === 0) {
						const code = data?.data?.code
						file.done = 'success'
						file.code = code
						resolve(file)
						return
					}

					file.done = 'fail'
					message.error(data?.message || '上传失败，请稍后重试！')
					resolve(file)
				})
				.catch(() => {
					file.done = 'fail'
					// handle error
					resolve(file)
				})
				.finally(() => {
					setUploadedFiles(prev => prev + 1)
				})
		})
	}

	// 控制并发请求
	const asyncPool = async (poolLimit: any, array: any, iteratorFn: any) => {
		const ret = []
		const executing: any = []
		for (const item of array) {
			const p = Promise.resolve().then(() => iteratorFn(item))
			ret.push(p)
			if (poolLimit <= array.length) {
				const e: any = p.then(() => executing.splice(executing.indexOf(e), 1)) //8
				executing.push(e)
				if (executing.length >= poolLimit) {
					try {
						await Promise.race(executing)
					} catch {
						Promise.resolve()
					}
				}
			}
		}
		return Promise.all(ret)
	}

	// 批量上传
	const patchUploadFiles = () => {
		if (!fileList.length) {
			return message.info('请上传文件！')
		}
		setStartUpload('pending')
		setLoading(true)
		const uploadedFiles = fileList.filter((item: any) => !item.done)
		setUploadFiles(uploadedFiles.length)
		asyncPool(MAX_LIMIT, uploadedFiles, uploadFile)
			.then(() => {
				message.info('文件上传完成！')
			})
			.finally(() => {
				setLoading(false)
				setStartUpload('finish')
				inputFileRef?.current && (inputFileRef.current.value = null)
			})
	}

	// 根据是否为标注，限制文件格式
	const acceptType = () => {
		const { isAnnotation } = currentData.current.record
		if (isAnnotation) {
			return '.json,.JSON,.txt,.TXT'
		}
		return '*'
	}

	const fileChange = (e: any) => {
		setStartUpload('init')
		const { files } = e.target
		const fileLists = [...files].map((item: any) => {
			item['uid'] = nanoid()
			return item
		})
		setFileList([...fileList, ...fileLists])
	}

	const renderFileSelectAction = () => {
		const length = fileList.length
		if (length) {
			return (
				<>
					<div className="file-select-info">
						<Space>
							已选择{length}个文件
							<Button size="small" onClick={clearFileList}>
								清空已选择
							</Button>
						</Space>
					</div>
					<div className="file-list-box">
						{fileList.map((item: any) => {
							return fileRender(item)
						})}
					</div>
				</>
			)
		}
		return null
	}

	const renderResultIcon = (done: string) => {
		if (done === 'success') {
			return <CheckCircleOutlined />
		} else if (done === 'fail') {
			return <CloseCircleOutlined />
		}
		return null
	}

	const renderClassFileList = (done: string) => {
		if (done === 'success') {
			return 'file-item success'
		} else if (done === 'fail') {
			return 'file-item fail'
		}
		return 'file-item'
	}

	const remove = (uid: string) => {
		setFileList(fileList.filter((item: any) => item.uid !== uid))
	}

	// 渲染filelist 列表
	const fileRender = (file: any) => {
		const { name, uid, done, webkitRelativePath } = file
		return (
			<div className={renderClassFileList(done)} key={uid}>
				<Space>
					<PaperClipOutlined />
					{webkitRelativePath || name}
					{renderResultIcon(done)}
				</Space>
				{startUpload !== 'pending' && <DeleteOutlined className="delete-icon" onClick={() => remove(uid)} />}
			</div>
		)
	}

	const clearFileList = () => {
		setFileList([])
		setStartUpload('init')
		inputFileRef.current.value = null
	}

	const renderProgress = () => {
		if (uploadedFiles && uploadedFiles !== uploadFiles) {
			const percent = Number((uploadedFiles / uploadFiles) * 100).toFixed(0)
			return (
				<div className="file-upload-modal-progress">
					<Progress type="circle" percent={Number(percent)} />
				</div>
			)
		}
		return (
			<div className="batch-upload">
				{(currentData.current.record?.folder && (
					<input
						className="upload"
						type="file"
						webkitdirectory=""
						directory=""
						multiple
						accept={acceptType()}
						onChange={fileChange}
						id="folder-up"
						ref={ref => (inputFileRef.current = ref)}
					/>
				)) || (
					<input
						className="upload"
						type="file"
						multiple
						accept={acceptType()}
						onChange={fileChange}
						id="folder-up"
						ref={ref => (inputFileRef.current = ref)}
					/>
				)}
				<a>
					<CloudUploadOutlined className="ant-upload-drag-icon" />
				</a>
				<a>点击上传</a>
				{(currentData.current.record.isAnnotation && <p>上传文件格式支持：.json、.txt格式</p>) || ''}
			</div>
		)
	}

	const renderModalFooter = () => {
		return (
			<Space>
				<Button onClick={hideModal}>取消</Button>
				{(startUpload !== 'finish' && (
					<Button type="primary" loading={loading} onClick={patchUploadFiles}>
						文件上传
					</Button>
				)) || (
					<Button type="primary" loading={loading} onClick={submit}>
						保存
					</Button>
				)}
			</Space>
		)
	}

	return (
		<Modal
			width="600px"
			confirmLoading={loading}
			title={currentData.current.record.title}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			className="file-upload-modal"
			footer={renderModalFooter()}
		>
			{renderProgress()}
			{renderFileSelectAction()}
		</Modal>
	)
}
export default UploadModal
