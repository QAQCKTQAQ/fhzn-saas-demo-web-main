import { useEffect, useRef, useState } from 'react'
import { Form, Button, Modal, Steps, Space, message } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODAL } from '../../const'
import BaseInfo from './base-info'
import TrainingSetInfo from './training-set-info'
import ResourceInfo from './resource-info'
import TerminalInfo from './terminal-info'
import { createTaskApi } from '@/api/modules/algorithm'
import { LogReport } from '@/utils/logReport/index'
import { OPERATION_ENUM } from '@/utils/logReport/const'

function AddModal(props: any) {
	const { onOK } = props
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [current, setCurrent] = useState(0)
	const [loading, setLoading] = useState(false)

	const currentData: any = useRef()
	// 用于获取子组件方法，触发收集form数据
	const baseInfoRef: any = useRef({})
	const trainingSetInfoRef: any = useRef({})
	const resourceInfoRef: any = useRef({})

	const formData: any = useRef({})

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_MODAL)
		}
	}, [])

	const showModal = (key: string, data: any) => {
		setVisible(true)
		setCurrent(0)
		currentData.current = data
		initialValues(data)
	}
	// 初始化数据
	const initialValues = (data: any) => {
		if (data) {
			const { name, comment, envImageId, algorithm, dataset, command, resources, model } = data
			formData.current.baseInfo = { name, comment }
			formData.current.trainingSetInfo = { envImageId, algorithm, dataset, command, model }
			formData.current.resourceInfo = { resources }
		}
	}

	const hideModal = () => {
		form.resetFields()
		formData.current = {}
		currentData.current = null
		setVisible(false)
	}

	const contentConfig: any = {
		0: <BaseInfo ref={baseInfoRef} initValues={formData.current.baseInfo || {}} />,
		1: <TrainingSetInfo ref={trainingSetInfoRef} initValues={formData.current.trainingSetInfo || {}} />,
		// 2: <ParamInfo ref={paramInfoRef} initValues={formData.current.paramInfo || {}} />,
		2: <ResourceInfo ref={resourceInfoRef} initValues={formData.current.resourceInfo || {}} />,
		3: <TerminalInfo command={formData.current?.trainingSetInfo?.command || ''} />
	}

	const steps = [
		{
			title: '基本信息',
			key: '基本信息'
		},
		{
			title: '训练设置',
			key: '训练设置'
		},
		// {
		// 	title: '参数映射',
		// 	key: '参数映射'
		// },
		{
			title: '资源规格',
			key: '资源规格'
		},
		{
			title: '运行命令预览',
			key: '运行命令预览'
		}
	]

	const stepPrev = () => {
		if (current > 0) {
			setCurrent(current - 1)
		}
	}

	const nextStep = async () => {
		// 保存组件填写数据
		if (current === 0) {
			formData.current.baseInfo = await baseInfoRef.current.getFormData()
		}
		if (current === 1) {
			formData.current.trainingSetInfo = await trainingSetInfoRef.current.getFormData()
		}
		if (current === 2) {
			formData.current.resourceInfo = await resourceInfoRef.current.getFormData()
		}
		setCurrent(current + 1)
	}

	const prevRender = () => {
		if (current > 0) {
			return <Button onClick={stepPrev}>上一步</Button>
		}
		return null
	}

	// 日志上报
	const handleLogReportData: any = (name: string) => {
		const operation = currentData.current ? OPERATION_ENUM.COMMON.EDIT : OPERATION_ENUM.COMMON.ADD
		const content = currentData.current ? `${name} - 训练任务复制成功` : `${name} - 训练任务创建成功`
		LogReport(operation, content)
	}

	const submit = () => {
		const { baseInfo, trainingSetInfo, paramInfo, resourceInfo } = formData.current
		const { command } = trainingSetInfo
		setLoading(true)
		createTaskApi({ ...baseInfo, ...trainingSetInfo, ...paramInfo, command: `${command}`, ...resourceInfo, type: 1 })
			.then(() => {
				hideModal()
				message.success('操作成功！')
				onOK && onOK()
				handleLogReportData(baseInfo?.name)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const nextRender = () => {
		if (current === steps.length - 1) {
			return (
				<Button type="primary" onClick={submit} loading={loading}>
					提交
				</Button>
			)
		}
		return (
			<Button type="primary" onClick={nextStep}>
				下一步
			</Button>
		)
	}

	const renderFooter = () => {
		return (
			<Space>
				<Button onClick={hideModal}>取消</Button>
				{prevRender()}
				{nextRender()}
			</Space>
		)
	}

	return (
		<Modal
			width="50%"
			title={(currentData.current && currentData.current.modalTitile) || '创建训练任务'}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			footer={renderFooter()}
		>
			<Steps current={current} items={steps} />
			<div className="m-page-training-task-steps-content">{contentConfig[current]}</div>
		</Modal>
	)
}

export default AddModal
