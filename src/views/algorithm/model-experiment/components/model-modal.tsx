import { useEffect, useState, useRef } from 'react'
import { Button, Form, Modal, Space, message, Tree, Select } from 'antd'
import PubSub from 'pubsub-js'
import { ASYNC_SUBSCRIBE_MODEL_MODAL } from '../const'
import { pathToTree } from '@/utils/util'
import { getModalsByTrainIdApi, saveModelsApi } from '@/api/modules/algorithm'
import { modelsListQery } from '@/api/modules/models-mange'
import { baseURL } from '@/config/config'
const { DirectoryTree } = Tree

function ModelModal() {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const currentData: any = useRef({})
	const [treeData, setTreeData] = useState([])
	const [checkedKeys, setCheckedKeys] = useState<any[]>([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const treeDataRef = useRef()
	const [modelOptions, setModelOptions] = useState([])

	useEffect(() => {
		PubSub.subscribe(ASYNC_SUBSCRIBE_MODEL_MODAL, showModal)
		return () => {
			PubSub.unsubscribe(ASYNC_SUBSCRIBE_MODEL_MODAL)
		}
	}, [])

	useEffect(() => {
		if (visible) {
			getModelsListQery()
			getModalsByTrainId()
		}
	}, [visible])

	const getModelsListQery = () => {
		modelsListQery({ page: 1, pageSize: 1000 }).then((res: any) => {
			const { items = [] } = res
			setModelOptions(
				(items || []).map((item: any) => {
					const { id, name } = item
					return {
						value: id,
						label: name
					}
				})
			)
		})
	}

	const getModalsByTrainId = () => {
		const { id } = currentData.current
		getModalsByTrainIdApi(id).then((res: any) => {
			const data = res || []
			treeDataRef.current = data
			const tree = pathToTree(data)
			setTreeData(tree)
			initExpandedKeys(tree)
		})
	}

	const treeDataChecked = (data: any) => {
		const result: any = []
		data.forEach((item: any) => {
			result.push(item.key)
			if (item.children && item.children.length) {
				const temp = treeDataChecked(item.children)
				if (temp && temp.length) {
					result.push(...temp)
				}
			}
		})
		return result
	}

	const initExpandedKeys = (data: any) => {
		const keys = treeDataChecked(data)
		setExpandedKeys(keys)
	}

	const showModal = (key: string, data: any) => {
		setVisible(true)
		currentData.current = data
	}

	const hideModal = () => {
		form.resetFields()
		setCheckedKeys([])
		setExpandedKeys([])
		setVisible(false)
	}

	// 根据选中keys 过滤成path
	const handlePath = () => {
		const { current }: any = treeDataRef
		return current.filter((path: any) => {
			return checkedKeys.includes(path)
		})
	}

	const downLoadModel = async () => {
		const { id } = currentData.current
		const paths = handlePath()
		if (!paths.length) {
			return message.info('请选择模型！')
		}
		window.open(`${baseURL}/aicp/training/models/download?id=${id}&paths=${encodeURIComponent(paths.join(','))}`)
	}

	// 保存
	const saveModel = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = currentData.current
		const paths = handlePath()
		if (!paths.length) {
			return message.info('请选择模型！')
		}
		setLoading(true)
		saveModelsApi({ trainingId: id, ...values, filePaths: paths })
			.then(() => {
				hideModal()
				message.success('模型保存成功!')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const renderModalFooter = () => {
		const { type } = currentData.current
		return (
			<Space>
				<Button onClick={hideModal}>取消</Button>
				{(type === 'download' && (
					<Button type="primary" onClick={downLoadModel} loading={loading}>
						下载模型
					</Button>
				)) ||
					null}
				{(type === 'save' && (
					<Button type="primary" onClick={saveModel} loading={loading}>
						保存模型
					</Button>
				)) ||
					null}
			</Space>
		)
	}

	// 选中叶子结点
	const selectCheckedKeys = (checkedKeys: any) => {
		console.log('checkedKeys', checkedKeys)
		setCheckedKeys(checkedKeys)
	}

	return (
		<Modal
			width="600px"
			title={currentData.current && currentData.current.modalTitle}
			open={visible}
			onCancel={hideModal}
			maskClosable={false}
			destroyOnClose
			footer={renderModalFooter()}
		>
			<Form form={form} style={{ width: '100%' }} layout="vertical">
				{(currentData.current.type === 'save' && (
					<Form.Item name={'id'} label={'归属模型'} rules={[{ required: true, message: '请选择归属模型' }]}>
						<Select placeholder="请选择" options={modelOptions}></Select>
					</Form.Item>
				)) ||
					null}
				<Form.Item label={'选择模型'} rules={[{ required: true, message: '请选择模型' }]}>
					<DirectoryTree
						expandedKeys={expandedKeys}
						checkable
						treeData={treeData}
						checkedKeys={checkedKeys}
						onCheck={selectCheckedKeys}
						height={400}
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default ModelModal
