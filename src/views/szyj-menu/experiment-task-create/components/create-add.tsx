import { useState, useRef } from 'react'
import { Button, Steps, Space, message } from 'antd'
import BaseInfo from './base-info'
import UploadFileCom from './upload-file'
import FinishInfo from './task-finish'
import React from 'react'
import { Link } from 'react-router-dom'

function CreateExperimentTask() {
	const [currentStep, setCurrent] = useState(0)
	const [loading, setLoading] = useState(false)
	const uploadRef: any = useRef()
	const baseInfoRef: any = useRef()
	// 下一步
	const nextStep = () => {
		setCurrent(currentStep + 1)
	}
	const contentConfig: any = {
		0: (
			<BaseInfo
				submit={() => {
					nextStep()
				}}
				ref={baseInfoRef}
			/>
		),
		1: (
			<UploadFileCom
				submit={() => {
					nextStep()
				}}
				ref={uploadRef}
			/>
		),
		2: <FinishInfo />
	}

	const steps = [
		{
			title: '填写基本信息',
			key: '填写基本信息'
		},
		{
			title: '文件上传',
			key: '文件上传'
		},
		{
			title: '完成',
			key: '完成'
		}
	]

	const stepPrev = () => {
		if (currentStep > 0) {
			setCurrent(currentStep - 1)
		}
	}
	// 基础信息表单验证
	const baseInfo = () => {
		baseInfoRef.current.validateForm()
	}

	const prevRender = () => {
		if (currentStep > 0 && currentStep !== steps.length - 1) {
			return (
				<Button type="primary" onClick={stepPrev}>
					上一步
				</Button>
			)
		}
		return null
	}

	const submit = () => {
		setLoading(true)
		setTimeout(() => {
			message.success('操作成功！')
			setLoading(false)
			nextStep()
		}, 2000)
	}
	// 创建任务
	const creatTask = () => {
		uploadRef.current.validateForm()
	}
	const nextRender = () => {
		// 倒数第二步
		if (currentStep === steps.length - 2) {
			return (
				<Button type="primary" onClick={creatTask} loading={loading}>
					完成
				</Button>
			)
		}
		// 最后一步
		if (currentStep === steps.length - 1) {
			return (
				<Space>
					<Link to="/test/experiment-task-init">
						<Button type="primary" onClick={submit} loading={loading}>
							初始化
						</Button>
					</Link>
					<Link to="/test/experiment-task-detail">
						<Button type="default" onClick={submit} loading={loading}>
							查看详情
						</Button>
					</Link>
				</Space>
			)
		}
		return (
			<Button type="primary" onClick={baseInfo}>
				下一步
			</Button>
		)
	}

	const renderFooter = () => {
		return (
			<Space>
				{prevRender()}
				{nextRender()}
			</Space>
		)
	}

	return (
		<>
			<Steps current={currentStep} items={steps} />
			<div className="m-page-experiment-create-steps-content">
				{contentConfig[currentStep]}
				{renderFooter()}
			</div>
		</>
	)
}

export default CreateExperimentTask
