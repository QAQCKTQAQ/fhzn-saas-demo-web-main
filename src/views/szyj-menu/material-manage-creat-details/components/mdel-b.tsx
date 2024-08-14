/* eslint-disable react/no-unknown-property */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 13:55:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-17 18:20:24
 */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, forwardRef } from 'react'
import { Environment } from '@react-three/drei'
// import { LayerMaterial, Depth } from 'lamina'

import ModelOther from './model-other'
import '../model.less'
import Loader from './loader'

const ModelB = () => {
	return (
		<div className="model-container">
			<Canvas
				className="he-direction-canvas"
				id="he-direction-canvas"
				style={{ width: '100% !important', height: '100% !important' }}
			>
				<ambientLight intensity={1} />
				<Suspense fallback={<Loader />}>
					<ModelOther position={[0, 0, 0]} />
					<Environment files="/images/venice_sunset_1k.hdr" background blur={0.5} />
					<OrbitControls target={[0, 1, 0]} autoRotate autoRotateSpeed={10} />
					<axesHelper args={[20]} />
				</Suspense>
			</Canvas>
		</div>
	)
}
export default forwardRef(ModelB)
