import { useState } from 'react'
import './index.less'
import { Row, Col, Tabs } from 'antd'
import { CODE_TYPE_ENUM } from './const'
import { FundProjectionScreenOutlined } from '@ant-design/icons'
import XtrhCode from './components/xtrh-code'
import BxjbCode from './components/bxjb-code'
import HwsbCode from './components/hwsb-code'
import HwsbView from './components/hwsb-view'
import HwsbGdmbView from './components/hwsb-gdmb-view'
import RzzcView from './components/rzzc-view'
import XtgrView from './components/xtgr-view'
import { useTranslation } from 'react-i18next'
import DMxhscView from './components/dmxhsc-view'

export default function MultContainer() {
	const { t } = useTranslation()
	const [selectCode, setSelectCode] = useState(CODE_TYPE_ENUM.XIE_TONG)

	const config_code_list: any = [
		{
			key: CODE_TYPE_ENUM.XIE_TONG,
			label: '多源异构*****目标融合'
		},
		{
			key: CODE_TYPE_ENUM.BO_XING_JIE_BIAN,
			label: '干扰行*****测算法'
		},
		{
			key: CODE_TYPE_ENUM.DM_XH_SC,
			label: '多模***成算法'
		},
		// {
		// 	key: '1',
		// 	label: '多模********算法'
		// },
		// {
		// 	key: '2',
		// 	label: '主动********算法'
		// },
		{
			key: CODE_TYPE_ENUM.XT_RZ_ZC,
			label: t('vd.dyrh.xt_rz_zc')
		},
		{
			key: CODE_TYPE_ENUM.XT_GR_JC,
			label: t('vd.dyrh.xt_gr_jc')
		},
		{
			key: CODE_TYPE_ENUM.GU_DING_MU_BIAO,
			label: t('vd.dyrh.dd_jz_mb_zn')
		},
		{
			key: CODE_TYPE_ENUM.DDHWJC_MU_BIAO_GJBW_SB,
			label: t('vd.dyrh.dd_hw_jc')
		},
		{
			key: CODE_TYPE_ENUM.DDHWFJ_MU_BIAO,
			label: t('vd.dyrh.dd_hw_fj')
		},
		{
			key: CODE_TYPE_ENUM.SAR_KJG_MU_BIAO,
			label: t('vd.dyrh.sar_kjg_pp')
		}
	]

	const renderContainerByCode = () => {
		if (selectCode === CODE_TYPE_ENUM.DM_XH_SC) {
			return <DMxhscView />
		}
		if (selectCode === CODE_TYPE_ENUM.XIE_TONG) {
			return <XtrhCode />
		}
		if (selectCode === CODE_TYPE_ENUM.BO_XING_JIE_BIAN) {
			return <BxjbCode />
		}
		if (selectCode === CODE_TYPE_ENUM.GU_DING_MU_BIAO) {
			return <HwsbGdmbView type="1" />
		}
		if (selectCode === CODE_TYPE_ENUM.XT_RZ_ZC) {
			return <RzzcView />
		}
		if (selectCode === CODE_TYPE_ENUM.DDHWJC_MU_BIAO_GJBW_SB) {
			return <HwsbView type="3" />
		}
		if (selectCode === CODE_TYPE_ENUM.DDHWFJ_MU_BIAO) {
			return <HwsbView type="2" />
		}
		if (selectCode === CODE_TYPE_ENUM.SAR_KJG_MU_BIAO) {
			return <HwsbCode />
		}
		if (selectCode === CODE_TYPE_ENUM.XT_GR_JC) {
			return <XtgrView />
		}
	}

	return (
		<div className="mult-container">
			<Tabs
				activeKey={selectCode}
				tabPosition={'left'}
				className="code-data-time-select"
				onChange={(v: any) => setSelectCode(v)}
				items={config_code_list.map((item: any) => {
					return {
						label: (
							<span>
								<FundProjectionScreenOutlined /> {item.label}
							</span>
						),
						key: item.key
					}
				})}
			/>
			<Row gutter={[0, 24]} className="mult-container-box">
				<Col span={24} style={{ height: '100%' }}>
					<div className="mult-container-item-box">{renderContainerByCode()}</div>
				</Col>
			</Row>
		</div>
	)
}
