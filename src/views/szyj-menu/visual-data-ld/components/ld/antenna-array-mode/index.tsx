/* eslint-disable react/no-unknown-property */
import { Col, Row } from 'antd'
import './index.less'
import { useContext, useEffect, useState } from 'react'
import Model from '../rocket-model'
import Loader from '../rocket-loader'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Context } from '../../../store/reducerContent'
import { ZZ_CG_ACTIVE_ENUM } from '../../../const'
import { isArray } from 'lodash'
import { useTranslation } from 'react-i18next'

// import { Environment } from '@react-three/drei'
export default function AntennaArrayMode(props: any) {
	const { beidongjihuo, zhudongfashe, zhudongjieshou } = props
	const [zhudongActives, setZhudongActives] = useState([])
	const { setZzCgActive } = useContext(Context)
	const { t } = useTranslation()

	useEffect(() => {
		handleZhuDong()
	}, [zhudongfashe, zhudongjieshou])

	const handleZhuDong = () => {
		const zhudongActives: any = []
		const zhudongfasheArr = isArray(zhudongfashe) ? zhudongfashe : []
		const zhudongjieshouArr = isArray(zhudongjieshou) ? zhudongjieshou : []
		for (let i = 0, length = 1920; i < length; i++) {
			zhudongActives.push(zhudongfasheArr[i] || zhudongjieshouArr[i] || 0)
		}
		setZhudongActives(zhudongActives)
	}

	// 设置活动面
	useEffect(() => {
		if (zhudongActives?.length || beidongjihuo?.length) {
			const centerActives = []
			const leftActives = []
			const rightActives = []
			// 右面是 0 - 831  正面面是 832 - 1087 左面 1088 - 1919
			for (let i = 0, length = 1920; i < length; i++) {
				if (zhudongActives[i] || beidongjihuo[i]) {
					if (i >= 0 && i <= 831) {
						rightActives.push(i)
					}
					if (i >= 832 && i <= 1087) {
						centerActives.push(i)
					}
					if (i >= 1088 && i <= 1919) {
						leftActives.push(i)
					}
				}
			}
			if (centerActives?.length && (leftActives?.length || rightActives?.length)) {
				return setZzCgActive(ZZ_CG_ACTIVE_ENUM.CENTER_SIDE)
			}
			if (centerActives?.length) {
				return setZzCgActive(ZZ_CG_ACTIVE_ENUM.CENTER)
			}
			if (leftActives?.length || rightActives?.length) {
				return setZzCgActive(ZZ_CG_ACTIVE_ENUM.SIDE)
			}
		}
	}, [zhudongActives, beidongjihuo])

	// 右面是 1 - 832  正面面是 833 - 1088 左面 1089 - 1920
	const rendenActiveRow = (x: number, y: number, add: number) => {
		const xy = x !== 1 || y !== 1 ? (y - 1) * 16 + x + add - 1 : add
		const zhudongActive = zhudongActives[xy]
		const beidongActive = beidongjihuo[xy]
		return (
			<div className="col-bg" key={y}>
				{(zhudongActive && <div className="col-red"></div>) || null}
				{(beidongActive && <div className="col-blue"></div>) || null}
				<div className={zhudongActive || beidongActive ? 'col col-white' : 'col'}></div>
			</div>
		)
	}

	return (
		<div className="zi-zhen-chong-gou-box">
			<div className="inner-content-box">
				<Row gutter={[0, 16]}>
					<Col span={24}>
						<div className="title-box">
							<div className="title">{t('vd.ldyj.tx_bz_fs')}</div>
						</div>
						<div className="z-z-c-g-n">
							<div className="zz-container">
								<div className="box">
									<div className="face right-face">
										<label className="face-label">右面</label>
										<div className="box box-right">
											{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((x: any) => {
												return (
													<div key={x} className="row">
														{[
															1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
															28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
														].map((y: any) => {
															return rendenActiveRow(x, y, 0)
														})}
													</div>
												)
											})}
										</div>
									</div>
									<div className="face"></div>
									<div className="face"></div>
									<div className="face center-face">
										<label className="face-label">正面</label>
										<div className="box">
											{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((x: any) => {
												return (
													<div key={x} className="row">
														{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((y: any) => {
															return rendenActiveRow(x, y, 832)
														})}
													</div>
												)
											})}
										</div>
									</div>
									<div className="face"></div>
									<div className="face left-face">
										<label className="face-label">左面</label>
										<div className="box box-left">
											{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((x: any) => {
												return (
													<div key={x} className="row">
														{[
															1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
															28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
														].map((y: any) => {
															return rendenActiveRow(x, y, 1088)
														})}
													</div>
												)
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<Canvas
				id="canvas-dfyh"
				camera={{ position: [1, 1, 2] }}
				style={{ width: '50% !important', height: '10vw', position: 'absolute', left: '0%', bottom: '30px' }}
			>
				<ambientLight position={[3, 0, 0]} intensity={1} />
				<Suspense fallback={<Loader />}>
					<Model position={[-2, 0, 0]} />
					<OrbitControls target={[0, 0, 0]} />
					{/* <axesHelper args={[200]} /> */}
				</Suspense>
			</Canvas>
		</div>
	)
}
