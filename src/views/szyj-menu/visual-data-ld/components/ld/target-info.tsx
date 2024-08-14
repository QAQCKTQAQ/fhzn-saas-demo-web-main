import { Segmented, Space, Table } from 'antd'
import { useState } from 'react'
import { ZHUDONGMUBIAOSUXING_MAP, BEIDONGMUBIAOSUXING_MAP } from '../../const'
const segmented_const = {
	initiative: 'initiative',
	passiveness: 'passiveness'
}
import { useTranslation } from 'react-i18next'

export default function TargetInfo(props: any) {
	const { target, tabChange } = props || {}
	// 主动数据
	const zhudongList = target?.zhudongList || []
	// 被动数据
	const beidongList = target?.beidongList || []
	const { t } = useTranslation()

	const [segmented, setSegmented] = useState(segmented_const.initiative)

	const columns = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			title: t('vd.ldyj.fwj'),
			dataIndex: 'fangweijiao',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + '°'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.fyj'),
			dataIndex: 'fuyangjiao',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + '°'
				}
				return '--'
			}
		},
		{
			title: '距离',
			dataIndex: 'juli',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 'km'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.xzb'),
			dataIndex: 'xinzaobi',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 'dB'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.jx_cc'),
			dataIndex: 'jingxiang',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 'm'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.jx_sd'),
			dataIndex: 'sudu',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 'm/s'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.zs_mb_sx'),
			dataIndex: 'suxing',
			render: (text: any) => {
				return (text && t(ZHUDONGMUBIAOSUXING_MAP[text])) || ''
			}
		},
		{
			title: t('vd.ldyj.zn_sb_mb_sx'),
			dataIndex: 'zhinengshibiesuxing'
		},
		{
			title: t('vd.ldyj.zxd'),
			dataIndex: 'zhixindu'
		}
	]

	// 被动
	const passivenessColumns = [
		{
			title: '序号',
			render: (text: any, record: any, index: number) => `${index + 1}`
		},
		{
			title: t('vd.ldyj.fwj'),
			dataIndex: 'fangweijiao',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + '°'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.fyj'),
			dataIndex: 'fuyangjiao',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + '°'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.xp'),
			dataIndex: 'zaipin',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 'HZ'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.cp'),
			dataIndex: 'zhongpin',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 's'
				}
				return '--'
			}
		},
		{
			title: t('vd.ldyj.mk'),
			dataIndex: 'maikuan',
			render: (text: any) => {
				if (text) {
					return (Number(text) || 0).toFixed(2) + 's'
				}
				return '--'
			}
		},
		{
			title: '类型',
			dataIndex: 'fusheyuan_suxing',
			render: (text: any) => {
				return (text && t(BEIDONGMUBIAOSUXING_MAP[text])) || ''
			}
		}
	]

	const renderDataSource = () => {
		if (segmented === segmented_const.initiative) {
			return zhudongList
		}
		return beidongList
	}

	const renderColumns = () => {
		if (segmented === segmented_const.initiative) {
			return columns
		}
		return passivenessColumns
	}

	return (
		<div className="target-info box">
			<div className="title-box">
				<Space>
					<div className="title">目标信息</div>
					<Segmented
						onChange={(e: any) => {
							setSegmented(e)
							tabChange && tabChange(e)
						}}
						options={[
							{
								label: '主动模式',
								value: segmented_const.initiative
							},
							{
								label: '被动模式',
								value: segmented_const.passiveness
							}
						]}
					/>
				</Space>
			</div>
			<Table
				rowKey="key"
				dataSource={renderDataSource()}
				columns={renderColumns()}
				pagination={false}
				size="small"
				bordered
				scroll={{ y: '167px' }}
			/>
		</div>
	)
}
