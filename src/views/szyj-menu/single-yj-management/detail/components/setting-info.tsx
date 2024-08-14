/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-14 16:29:00
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-12 18:30:53
 */
// 样机信息
// import YjCombination from './yj-combination'
import { Button, Col, Form, Input, Row, Space, message, Select } from 'antd'
// import { rdmRgbColor } from '@/utils/util'
import { Context } from '../store/reducerContent'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getYjDefinitionsConfig, getYjDefinitionsSchema, updateImageInfoApi } from '@/api/modules/szyj-manage'
import { EditOutlined } from '@ant-design/icons'

export default function SettingInfo() {
	const {
		state: { baseInfo },
		setBaseInfo
	} = useContext(Context)
	const [form] = Form.useForm()
	const { id } = useParams()
	const [inData, setInData] = useState([])
	const [outData, setOutData] = useState([])
	const [currentData, setCurrentData] = useState([])
	const [schemaData, setSchemaData] = useState({})
	inData
	outData
	currentData
	schemaData
	const { levelId } = baseInfo || {}
	const [editable, setEditable] = useState(false)

	useEffect(() => {
		if (levelId) {
			getYjCommConfig(levelId)
			getYjCommSchema(levelId)
		}
	}, [levelId])

	// 匹配当前yj的输入输出
	const findArr = (cur: any, pos: any, type: any) => {
		let arr: any = []
		pos.map((item: any, index: any) => {
			console.log(index)
			if (item.id != id) {
				let data = type === 'in' ? item.inputs : item.outputs
				for (let i = 0; i <= data.length - 1; i++) {
					for (let j = 0; j <= cur.length - 1; j++) {
						if (cur[j].name == data[i].name) {
							arr.push(item)
						}
					}
				}
			}
		})
		return arr
	}

	const cancelEdit = () => {
		form.resetFields()
		setEditable(false)
	}

	// 保存
	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id, levelId } = baseInfo
		const {
			code: { algorithm },
			...rest
		} = values

		const data = {
			...rest,
			code: {
				algorithm: `${algorithm}`.trim().split(',')
			}
		}

		updateImageInfoApi({
			id,
			...data
		}).then(() => {
			cancelEdit()
			message.success('保存成功！')
			setBaseInfo({ ...baseInfo, ...data, levelId })
		})
	}

	// 编辑按钮
	const renderEdit = () => {
		if (editable) {
			return (
				<Space>
					<Button size="small" type="link" onClick={cancelEdit}>
						取消
					</Button>
					<Button size="small" type="link" onClick={saveData}>
						保存
					</Button>
				</Space>
			)
		}
		return (
			<Button
				size="small"
				type="link"
				icon={<EditOutlined />}
				onClick={() => {
					setEditable(true)
					initForm()
				}}
			>
				编辑
			</Button>
		)
	}

	// 编辑模式初始化数据
	const initForm = () => {
		const { code = {}, ...rest } = baseInfo || {}
		const algorithm = (code?.algorithm || []).join(',')
		form.setFieldsValue({
			...rest,
			code: {
				algorithm
			}
		})
	}

	// 获取YJ通信配置信息
	const getYjCommConfig = (levelId: any) => {
		getYjDefinitionsConfig({ levelId: levelId }).then((res: any) => {
			const data = res || []
			let yjList: any = data
			yjList.map((item: any) => {
				let yjOutputList: any = []
				let yjInputList: any = []
				let outData: any = []
				let inData: any = []
				let curData: any = []
				if (item.id == id) {
					curData.push(item)
					setCurrentData(curData)
					yjOutputList = item.outputs
					yjInputList = item.inputs
					// 获取yj输入
					inData = findArr(yjOutputList, yjList, 'in')
					// 获取yj输出
					outData = findArr(yjInputList, yjList, 'out')
					setOutData(outData)
					setInData(inData)
				}
			})
		})
	}
	// 获取topic信息
	const getYjCommSchema = (levelId: any) => {
		getYjDefinitionsSchema({ levelId: levelId }).then((res: any) => {
			const data = res || {}
			setSchemaData(data)
		})
	}

	const renderInput = (value: any) => {
		if (editable) {
			return <Input placeholder="请输入" />
		}
		return value
	}
	const renderSelect = (value: any) => {
		if (editable) {
			return <Select options={[]} placeholder="请选择" />
		}
		return value
	}
	// const renderCodeAlgorithm = (algorithm: any) => {
	// 	if (editable) {
	// 		return <Input placeholder="请输入" />
	// 	}
	// 	return (algorithm || []).map((item: any) => {
	// 		return (
	// 			(item && (
	// 				<Tag color={rdmRgbColor()} key={item}>
	// 					{item}
	// 				</Tag>
	// 			)) ||
	// 			null
	// 		)
	// 	})
	// }
	// renderCodeAlgorithm('1')

	const renderResourceConfig = () => {
		if (editable) {
			return (
				<Row gutter={6}>
					<Col span={8}>
						<Form.Item name={['resource', 'cpu']} rules={[{ required: true, message: '请输入CPU' }]} initialValue={2}>
							<Input type="number" min={1} addonAfter="CPU" placeholder="请输入" />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={['resource', 'gpu']} rules={[{ required: true, message: '请输入GPU' }]} initialValue={2}>
							<Input type="number" addonAfter="GPU" min={1} placeholder="请输入" />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={['resource', 'memory']} rules={[{ required: true, message: '请输入内存' }]} initialValue={8}>
							<Input type="number" addonAfter="GB内存" min={1} placeholder="请输入" />
						</Form.Item>
					</Col>
				</Row>
			)
		}

		const { gpu, cpu, memory } = baseInfo?.resource || {}
		return `${cpu}CPU ${gpu}GPU ${memory}G内存`
	}

	return (
		<>
			{/* <div className="side-top-box">
				<div className="header-title">样机通信</div>
				{(currentData && currentData.length && inData && inData.length && outData && outData.length && (
					<YjCombination schemaData={schemaData} currentData={currentData} inData={inData} outData={outData} />
				)) || <Empty></Empty>}
			</div> */}
			<div className="side-top-box">
				<div className="image-info-edit-box">{renderEdit()}</div>
				<Form preserve={false} form={form} className="image-info-box">
					<div className="box-container">
						<div className="header-title">镜像信息</div>
						<Row gutter={[16, 0]}>
							<Col span={12}>
								<Form.Item
									label={'基础环境'}
									name={['envImage', 'basicEnv']}
									rules={[{ required: editable, message: '请输入基础环境' }]}
								>
									{renderInput(baseInfo?.envImage?.basicEnv)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label={'镜像:'} name={['image', 'url']} rules={[{ required: editable, message: '请输入镜像地址' }]}>
									{renderSelect(baseInfo?.image?.url)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label={'镜像描述:'} name={['image', 'comment']}>
									{renderInput(baseInfo?.image?.comment)}
								</Form.Item>
							</Col>
						</Row>
					</div>
					<div className="box-container">
						<div className="header-title">算法信息</div>
						<Row gutter={[16, 0]}>
							<Col span={12}>
								<Form.Item label={'算法:'} name={['algorithm', 'id']} rules={[{ required: true, message: '请选择算法' }]}>
									{renderSelect(baseInfo?.algorithm?.id)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={'算法版本:'}
									name={['algorithm', 'version']}
									rules={[{ required: true, message: '请选择算法版本' }]}
								>
									{renderSelect(baseInfo?.model?.version)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={'算法描述:'}
									name={['algorithm', 'comment']}
									rules={[{ required: false, message: '请输入算法描述' }]}
								>
									{renderInput(baseInfo?.model?.comment)}
								</Form.Item>
							</Col>
						</Row>
					</div>
					<div className="box-container">
						<div className="header-title">模型信息</div>
						<Row gutter={[16, 0]}>
							<Col span={12}>
								<Form.Item label={'模型:'} name={['model', 'id']} rules={[{ required: true, message: '请选择模型' }]}>
									{renderSelect(baseInfo?.model?.id)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={'模型版本:'}
									name={['model', 'version']}
									rules={[{ required: true, message: '请输入模型版本' }]}
								>
									{renderSelect(baseInfo?.model?.version)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={'模型描述:'}
									name={['model', 'comment']}
									rules={[{ required: false, message: '请输入模型描述' }]}
								>
									{renderInput(baseInfo?.model?.comment)}
								</Form.Item>
							</Col>
						</Row>
					</div>
					<div className="box-container">
						<div className="header-title">运行信息</div>
						<Row gutter={[16, 0]}>
							<Col span={12}>
								<Form.Item label={'资源配置'}>{renderResourceConfig()}</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label={'运行命令:'} name={'command'} rules={[{ required: editable, message: '请输入运行命令' }]}>
									{renderInput(baseInfo?.command)}
								</Form.Item>
							</Col>
						</Row>
					</div>
					{/* <div className="box-container">
						<div className="header-title">调试信息</div>
						<Row gutter={[16, 0]}>
							<Col span={12}>
								<Form.Item label={'输入信息:'} name={['debugInformation', 'input']}>
									{renderInput(baseInfo?.debugInformation?.input)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label={'输出信息:'} name={['debugInformation', 'output']}>
									{renderInput(baseInfo?.debugInformation?.output)}
								</Form.Item>
							</Col>
						</Row>
					</div> */}
				</Form>
			</div>
		</>
	)
}
