import { SaveOutlined, DragOutlined, GatewayOutlined, AimOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Space, message } from 'antd'
import { Context } from '../../../store/reducerContent'
import { useContext, useEffect, useState } from 'react'
import { saveMarkInfoApi } from '@/api/modules/data-manage'

export default function LeftSideTool(props: any) {
	const {
		state: { drag, rectOn, labelResultList, crossOn },
		setRectOn,
		setDrag,
		extraInfo,
		setLabelResultList,
		setCrossOn
	} = useContext(Context)

	const { imageAnnotateMemory } = props
	const [visibleLabel, setVisibleLabel] = useState(true)

	useEffect(() => {
		setLabelResultList(
			labelResultList.map((item: any) => {
				return { ...item, visible: visibleLabel }
			})
		)
	}, [visibleLabel])

	const saveMarkInfo = () => {
		if (!labelResultList?.length) {
			return message.info('标注结果不能为空！')
		}
		const { id, callBack } = extraInfo || {}
		saveMarkInfoApi({ id, annotationData: handleLabelResultListToTxt() }).then(() => {
			message.success('标注信息保存成功！')
			callBack && callBack()
		})
	}

	// 标注结果数据处理为
	const handleLabelResultListToTxt = () => {
		const labelResultList = imageAnnotateMemory()
		return labelResultList.map((item: any) => {
			const { rectMask = [], labels } = item || {}
			const { labelName } = labels || {}
			return [labelName, ...Object.values(rectMask)]
		})
	}

	return (
		<div className="side-tool-box">
			<Space direction="vertical">
				<div title="保存标注" className="icon-box" onClick={saveMarkInfo}>
					<SaveOutlined />
				</div>
				<div title="十字线" className={crossOn ? 'icon-box active' : 'icon-box'} onClick={() => setCrossOn(!crossOn)}>
					<AimOutlined />
				</div>
				<div title="显示/隐藏标注名称" className="icon-box" onClick={() => setVisibleLabel(!visibleLabel)}>
					{(visibleLabel && <EyeOutlined />) || <EyeInvisibleOutlined />}
				</div>
				<div
					className={drag ? 'icon-box active' : 'icon-box'}
					onClick={() => {
						setRectOn(false)
						setDrag(true)
					}}
				>
					<DragOutlined />
				</div>
				<div
					title="矩形工具"
					className={rectOn ? 'icon-box active' : 'icon-box'}
					onClick={() => {
						setRectOn(true)
						setDrag(false)
					}}
				>
					<GatewayOutlined />
				</div>
				{/* <div title="旋转矩形标注" className="icon-box">
					<RotateRightOutlined />
				</div> */}
			</Space>
		</div>
	)
}
