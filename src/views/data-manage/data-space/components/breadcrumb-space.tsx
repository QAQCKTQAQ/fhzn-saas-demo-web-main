/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-26 16:09:43
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-08 13:23:03
 */
import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { RightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Row, Space } from 'antd'
import OrderCom from '@/components/order/index'
// import ReLoad from '@/components/reload/index'

function BreadcrumbSpace() {
	const {
		state: { selectNode, fileFolderIdList },
		setCheckBoxList,
		setFileFolderIdList,
		queryList
	} = useContext(Context)

	const updatListContent = (index: any) => {
		let newArr: any = fileFolderIdList
		let idData: any = newArr[index]?.id || ''
		console.log(newArr.slice(0, index + 1), '点击路由')
		setFileFolderIdList(newArr.length ? newArr.slice(0, index + 1) : [])
		setCheckBoxList([])
		queryList({ parentId: idData || selectNode.spaceId })
	}

	const updatListInitContent = () => {
		setFileFolderIdList([])
		setCheckBoxList([])
		queryList({ parentId: selectNode.spaceId })
	}
	// 返回
	const updatListBackContent = () => {
		let newArr: any = fileFolderIdList
		let idData: any = newArr && newArr.length > 1 ? newArr[newArr.length - 2].id : ''
		setFileFolderIdList(newArr.length ? newArr.slice(0, -1) : [])
		setCheckBoxList([])
		queryList({ parentId: idData || selectNode.spaceId })
	}
	// 排序
	const handleMenuItemClick = (data: any) => {
		const { type, e } = data
		const sort: any = type === 'dwon' ? 'desc' : type == 'up' ? 'asc' : ''
		queryList({
			parentId:
				fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId,
			fieldType: e,
			sortType: sort
		})
	}
	// 刷新
	// const reload = () => {
	// 	queryList({
	// 		parentId:
	// 			fileFolderIdList && fileFolderIdList.length ? fileFolderIdList[fileFolderIdList.length - 1].id : selectNode.spaceId,
	// 		fieldType: '',
	// 		sortType: ''
	// 	})
	// }
	return (
		<>
			<div className="bread-content">
				<div className="bread-box">
					<Button
						size="small"
						shape="circle"
						disabled={fileFolderIdList && fileFolderIdList.length ? false : true}
						onClick={() => {
							updatListBackContent()
						}}
						icon={<ArrowLeftOutlined style={{ fontSize: '12px' }} />}
					/>
					<span className="segmentation-line">|</span>
					<div
						onClick={() => {
							updatListInitContent()
						}}
						style={{ fontSize: '14px', cursor: 'pointer', color: fileFolderIdList?.length ? '#1890ff' : 'rgba(0, 0, 0, 0.6)' }}
					>
						{selectNode?.title}
					</div>
					{(fileFolderIdList?.length &&
						fileFolderIdList.map((item: any, index: any) => {
							return (
								<div key={index}>
									<span style={{ margin: '0 4px', fontSize: '14px', color: '#1890ff' }}>
										{index === 0 ? <RightOutlined /> : '  '}
									</span>
									<a
										key={index}
										onClick={() => {
											updatListContent(index)
										}}
										style={{ fontSize: '14px', color: index === fileFolderIdList.length - 1 ? 'rgba(0, 0, 0, 0.6)' : '#1890ff' }}
									>
										{item.name}
									</a>
									<span style={{ margin: '0 4px', fontSize: '14px', color: '#1890ff' }}>
										{index < fileFolderIdList.length - 1 ? <RightOutlined /> : ''}
									</span>
								</div>
							)
						})) ||
						null}
				</div>
				{selectNode?.spaceId && (
					<Row>
						<Space>
							<OrderCom
								changeOrderSort={(e: any) => {
									handleMenuItemClick(e)
								}}
							/>
							{/* <ReLoad
								reload={() => {
									reload()
								}}
							/> */}
						</Space>
					</Row>
				)}
			</div>
		</>
	)
}
export default BreadcrumbSpace
