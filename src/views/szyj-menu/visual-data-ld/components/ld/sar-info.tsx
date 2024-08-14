import { Empty, Image } from 'antd'
export default function SarInfo(props: any) {
	const { sar } = props
	return (
		<div className="sar-box box">
			<div className="inner-content-box">
				<div className="title-box">
					<div className="title">SAR图像</div>
				</div>
				<div className="sar-img-box">
					{(sar && <Image className="sar-img" src={`data:image/png;base64,${sar}`} />) || <Empty />}
				</div>
			</div>
		</div>
	)
}
