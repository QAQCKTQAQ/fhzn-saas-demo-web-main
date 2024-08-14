import { Button, Col, Form, Row, Select, Space, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { addUpdatecharacterSettingInfoApi, getCharacterSettingInfoApi } from '@/api/modules/szyj-manage'
import UploadFile from '@/components/upload-file'
import { UPLOAD_SOURCE_ENUM } from '@/const/constants'
import { Context } from '../store/reducerContent'
import { getTagsDicts } from '@/api/modules/common'
import { transitionArrToMap, transitionArrKey } from '@/utils/util'
// 设置信息
export default function SettingInfo() {
	const [editable, setEditable] = useState(false)
	const [settingInfo, setSettingInfo] = useState<any>({})
	const [fileList, setFileList] = useState<any>([])
	const [form] = Form.useForm()
	const { id } = useParams()
	const [queryParams] = useSearchParams()
	const version = queryParams.get('version')
	const {
		state: { baseInfo }
	} = useContext(Context)

	useEffect(() => {
		getPropertyProxyTypes()
		getPropertyProxyTargetTypes()
		getPropertyModelForms()
		getPropertyModelType()
	}, [])

	// 设置选项
	const [propertyProxyTypes, setPropertyProxyType] = useState([])
	const [propertyProxyTargetTypes, setPropertyProxyTargetTypes] = useState([])
	const [propertyModelForms, setPropertyModelForms] = useState([])
	const [propertyModelTypes, setPropertyModelTypes] = useState([])

	// 设置map
	const [proxyTypeMap, setProxyTypeMap] = useState<any>({})
	const [proxyTargetTypeMap, setProxyTargetTypeMap] = useState<any>({})
	const [modelFormMap, setModelFormMap] = useState<any>({})
	const [modelTypeMap, setModelTypeMap] = useState<any>({})

	// 代理类型
	const getPropertyProxyTypes = () => {
		getTagsDicts({
			type: 'property-proxy-type',
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			const items = res?.items || []
			setPropertyProxyType(transitionArrKey(items))
			setProxyTypeMap(transitionArrToMap(items))
		})
	}

	// 模型类型
	const getPropertyModelType = () => {
		getTagsDicts({
			type: 'property-model-type',
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			const items = res?.items || []
			setPropertyModelTypes(transitionArrKey(items))
			setModelTypeMap(transitionArrToMap(items))
		})
	}

	// 代理对象
	const getPropertyProxyTargetTypes = () => {
		getTagsDicts({
			type: 'property-proxy-target-type',
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			const items = res?.items || []
			setPropertyProxyTargetTypes(transitionArrKey(items))
			setProxyTargetTypeMap(transitionArrToMap(items))
		})
	}

	// 模型形式
	const getPropertyModelForms = () => {
		getTagsDicts({
			type: 'property-model-form',
			page: 1,
			pageSize: 1000
		}).then((res: any) => {
			const items = res?.items || []
			setPropertyModelForms(transitionArrKey(items))
			setModelFormMap(transitionArrToMap(items))
		})
	}

	useEffect(() => {
		getCharacterSettingInfo(id, version)
	}, [id, version])

	const getCharacterSettingInfo = (id: any, version: any) => {
		getCharacterSettingInfoApi({ id, version }).then((res: any) => {
			const data = res || {}
			setSettingInfo(data)
			const { modelFileCode, modelFileName } = data
			// 初始化上传文件列表
			if (modelFileCode) {
				setFileList([
					{
						url: `/api/bff/download?fileCode=${modelFileCode}`,
						name: modelFileName,
						uid: modelFileCode
					}
				])
			}
		})
	}
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
			<Button size="small" type="link" icon={<EditOutlined />} onClick={editClick}>
				编辑
			</Button>
		)
	}

	const editClick = () => {
		setEditable(true)
		const { modelFileCode, ...rest } = settingInfo
		form.setFieldsValue({
			...rest,
			modelFileCode: [modelFileCode]
		})
	}

	const cancelEdit = () => {
		form.resetFields()
		setEditable(false)
	}

	const saveData = async () => {
		const values = await form.validateFields().then(values => {
			return values
		})
		const { id } = baseInfo
		const { modelFileCode, ...rest } = values
		addUpdatecharacterSettingInfoApi({ ...rest, modelFileCode: modelFileCode[0], id }).then((version: any) => {
			getCharacterSettingInfo(id, version)
			setEditable(false)
			message.success('保存成功！')
		})
	}

	const renderSelect = ({ value, options }: any) => {
		if (editable) {
			return <Select placeholder="请选择" options={options} />
		}
		return value
	}

	const renderUploadFile: any = () => {
		return <UploadFile maxCount={1} disabled={!editable} sourceType={UPLOAD_SOURCE_ENUM.FILES} fileList={fileList} />
	}

	return (
		<div className="side-top-box">
			<div className="header-title">
				设置信息
				{renderEdit()}
			</div>
			<Form form={form} preserve={false}>
				<Row gutter={[16, 0]}>
					<Col span={8}>
						<Form.Item name={'modelType'} label={'模型类型:'} rules={[{ required: editable, message: '请选择模型形式' }]}>
							{renderSelect({
								value: modelTypeMap[`${settingInfo.modelType}`] || '--',
								options: propertyModelTypes
							})}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={'modelForm'} rules={[{ required: editable, message: '请选择模型形式' }]} label={'模型形式:'}>
							{renderSelect({
								value: modelFormMap[settingInfo.modelForm] || '--',
								options: propertyModelForms
							})}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={'proxyType'} rules={[{ required: editable, message: '请选择代理类型' }]} label={'代理类型:'}>
							{renderSelect({
								value: proxyTypeMap[settingInfo.proxyType] || '--',
								options: propertyProxyTypes
							})}
						</Form.Item>
					</Col>
					{/* <Col span={8}>
						<Form.Item name={'proxyInterface'} rules={[{ required: editable, message: '请选择代理接口' }]} label={'代理接口:'}>
							{renderSelect({
								value: proxyInterfaceMap[settingInfo.proxyInterface] || '--',
								options: propertyProxyTargetTypes.map((item: any) => {
									const { name, code } = item
									return {
										value: code,
										label: name
									}
								})
							})}
						</Form.Item>
					</Col> */}
					<Col span={8}>
						<Form.Item name={'proxyTargetType'} rules={[{ required: editable, message: '请选择代理对象' }]} label={'代理对象:'}>
							{renderSelect({
								value: proxyTargetTypeMap[settingInfo.proxyTargetType] || '--',
								options: propertyProxyTargetTypes
							})}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={8}>
						<Form.Item name={'modelFileCode'} rules={[{ required: editable, message: '请上传模型文件' }]} label={'模型文件:'}>
							{renderUploadFile()}
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	)
}
