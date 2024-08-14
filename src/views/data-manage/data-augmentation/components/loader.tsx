/****
 * 空白页面
 */
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { Context } from '../store/reducerContent'
import { useContext } from 'react'

const { Dragger } = Upload
const URL = window.URL || window.webkitURL

const Loader = () => {
	const {
		state: { imageData },
		setImageData
	} = useContext(Context)

	const props: any = {
		name: 'file',
		showUploadList: false,
		accept: 'image/*',
		beforeUpload: (file: any) => {
			read(file).then((data: any) => {
				setImageData({ ...imageData, ...data })
			})
		}
	}

	// 读取本地上传图片
	const read = (file: any) => {
		return new Promise((resolve, reject) => {
			if (!file) {
				return reject('上传文件异常！')
			}

			if (URL) {
				resolve({
					loaded: true,
					name: file.name,
					type: file.type,
					url: URL.createObjectURL(file)
				})
			} else {
				reject(new Error('Your browser is not supported.'))
			}
		})
	}

	return (
		<div className="loader">
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
			</Dragger>
		</div>
	)
}

export default Loader
