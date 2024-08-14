import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { Col, Row, Image, Empty } from 'antd'
// 资源规格
export default function IndicatorsInfo() {
	const { state } = useContext(Context)
	const detailData = state?.detailData || {}

	const renderIndicators = () => {
		const { folderCode, imageRelativePathList } = detailData || {}
		if (imageRelativePathList?.length) {
			return (
				<Row gutter={[16, 16]}>
					{(imageRelativePathList || []).map((item: any) => {
						return (
							<Col span={12} key={item}>
								<div className="indicator-image-box">
									<Image
										src={`/api/bff/relativeFilePath/download?fileCode=${folderCode}&relativeFilePath=${item}`}
										width={'100%'}
									/>
								</div>
							</Col>
						)
					})}
				</Row>
			)
		}
		return <Empty />
	}
	return (
		<div className="indicators-info-box">
			<div className="header-title">指标信息</div>
			{renderIndicators()}
		</div>
	)
}
