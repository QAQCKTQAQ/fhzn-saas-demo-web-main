import { Form } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/reducerContent'
import { getTrainDetailApi } from '@/api/modules/algorithm'
import { getCodeDetailApi, getDataSetDetailApi, getImageDetailApi } from '@/api/modules/common'

// 训练设置
export default function TrainingSettingInfo() {
	const {
		state: { baseInfo }
	} = useContext(Context)

	const [detailData, setDetailData] = useState<any>({})

	useEffect(() => {
		const { trainingId } = baseInfo
		if (trainingId) {
			getTrainingDetail(trainingId)
		}
	}, [baseInfo?.trainingId])

	// 获取训练设置详情
	const getTrainingDetail = async (id: any) => {
		const deatilRes: any = await getTrainDetailApi(id)
		const { envImageId, dataset, algorithm } = deatilRes || {}
		const trainId = dataset?.id
		const codeId = algorithm?.id
		const resCode = await getCodeDetailApi(codeId)
		const resImage = await getImageDetailApi(envImageId)
		const resDataSet = await getDataSetDetailApi(trainId)
		const codeName = resCode?.name || ''
		const imageName = resImage?.name || ''
		const dataSetName = resDataSet?.name || ''
		setDetailData({ ...deatilRes, codeName, imageName, dataSetName, dataset })
	}

	const renderDataSetLink = () => {
		const { dataSetName, dataset } = detailData || {}
		const version = dataset?.version
		const id = dataset?.id
		if (id && version) {
			return (
				<Link to={`/data-manage/ds-detail-image?id=${id}&version=${version}&name=滑坡检测数据集-1018`} target="_blank">
					{dataSetName} - {version}
				</Link>
			)
		}
		return '-'
	}

	return (
		<div className="training-setting">
			<div className="header-title">训练设置</div>
			<Form>
				<Form.Item label={'算法:'}>{detailData.codeName}</Form.Item>
				<Form.Item label={'镜像:'}>{detailData.imageName}</Form.Item>
				<Form.Item label={'数据集:'}>{renderDataSetLink()}</Form.Item>
			</Form>
		</div>
	)
}
