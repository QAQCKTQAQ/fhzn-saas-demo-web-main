/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-16 21:05:31
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-11-03 16:35:47
 */
import EarthMap from '../earth'
import { Context } from '../../store/reducerContent'
import { useContext } from 'react'
import './index.less'

export default function List() {
	const {
		state: {
			list: { dataSource }
		}
	} = useContext(Context)
	return (
		<div className="content-earth">
			<EarthMap dataListMap={dataSource} />
		</div>
	)
}
