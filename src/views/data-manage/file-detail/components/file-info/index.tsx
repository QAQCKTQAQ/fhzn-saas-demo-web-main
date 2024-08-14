import { Form, PageHeader, Row, Col, Space, Button, Input, message } from 'antd'
import { FileTextOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons'
import { Context } from '../../store/reducerContent'
import { useContext, useEffect, useState } from 'react'
import { ASYNC_SUBSCRIBE_LABEL_FILE_MODAL } from '../../const'
import PubSub from 'pubsub-js'
import FilePriview from '../file-preview'
import axios from 'axios'
import { baseURL } from '@/config/config'
import { fileNameUpdateApi } from '@/api/modules/data-manage'
import { filterFileSize, getSuffix } from '@/utils/util'
import { jsonToCanvasData, txtToCanvasData } from '../../file-analysis-utils'
const FileInfo = () => {
	const [form] = Form.useForm()
	const { state, setImageLabel, setFileLabelData, setFileDetailData, setLabelType } = useContext(Context)
	const { fileDetailData = {}, fileLabelData } = state || {}
	const [selectLabel, setSelectLabel] = useState('0')
	const [editName, setEditName] = useState(false)
	const [fileName, setFileName] = useState('')
	const [fileOrgName, setFileOrgName] = useState('')

	const [fileType, setFileType] = useState('')
	const [labelOriginData, setLabelOriginData] = useState(null)

	const imageLabelClick = (data: any, type: string) => {
		setImageLabel(data)
		setSelectLabel(type)
	}

	// 处理文件名字和后缀
	const handleFileNameType = (fileName: string) => {
		const length = fileName.lastIndexOf('.')
		if (length === -1) return
		const fileType = fileName.slice(length)
		const name = fileName.slice(0, length)
		setFileType(fileType)
		setFileName(name)
	}

	useEffect(() => {
		const { annotationCode, name, annotationContent } = fileDetailData
		const fileType = handleLabelType(annotationContent)
		if (annotationCode) {
			getJsonByCode(annotationCode, fileType)
		}
		setFileOrgName(name)
		name && handleFileNameType(name)
		setSelectLabel('0')
	}, [fileDetailData])

	// 处理标注文件类型
	const handleLabelType = (annotationContent: any) => {
		const annotationFileName = annotationContent?.originFilename || ''
		if (annotationFileName) {
			const fileType = getSuffix(annotationFileName)
			setLabelType({ type: fileType })
			return fileType
		}
		setLabelType(null)
		return ''
	}

	// 根据标注code 解析为json字符串
	const getJsonByCode = (annotationCode: string, fileType: any) => {
		axios({
			method: 'get',
			url: `${baseURL}/bff/download?fileCode=${annotationCode}`,
			responseType: 'blob'
		}).then((res: any) => {
			const reader = new FileReader()
			reader.readAsText(res.data)
			reader.onload = (event: any) => {
				try {
					console.log('fileType', fileType)
					const { result } = event.target
					let data = null
					if (fileType === 'JSON') {
						data = jsonToCanvasData(result)
						setLabelOriginData(JSON.parse(result))
					}
					if (fileType === 'TXT') {
						data = txtToCanvasData(result)
						setLabelOriginData(result)
					}
					setFileLabelData(data)
				} catch (err) {
					setFileLabelData(null)
					setLabelOriginData(null)
				}
			}
		})
	}

	// 渲染名称可编辑
	const renderEditName = () => {
		if (!editName) {
			return (
				<Space>
					{fileOrgName}
					<EditOutlined onClick={() => setEditName(true)} />
				</Space>
			)
		}
		return (
			<Space>
				<Input size="small" value={fileName} onChange={(e: any) => setFileName(e.target.value)} suffix={fileType} />
				<Button size="small" onClick={cancelEdit}>
					取消
				</Button>
				<Button type="primary" size="small" onClick={confirm}>
					确认
				</Button>
			</Space>
		)
	}

	const cancelEdit = () => {
		setEditName(false)
		setFileOrgName(fileDetailData.name)
	}

	const confirm = () => {
		if (!`${fileName}`.trim()) {
			return message.info('文件名称不能为空！')
		}
		const { id } = fileDetailData
		const fileEditName = `${fileName.trim()}${fileType}`
		fileNameUpdateApi({ id, name: fileEditName }).then(() => {
			setEditName(false)
			message.success('操作成功！')
			setFileDetailData({ ...fileDetailData, name: fileEditName })
		})
	}

	return (
		<div>
			<PageHeader title="详情" />
			<Form form={form} style={{ width: '100%' }} preserve={false}>
				<Row>
					<Col span={24}>
						<Form.Item label={'名称'}>{renderEditName()}</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'格式'}>--</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'大小'}>{filterFileSize(Number(fileDetailData.length) || 0) || '-'}</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'分辨率'}>--</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'上传人'}>{fileDetailData.modifier || '--'}</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'创建时间'}>{fileDetailData.createdTime}</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label={'是否已标注'}>{fileDetailData.haveAnnotation ? '是' : '否'}</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="标注信息">
							<Space direction="vertical" style={{ width: '100%' }}>
								<Button
									style={{ width: '100%' }}
									type={selectLabel === '0' ? 'primary' : 'default'}
									onClick={() => imageLabelClick(null, '0')}
								>
									无标注
								</Button>
								{(!!fileDetailData.haveAnnotation && (
									<div className="label-btn">
										<Button
											style={{ width: '100%' }}
											type={selectLabel === '1' ? 'primary' : 'default'}
											onClick={() => {
												imageLabelClick(fileLabelData, '1')
											}}
										>
											标注1
										</Button>
										<FileTextOutlined onClick={() => PubSub.publish(ASYNC_SUBSCRIBE_LABEL_FILE_MODAL)} />
										<DownloadOutlined
											onClick={() => window.open(`${baseURL}/bff/download?fileCode=${fileDetailData.annotationCode}`)}
										/>
									</div>
								)) ||
									null}
							</Space>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<FilePriview labelOriginData={labelOriginData} />
		</div>
	)
}

export default FileInfo
