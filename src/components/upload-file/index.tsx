import React, { useState, useEffect } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import { get, remove } from 'lodash'

const downloadUrl = `/api/bff/download`

function UploadFile(props: any) {
	const [fileList, setFileList] = useState([])
	const [, setFileNoList] = useState<any[]>([])
	const {
		maxCount = 1,
		disabled = false,
		sourceType = UPLOAD_SOURCE_ENUM.FILES,
		onChange,
		acceptFileType = 'image/*,.doc,.docx,.rar,application/*'
	} = props

	// 初始化默认fileList
	useEffect(() => {
		if (props.fileList?.length) {
			const { fileList, fileNoList } = parseFileList(props.fileList)
			setFileList(fileList)
			setFileNoList(fileNoList)
		}
	}, [props.fileList])

	// 格式化 初始值
	const parseFileList = (fileList: any) => {
		let newFileList: any = []
		let newFileNoList: any = []
		if (fileList && fileList.length) {
			fileList.map((item: any) => {
				newFileList.push({
					uid: item.fileNo,
					fileNo: item.fileNo,
					name: item.name,
					fileType: item.fileType,
					url: `${downloadUrl}?fileCode=${item.fileNo}`,
					status: 'done'
				})
				newFileNoList.push(item.fileNo)
			})
		}
		return { fileList: newFileList, fileNoList: newFileNoList }
	}

	// 获取fileNo
	const getFileNoByFile = (file: any) => {
		let fileNo = file.fileNo
		if (!fileNo) {
			fileNo = get(file.response, ['data', 'code'])
		}
		return fileNo
	}

	// 处理文件列表数据
	const handleFileUploadChange = ({ file, fileList }: any) => {
		setFileList(fileList)
		const { status } = file
		if (status === undefined) {
			return
		}
		if (status === 'error' || (file.response && file.response.code !== 0)) {
			message.error(file.response.error || '上传出错')
		}
		if (status === 'done') {
			const fileNoList: any[] = []
			fileList.map((file: any) => {
				if (file.status === 'done' && file.response && file.response.code !== 0) {
					file.status = 'error'
					file.response = file.response.error || '上传出错'
				}
				const fileNo = getFileNoByFile(file)
				file.fileType = get(file.response, ['data', 'fileType'])
				file.url = `${downloadUrl}?fileCode=${fileNo}`
				fileNo && fileNoList.push(fileNo)
			})
			setFileNoList(fileNoList)
			onChange && onChange(fileNoList)
		}
	}
	// 删除上传的文件
	const handleRemove = async (file: any) => {
		const fileNo = getFileNoByFile(file)
		if (!fileNo) {
			return true
		}
		setFileNoList(prev => {
			let newFileNoList = prev.slice()
			remove(newFileNoList, function (n: any) {
				return n === fileNo
			})
			return newFileNoList
		})
		return true
	}

	// 上传组件配置
	const uploadProps: UploadProps = {
		name: 'file',
		action: '/api/bff/upload',
		accept: acceptFileType,
		data: { source: sourceType },
		fileList: fileList,
		maxCount: maxCount,
		onChange: handleFileUploadChange,
		onRemove: handleRemove,
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files)
		}
	}
	return (
		<React.Fragment>
			<Upload {...uploadProps} style={{ width: '100%' }}>
				<Button disabled={disabled} icon={<UploadOutlined />}>
					上传
				</Button>
			</Upload>
		</React.Fragment>
	)
}
export default UploadFile
