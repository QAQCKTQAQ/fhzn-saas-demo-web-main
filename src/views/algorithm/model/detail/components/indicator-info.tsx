import { useContext } from 'react'
import { Context } from '../store/reducerContent'
import { Col, Row, Image, Empty, Tag } from 'antd'
import { FundOutlined } from '@ant-design/icons'
// 指标信息
export default function IndicatorInfo() {
	const {
		state: { baseInfo }
	} = useContext(Context)

	const getNameByPath = (path: string) => {
		const str = `${path}`
		const lastIndex = str.lastIndexOf('/')
		return str.substring(lastIndex + 1)
	}

	const renderIndicators = () => {
		const { folderCode, imageRelativePathList } = baseInfo?.indicator || {}
		if (imageRelativePathList?.length) {
			return (
				<Row gutter={[16, 16]}>
					{(imageRelativePathList || []).map((item: any) => {
						return (
							<Col span={12} key={item}>
								<div className="indicator-image-box">
									<div className="title-box">
										<div className="title">{getNameByPath(item)}</div>
									</div>
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
		<div className="side-bottom-box">
			<div className="header-title">
				<label>指标信息</label>
				<Tag color="success" icon={<FundOutlined />}>
					MAP：--
				</Tag>
			</div>
			{renderIndicators()}
		</div>
	)
}
