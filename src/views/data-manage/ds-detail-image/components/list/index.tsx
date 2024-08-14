import { Button, Col, Row, Space, Pagination, Tabs, Tag, Checkbox, Modal, message, Select, Empty } from 'antd'
import './index.less'
import { FlagOutlined, ProfileOutlined, CheckSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/reducerContent'
import { useSearchParams } from 'react-router-dom'
import { dataSetImgMap } from '@/api/modules/data-set'
import PublicDataSetModal from '../public-data-set'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_PUBLIC } from '../../const'
import { removeFilesInVersionApi, getVersionNum } from '@/api/modules/data-set'
import { Link } from 'react-router-dom'
import zw from '@/assets/images/zw.png'
import { DATA_SET_FILE_TYPE_OPTIONS } from '@/components/business/save-dataset-modal/const'

export default function List() {
	const {
		state: { baseInfo },
		setBaseInfo,
		getVersionDetail
	} = useContext(Context)
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const version = search.get('version')
	const [activeKey, setActiveKey] = useState('1')
	const [listInfo, setListInfo] = useState<any>({})
	const [currentPage, setCurrentPage] = useState(1)
	const [checkedKeys, setCheckedKey] = useState<any>([])
	const [searchValue, setSearchValue] = useState<any>('')
	const [versionInformation, setVersionInformation] = useState<any>({})

	const unannotationCountRender = () => {
		const { fileCount, haveAnnotationCount } = versionInformation || {}
		return (Number(fileCount) || 0) - (Number(haveAnnotationCount) || 0)
	}

	useEffect(() => {
		getDataSetList({
			page: 1,
			pageSize: 10,
			directoryType: searchValue,
			isAnnotated: activeKey === '2' ? true : activeKey === '3' ? false : ''
		})
	}, [id, version, activeKey])

	// 获取数据集下文件列表
	const getDataSetList = (params: any) => {
		const { directoryType = '' } = params
		getVersionNumCount({ directoryType: directoryType })
		setCheckedKey([])
		dataSetImgMap(id, version, params).then((res: any) => {
			setListInfo(res)
		})
	}

	// 获取数据集版本数据数量
	const getVersionNumCount = (params: any) => {
		getVersionNum(id, version, params)
			.then((res: any) => {
				setVersionInformation(res)
			})
			.finally(() => {})
	}

	const removeFiles = () => {
		Modal.confirm({
			title: '提示',
			content: '是否确认删除？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				removeFilesInVersionApi({ datasetId: id, version, datasetFileIds: checkedKeys }).then(() => {
					message.success('操作成功！')
					setCheckedKey([])
					getVersionDetail()
					getDataSetList({
						page: 1,
						pageSize: 10,
						directoryType: searchValue,
						isAnnotated: activeKey === '2' ? true : activeKey === '3' ? false : ''
					})
				})
			}
		})
	}
	const onChange = (value: string) => {
		setSearchValue(value)
		getDataSetList({
			page: 1,
			pageSize: 10,
			directoryType: value,
			isAnnotated: activeKey === '2' ? true : activeKey === '3' ? false : ''
		})
	}
	// 目录筛选
	const selectDirectory = () => {
		return (
			<div>
				<Select
					style={{ width: '160px' }}
					allowClear
					placeholder="请选择目录划分"
					optionFilterProp="children"
					onChange={onChange}
					options={DATA_SET_FILE_TYPE_OPTIONS}
				/>
			</div>
		)
	}

	const renderTabBarExtraContent = () => {
		if (!baseInfo?.ifPublished) {
			const { items = [] } = listInfo || {}
			const allLength = items?.length || 0
			return (
				<Space>
					{selectDirectory()}
					{(allLength && checkedKeys?.length === allLength && (
						<Button
							className="icon-blue-item"
							icon={<CheckSquareOutlined />}
							shape="round"
							onClick={() => {
								checkedAll()
							}}
						>
							取消全选
						</Button>
					)) ||
						(allLength && checkedKeys?.length !== allLength && (
							<Button
								className="icon-blue-item"
								icon={<MinusSquareOutlined />}
								shape="round"
								onClick={() => {
									checkedAll()
								}}
							>
								全选
							</Button>
						)) ||
						null}
					<Button disabled={!checkedKeys?.length} shape="round" type="primary" danger onClick={removeFiles}>
						{checkedKeys?.length ? `删除 (${checkedKeys.length})` : '删除'}
					</Button>
					<Button type="primary" shape="round" onClick={() => PubSub.publishSync(ASYNC_SUBSCRIBE_PUBLIC, baseInfo)}>
						发布
					</Button>
				</Space>
			)
		}
		return (
			<Row>
				<Space>
					{selectDirectory()}
					<Tag color="success">版本已发布</Tag>
				</Space>
			</Row>
		)
	}

	const checkedAll = () => {
		const { items = [] } = listInfo || {}
		const allLength = items?.length || 0
		if (allLength !== checkedKeys?.length) {
			return setCheckedKey((items || []).map((item: any) => item.id))
		}
		setCheckedKey([])
	}

	const chckedChange = (e: any, key: any) => {
		const data = [...checkedKeys]
		const index = data.indexOf(key)
		if (index === -1) {
			return setCheckedKey([...data, key])
		}
		data.splice(index, 1)
		setCheckedKey(data)
	}

	return (
		<div className="list-box">
			<div className="tool">
				<Tabs
					activeKey={activeKey}
					onChange={(v: any) => setActiveKey(v)}
					items={[
						{
							label: `全部(${versionInformation?.fileCount || 0})`,
							key: '1'
						},
						{
							label: `有标注(${versionInformation?.haveAnnotationCount || 0})`,
							key: '2'
						},
						{
							label: `无标注(${unannotationCountRender()})`,
							key: '3'
						}
					]}
					tabBarExtraContent={renderTabBarExtraContent()}
				/>
			</div>
			<div className="list-view-box">
				<Row gutter={[16, 16]}>
					{(listInfo?.items?.length &&
						(listInfo?.items || []).map((item: any) => {
							const { fileCode, type } = item
							return (
								<Col key={item?.id}>
									<div className="list-item">
										<Link
											className="image-info"
											to={`/data-manage/ds-version-details-item?id=${id}&fileId=${item.id}&version=${version}&from=dataset`}
										>
											{(type === 2 && <img className="image" src={`/api/bff/download?fileCode=${fileCode}`} />) || (
												// 非图片类型
												<img className="image" src={zw} />
											)}

											<div className="title">{item?.name}</div>
											<div className="sub-title">目录：{item?.directoryType || '-'}</div>
										</Link>
										<div className="item-info">
											<Space>
												<FlagOutlined title="标注" className={item?.haveAnnotation ? 'active' : 'unactive'} />
												<ProfileOutlined title="属性" className={item?.haveProperty ? 'active' : 'unactive'} />
											</Space>
											<span className="time">{item?.createdTime}</span>
										</div>
										<div className="item-check-box">
											<Checkbox checked={!!checkedKeys.includes(item.id)} onChange={(e: any) => chckedChange(e, item.id)} />
										</div>
									</div>
								</Col>
							)
						})) || (
						<Col span={24}>
							<Empty></Empty>
						</Col>
					)}
				</Row>
			</div>
			<div className="page-box">
				<Pagination
					onChange={(page: any, pageSize: any) => {
						setCurrentPage(page)
						getDataSetList({
							page,
							pageSize: pageSize,
							directoryType: searchValue,
							isAnnotated: activeKey === '2' ? true : activeKey === '3' ? false : ''
						})
					}}
					current={currentPage}
					total={listInfo?.total || 0}
				/>
			</div>
			<PublicDataSetModal
				onOK={() => {
					setBaseInfo({ ...baseInfo, ifPublished: true })
				}}
			/>
		</div>
	)
}
