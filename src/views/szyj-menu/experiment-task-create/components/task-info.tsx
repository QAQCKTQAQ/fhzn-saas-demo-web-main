/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 11:43:41
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-10 16:24:25
 */
import { Descriptions, Image } from 'antd'
import React from 'react'
import FileList from './file-list'
const TaskInfo = () => {
	const fileList = [{ name: '预案文件1' }, { name: '预案文件2' }]
	const fileListMiss = [{ name: '想定文件1' }, { name: '想定文件2' }]
	const fileListActor = [{ name: '编演文件1' }]
	return (
		<Descriptions bordered column={1} style={{ marginBottom: '24px', width: '600px' }}>
			<Descriptions.Item label="图片上传">
				<Image src={`/api/bff/download?fileCode=1yL58mnYMk5`} width={50} />
			</Descriptions.Item>
			<Descriptions.Item label="试验名称">试验1</Descriptions.Item>
			<Descriptions.Item label="描述">本实验目的为勘测LD引擎的有效动力</Descriptions.Item>
			<Descriptions.Item label="预案文件">
				<FileList fileList={fileList} />
			</Descriptions.Item>
			<Descriptions.Item label="想定文件">
				<FileList fileList={fileListMiss} />
			</Descriptions.Item>
			<Descriptions.Item label="编演文件">
				<FileList fileList={fileListActor} />
			</Descriptions.Item>
		</Descriptions>
	)
}

export default TaskInfo
