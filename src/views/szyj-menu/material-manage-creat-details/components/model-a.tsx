/* eslint-disable react/no-unknown-property */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 13:55:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-08 14:01:36
 */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, forwardRef } from 'react'
// import { Environment } from '@react-three/drei'
import ModelTogether from './model-together'
import '../model.less'
import Loader from './loader'
// import * as THREE from 'three'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const ModelA = (props: any) => {
	const { hefangxiangtu, zzCgActive } = props
	return (
		<div className="model-container">
			<Canvas
				camera={{ position: [3, 2, 3] }}
				className="he-direction-canvas"
				id="he-direction-canvas"
				style={{ width: '100% !important', height: '100% !important' }}
			>
				<ambientLight intensity={1} />
				<Suspense fallback={<Loader />}>
					<ModelTogether zzCgActive={zzCgActive} hefangxiangtu={hefangxiangtu} position={[0, 0, 0]} />
					{/* <Environment files="/images/venice_sunset_1k.hdr" background blur={0.5} /> */}
					<OrbitControls target={[0, 1, 0]} />
					<axesHelper args={[20]} />
				</Suspense>
			</Canvas>
		</div>
	)
}
export default forwardRef(ModelA)
