/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 16:05:55
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-10 16:22:05
 */
import { FileTextOutlined } from '@ant-design/icons'
import React from 'react'

const FileList = (props: any) => {
	const { fileList } = props
	return fileList && fileList.length > 0 ? (
		fileList.map((image: any, index: any) => {
			const { name } = image
			return (
				<div key={index} className="">
					<div className="">
						<FileTextOutlined />
						{name}
					</div>
				</div>
			)
		})
	) : (
		<div>-</div>
	)
}

export default FileList
