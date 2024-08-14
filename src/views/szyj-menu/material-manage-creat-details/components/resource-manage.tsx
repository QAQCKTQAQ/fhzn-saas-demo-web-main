/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-16 13:53:57
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-16 15:16:14
 */
import { Card } from 'antd'
import React, { useState } from 'react'
import YjList from './yj-list'

const tabList: any = [
	{
		key: '1',
		tab: 'SZYJ'
	},
	{
		key: '2',
		tab: '特性信息'
	}
]

const contentList: Record<string, React.ReactNode> = {
	tab1: <p>content1</p>,
	tab2: <p>content2</p>
}

const ResourceManage: React.FC = () => {
	const [activeTabKey1, setActiveTabKey1] = useState<string>('1')

	const onTab1Change = (key: string) => {
		setActiveTabKey1(key)
	}

	return (
		<>
			<Card
				style={{ width: '100%' }}
				title="资源管理"
				extra={<a href="#">More</a>}
				tabList={tabList}
				activeTabKey={activeTabKey1}
				onTabChange={onTab1Change}
			>
				{contentList[activeTabKey1]}
				<YjList></YjList>
			</Card>
		</>
	)
}

export default ResourceManage
