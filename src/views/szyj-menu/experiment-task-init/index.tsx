/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-05-10 17:14:30
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-05 15:40:25
 */
import { Button, Card, Space } from 'antd'
import './index.less'
import SuccessStatus from './components/success-status'
import LogRun from './components/log-run'
import React from 'react'
const headStyle: any = {
	background: 'rgb(43, 89, 255, 0.1)',
	textAlign: 'center',
	fontSize: '20px',
	color: '#262626 ',
	fontWeight: 500
}
const bodyStyle: any = {
	float: 'right'
}
const ExperimentTaskInit = () => {
	return (
		<div className="content-box experiment-page-create-init">
			<Card>
				<h1 className="title_page">组合实例YJ自检可视化</h1>
			</Card>
			<Card className="mt24">
				<SuccessStatus></SuccessStatus>
			</Card>
			<Card className="mt24" title="日志" headStyle={headStyle}>
				<Space>
					<Button type="primary">总览</Button>
					<Button type="primary">LDYJ识别算法1</Button>
				</Space>
				<LogRun></LogRun>
			</Card>
			<Card bodyStyle={bodyStyle}>
				<Space>
					<Button>取消</Button>
					<Button type="primary">确定</Button>
				</Space>
			</Card>
		</div>
	)
}

export default ExperimentTaskInit
