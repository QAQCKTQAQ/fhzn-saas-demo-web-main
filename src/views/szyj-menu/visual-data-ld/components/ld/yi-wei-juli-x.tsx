/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 10:03:24
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-19 13:55:03
 */
import HRRP from './HRRP'
import { useTranslation } from 'react-i18next'

export default function YiWeiJuLiXiang(props: any) {
	const { t } = useTranslation()

	const { info, data } = props
	return (
		<div className="yi-wei-juli-x-box box">
			<div className="inner-content-box">
				<div className="title-box">
					<div className="title">
						目标{info}
						{t('vd.ldyj.yw_jl_x')}
					</div>
				</div>
			</div>
			<HRRP key={info} data={data} />
		</div>
	)
}
