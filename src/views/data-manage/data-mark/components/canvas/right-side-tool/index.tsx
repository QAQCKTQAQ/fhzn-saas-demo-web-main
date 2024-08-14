import { FlagOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Select, Space } from 'antd'
import { Context } from '../../../store/reducerContent'
import { useContext, useEffect, useState } from 'react'
import { getTagsDicts } from '@/api/modules/common'
import { transitionArrKey } from '@/utils/util'
import { cloneDeep } from 'lodash'

export default function RightSideTool() {
	const { state, setLabelResultList } = useContext(Context)
	const { labelResultList = [] } = state || {}
	const [labelDicts, setLabelDicts] = useState<any>([])

	useEffect(() => {
		getLabelDict()
	}, [])

	const renderResultNum = () => {
		const length = labelResultList?.length || 0
		if (length) {
			return `标注结果(${length})`
		}
		return '标注结果'
	}

	// 删除
	const deleteLabelResult = (id: any) => {
		setLabelResultList(labelResultList.filter((item: any) => item.id !== id))
	}

	// 鼠标over过，点亮画布对应标注
	const liOnMouseOverLightCanvas = (id: any) => {
		setLabelResultList(
			labelResultList.map((item: any) => {
				const hoverActive = item.id === id ? true : false
				return { ...item, hoverActive }
			})
		)
	}

	// 鼠标out，取消点亮画布对应标注
	const liOnMouseOutLightCanvas = () => {
		setLabelResultList(
			labelResultList.map((item: any) => {
				return { ...item, hoverActive: false }
			})
		)
	}

	// 显示隐藏
	const showHideLabelInCanvas = (liId: any) => {
		setLabelResultList(
			labelResultList.map((item: any) => {
				const { visible, id } = item
				if (liId === id) {
					return { ...item, visible: !visible }
				}
				return item
			})
		)
	}

	// 标注标签
	const getLabelDict = async () => {
		const res: any = await getTagsDicts({
			type: 'data-space-annotation',
			page: 1,
			pageSize: 10000
		})
		setLabelDicts([
			{
				value: '',
				label: '未命名'
			},
			...transitionArrKey(res?.items || [])
		])
	}

	const changeLabelName = (v: any, liId: any) => {
		setLabelResultList(
			cloneDeep(labelResultList).map((item: any) => {
				const { id, labels } = item
				if (liId === id) {
					labels.labelName = v
				}
				return item
			})
		)
	}

	return (
		<div className="comment-result-box">
			<div className="comment-result-title">{renderResultNum()}</div>
			<ul>
				{(labelResultList || []).map((item: any) => {
					return (
						<li
							className="comment-result-label-box"
							key={item?.id}
							onMouseOver={() => liOnMouseOverLightCanvas(item.id)}
							onMouseOut={liOnMouseOutLightCanvas}
						>
							<div className="select-label-box">
								<FlagOutlined />
								<Select
									options={labelDicts}
									className="select-label-name"
									value={item?.labels.labelName || ''}
									onChange={(e: any) => changeLabelName(e, item.id)}
								></Select>
							</div>
							<Space>
								{(item.visible && <EyeOutlined className="hover-icon" onClick={() => showHideLabelInCanvas(item.id)} />) || (
									<EyeInvisibleOutlined className="hover-icon" onClick={() => showHideLabelInCanvas(item.id)} />
								)}

								<DeleteOutlined
									className="hover-icon"
									onClick={() => {
										deleteLabelResult(item?.id)
									}}
								/>
							</Space>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
