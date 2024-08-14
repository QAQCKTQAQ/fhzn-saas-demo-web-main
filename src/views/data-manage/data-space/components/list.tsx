/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-21 14:59:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-07 13:21:35
 */
import { Empty, Pagination, Checkbox, Descriptions, Popover } from 'antd'
import folder from '@/assets/images/folder.png'
import txt from '@/assets/images/txt.png'
import unknown from '@/assets/images/unknown.png'
import video from '@/assets/images/video.png'
import zip from '@/assets/images/zip.png'
import React, { useContext, useEffect } from 'react'
import { Context } from '../store/reducerContent'
import { FlagOutlined, ProfileOutlined } from '@ant-design/icons'

import { FILE_TYPE_ENUM } from '../const'

const List: React.FC = () => {
	const {
		state: {
			list: { dataSource, pageInfo }
		},
		state: { selectNode, fileFolderIdList, checkBoxList },
		setFileFolderIdList,
		setCheckBoxList,
		queryList
	} = useContext(Context)

	useEffect(() => {
		queryDetails()
	}, [selectNode])

	const queryDetails = () => {
		if (selectNode?.spaceId) {
			queryList({ parentId: selectNode.spaceId })
		}
	}
	// 跳转
	const toLinkRender = (item: any) => {
		const { id } = item
		if (item.type == FILE_TYPE_ENUM.FOLDER) {
			let fileFolderGroup: any = []
			fileFolderGroup.push({ id: id, name: item.name })
			setFileFolderIdList(fileFolderIdList.concat(fileFolderGroup))
			queryList({ parentId: item?.id })
			setCheckBoxList([])
		} else if (item.type == FILE_TYPE_ENUM.IMAGE) {
			window.open(`/data-manage/ds-version-details-item?id=${id}&from=space`)
		} else {
			window.open()
		}
	}

	// 单个点击选中
	const checkItem = (e: any, item: any) => {
		let id = item.id
		let data = []
		if (checkBoxList.indexOf(id) != -1) {
			let data = [...checkBoxList]
			let start = checkBoxList.indexOf(id)
			let curData = data.splice(start, 1)[0]
			setCheckBoxList(
				data.filter((item: any) => {
					return item != curData || []
				})
			)
		} else {
			data.push(id)
			setCheckBoxList(checkBoxList.concat(data))
		}
	}

	const onChange = (params: any) => {
		let newParams = params
		setCheckBoxList([])
		queryList({
			...newParams,
			parentId:
				fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId
		})
	}

	const renderFileFolder = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<div className="icon-file">
						<img src={folder} className="folder-content" onDoubleClick={() => toLinkRender(item)} />
					</div>
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" onDoubleClick={() => toLinkRender(item)}>
							{item.name}
						</a>
					</Popover>

					<div className="item-info-empty"></div>
				</div>
			</div>
		)
	}
	const renderTxt = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<div className="icon-file">
						<img className="txt-content" src={txt} />
					</div>
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" href={`/api/bff/download?fileCode=${item.fileCode}`}>
							{item.name}
						</a>
					</Popover>
					<div className="item-info-empty"></div>
				</div>
			</div>
		)
	}
	const renderImg = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<img className="image-content" onClick={() => toLinkRender(item)} src={`/api/bff/download?fileCode=${item.fileCode}`} />
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" onClick={() => toLinkRender(item)}>
							{item.name}
						</a>
					</Popover>
					<div className="item-info">
						<FlagOutlined title="标注" className={item?.haveAnnotation ? 'active' : 'unactive'} />
						<ProfileOutlined title="属性" className={item?.haveProperty ? 'active' : 'unactive'} />
					</div>
				</div>
			</div>
		)
	}

	const RenderVideo = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<div className="icon-file">
						<img src={video} height={80} width={80} />
					</div>
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" href={`/api/bff/download?fileCode=${item.fileCode}`}>
							{item.name}
						</a>
					</Popover>
					<div className="item-info-empty"></div>
				</div>
			</div>
		)
	}

	const RenderZip = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<div className="icon-file">
						<img src={zip} height={80} width={80} />
					</div>
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" href={`/api/bff/download?fileCode=${item.fileCode}`}>
							{item.name}
						</a>
					</Popover>
					<div className="item-info-empty"></div>
				</div>
			</div>
		)
	}

	const RenderUnknow = (item: any) => {
		return (
			<div className="row-item">
				<div className="col-item">
					<div className="icon-file">
						<img src={unknown} height={80} width={80} />
					</div>
					<div className="check-box">
						<Checkbox checked={checkBoxList.indexOf(item.id) != -1} onChange={(e: any) => checkItem(e, item)} />
					</div>
					<Popover content={item.name}>
						<a className="space-content-name" href={`/api/bff/download?fileCode=${item.fileCode}`}>
							{item.name}
						</a>
					</Popover>
					<div className="item-info-empty"></div>
				</div>
			</div>
		)
	}

	const renderBasicInformation = () => {
		return (
			<div className="space-card-info">
				<Descriptions title="" column={2} bordered>
					<Descriptions.Item label="空间">{selectNode?.title}</Descriptions.Item>
					<Descriptions.Item label="创建人">{selectNode?.creator}</Descriptions.Item>
					<Descriptions.Item label="创建时间">{selectNode?.createdTime}</Descriptions.Item>
					<Descriptions.Item label="更新时间">{selectNode?.updatedTime}</Descriptions.Item>
				</Descriptions>
			</div>
		)
	}

	const RenderEmpty = () => {
		return (
			<>
				{((!selectNode?.key || selectNode?.spaceId) && (
					<div className="empty-content">
						<Empty />
					</div>
				)) ||
					(selectNode?.key && !selectNode?.spaceId && renderBasicInformation())}
			</>
		)
	}
	return (
		<>
			<div className="space-list-content">
				<div className="file-folder-content">
					{selectNode.spaceId && dataSource?.length ? (
						<div className="file-content">
							{(dataSource || []).map((item: any) => {
								return item?.type == FILE_TYPE_ENUM.FOLDER
									? renderFileFolder(item)
									: item?.type == FILE_TYPE_ENUM.IMAGE
									? renderImg(item)
									: item?.type == FILE_TYPE_ENUM.TEXT
									? renderTxt(item)
									: item?.type == FILE_TYPE_ENUM.VIDEO
									? RenderVideo(item)
									: item?.type == FILE_TYPE_ENUM.ZIP
									? RenderZip(item)
									: RenderUnknow(item)
							})}
						</div>
					) : (
						RenderEmpty()
					)}
				</div>
				{selectNode.spaceId && dataSource?.length ? (
					<div className="bot_page">
						<Pagination
							showTotal={total => `共 ${total} 条`}
							onChange={(pageNum, pageSize) => onChange({ page: pageNum, pageSize })}
							total={pageInfo.total}
							current={pageInfo.page}
							pageSize={pageInfo.pageSize}
							defaultCurrent={1}
						/>
					</div>
				) : (
					''
				)}
			</div>
		</>
	)
}

export default List
