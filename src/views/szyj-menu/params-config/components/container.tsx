import { UploadOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons'
import ParamsForm from './params-form'
import { Button, Card, Space, Upload, message } from 'antd'
import { Context } from '../store/reducerContent'
import { useContext, useRef } from 'react'
import { baseURL } from '@/config/config'
import { saveConfigParamsApi } from '@/api/modules/szyj-manage'
import { VALUE_TYPE_ENUM } from '../const'
import { pickBy } from 'lodash'
import { generateUrlWithParams } from '@/utils/util'
const Container = () => {
	const {
		setEditable,
		setConfigInfo,
		serviceDefinitionId,
		configId,
		state: { editable, configInfo }
	}: any = useContext(Context)

	const paramsConfigRef: any = useRef()

	const saveData = async () => {
		const params = await paramsConfigRef.current.getFormData()
		// 处理为服务端保存数据结构
		const configParams = configInfo.map((item: any) => {
			const { field, type } = item
			const value = params[field]
			return { ...item, value: type === VALUE_TYPE_ENUM.NUMBER ? Number(value) : value }
		})
		saveConfigParamsApi({ fields: configParams, serviceDefinitionId, configId }).then(() => {
			message.success('保存成功！')
			setEditable(false)
			setConfigInfo(configParams)
		})
	}

	const renderEdit = () => {
		if (editable) {
			return (
				<>
					<Button type="primary" onClick={saveData}>
						保存
					</Button>
					<Button onClick={() => setEditable(false)}>取消</Button>
				</>
			)
		}
		return (
			<Button type="primary" icon={<EditOutlined />} disabled={!configInfo?.length} onClick={() => setEditable(true)}>
				编辑
			</Button>
		)
	}

	// 解析配置文件
	const onChangeConfigFile = (info: any) => {
		if (info.file.status === 'done') {
			const { code, data, message: msg } = info?.file?.response || {}
			if (code !== 0) {
				return message.error(msg || '文件解析失败，请稍后重试！')
			}
			setConfigInfo(data || [])
		}
	}

	const uploadProps = {
		name: 'file',
		action: `${baseURL}/bff/aicp/third-party/service-definitions/configs/upload`,
		data: pickBy(
			{
				serviceDefinitionId,
				configId
			},
			value => value
		),
		showUploadList: false,
		onChange: onChangeConfigFile
	}

	return (
		<Card
			title="参数配置"
			extra={
				<Space>
					{renderEdit()}
					<Upload {...uploadProps}>
						<Button icon={<UploadOutlined />}>上传配置</Button>
					</Upload>
					<Button
						icon={<DownloadOutlined />}
						disabled={!configInfo?.length}
						onClick={() =>
							window.open(
								generateUrlWithParams(`${baseURL}/aicp/third-party/service-definitions/configs/download`, {
									serviceDefinitionId,
									configId
								})
							)
						}
					>
						下载配置
					</Button>
				</Space>
			}
		>
			<ParamsForm ref={paramsConfigRef} />
		</Card>
	)
}

export default Container
