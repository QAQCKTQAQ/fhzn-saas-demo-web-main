/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-12 18:37:57
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-09-01 16:28:04
 */
import { useEffect, useState, useContext } from 'react'
import { Descriptions, Tag } from 'antd'
import { dataSetBasicInformation } from '@/api/modules/data-set'
import { useSearchParams } from 'react-router-dom'
import { Context } from '../store/reducerContent'
import { DATA_SET_TAG_COLOR_MAP } from '@/const/constants'
interface basicType {
	id?: any
	name?: string
	comment?: string
	updatedTime?: any
	createdTime?: any
	tags?: any
	version?: any
	creator?: any
}
export default function BasicInformaiton() {
	const { state } = useContext(Context)
	const [basicData, setBasicData] = useState<basicType>({})
	const [dataTags, setDataTags] = useState([])
	const [search] = useSearchParams()
	// 通过 get('search') 方法，获取 search 参数
	const id = search.get('id')
	const version = search.get('version')
	useEffect(() => {
		getBasicInformation()
	}, [])

	useEffect(() => {
		const { dataTags } = state
		setDataTags(dataTags)
	})
	// 获取基础信息
	const getBasicInformation = () => {
		dataSetBasicInformation(id, {})
			.then((res: any) => {
				setBasicData(res)
			})
			.finally(() => {})
	}
	// 匹配框架名称
	const useRenderTags = (types: any) => {
		if (types) {
			let label: any = '-'
			label = types.map((item: any, index: any) => {
				let labelCopy: any = []
				dataTags.map((key: any) => {
					if (item === key.value) {
						labelCopy.push(key.label)
					}
				})
				return (
					<Tag key={index} color={DATA_SET_TAG_COLOR_MAP[item]}>
						{labelCopy.join(',')}
					</Tag>
				)
			})
			return label
		}
		return '-'
	}
	return (
		<>
			<div className="ds-basic">
				<Descriptions column={1} title="基础信息" bordered>
					<Descriptions.Item label="数据集名称">{basicData.name}</Descriptions.Item>
					<Descriptions.Item label="数据集版本">{version}</Descriptions.Item>
					<Descriptions.Item label="标签">{useRenderTags(basicData.tags)}</Descriptions.Item>
					<Descriptions.Item label="创建用户">{basicData.creator}</Descriptions.Item>
					<Descriptions.Item label="创建时间">{basicData.createdTime}</Descriptions.Item>
					<Descriptions.Item label="更新时间">{basicData.updatedTime}</Descriptions.Item>
					<Descriptions.Item label="描述">{basicData.comment}</Descriptions.Item>
				</Descriptions>
			</div>
		</>
	)
}
