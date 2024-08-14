import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../store/reducerContent'
import { getFZPTLinkDYGZApi, getJCLinkDYGZApi } from '@/api/modules/visual-data'
import { Col, Row, Empty } from 'antd'
import ParamItem from '../param-item'
import { GZDW_TYPE_ENUM } from '../../const'
const { FZBY_PT, JC_SZ_YJ } = GZDW_TYPE_ENUM
import { CHAIN_MAP } from '@/views/szyj-menu/visual-data/components/code-data/const'

export default function TestPlat(props: any) {
	const { type } = props
	const { state, testId } = useContext(Context)
	const selectDdId = state?.selectDdId?.instanceGroupId || ''
	const selectTime = state?.selectTime || ''
	const [testPlatInfo, setTestPlatInfo] = useState<any>([])

	const config_interface = {
		[FZBY_PT]: getFZPTLinkDYGZApi,
		[JC_SZ_YJ]: getJCLinkDYGZApi
	}

	useEffect(() => {
		if (selectDdId && selectTime && type) {
			geTestPlatInfo()
		}
	}, [selectDdId, selectTime, type])

	const geTestPlatInfo = async () => {
		const funcApi: any = config_interface[type]
		if (funcApi) {
			const data = await funcApi({ instanceGroupId: selectDdId, id: testId, timeSlice: selectTime })
			return setTestPlatInfo(handleOrderParamList(data || []))
		}
		return setTestPlatInfo([])
	}

	// 选中当前链路输出 headers和 body数据处理
	const handleOrderParamList = (selectData: any) => {
		return (selectData || []).map((select: any) => {
			const { headers, body, command } = select || {}
			const listData = []
			if (headers) {
				Object.entries(headers || {}).map((item: any) => {
					const [hKey, hValue] = item || []
					if (hKey !== '_type') {
						if (hValue && Object.prototype.toString.call(hValue) === '[object Object]') {
							listData.push({
								name: hValue._name || '',
								value: hValue,
								key: hKey,
								body: body[hKey]
							})
						} else {
							listData.push({
								name: hValue,
								value: body[hKey],
								key: hKey
							})
						}
					}
				})
			}
			// headers 为空时，直接展示body json字符串
			else if (body) {
				try {
					listData.push({ name: '响应体', value: JSON.stringify(body || {}) })
				} catch (e: any) {
					/* empty */
				}
			}
			return {
				listData,
				title: CHAIN_MAP[command] || `未知链路-${command}-数据`
			}
		})
	}

	// 渲染指令参数容器
	const renderOrderParams = () => {
		return testPlatInfo.map((orderParam: any, index: any) => {
			const { title, listData } = orderParam || {}
			return (
				<Col span={24} key={index}>
					<div className="order-box">
						<div className="title-box">
							<div className="title">{title}</div>
						</div>
						<div className="data-params-box">
							<ParamItem params={listData} />
						</div>
					</div>
				</Col>
			)
		})
	}

	return (
		<div className="data-box">
			{(testPlatInfo && testPlatInfo.length && <Row gutter={[8, 8]}>{renderOrderParams()}</Row>) || (
				<div className="empty-box">
					<Empty />
				</div>
			)}
		</div>
	)
}
