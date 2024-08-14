/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-04 13:30:38
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-04 14:30:34
 */
/* eslint-disable react/no-unknown-property */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 13:49:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-04 11:20:26
 */
import React, { useState, useEffect, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

export default function ModelTogether(props: any) {
	const { hefangxiangtu, zzCgActive } = props
	console.log('ModelTogether-ModelTogether', zzCgActive)
	const modelUrl =
		zzCgActive === 'SIDE'
			? '/ceban.glb'
			: zzCgActive === 'CENTER'
			? '/zhuban.glb'
			: zzCgActive === 'CENTER_SIDE'
			? '/ronghe.glb'
			: '/ronghe.glb'
	hefangxiangtu
	const objModel = useLoader(OBJLoader, '/radius3.obj', loader => {
		const objMaterial = useLoader(MTLLoader, '/radius3.mtl')
		loader.setMaterials(objMaterial)
		loader.setWithCredentials(true)
		loader.setCrossOrigin('10')
	})
	console.log(objModel, 'objModel')
	const { scene, animations } = useGLTF(modelUrl)
	scene
	const { actions, names, ref } = useAnimations(animations)
	let refs: any = ref
	useFrame(({ clock }) => {
		refs
		clock
		// refs.current.rotation.z = hefangxiangtu?.fangweijiao || 0 // 头部朝向
		refs.current.rotateZ(180)
		// refs.current.rotation.x = 0 // (193-360)
	})
	const [active, setActive] = useState(false)
	const { scale } = useSpring({
		scale: active ? 0.6 : 0.6,
		config: config.wobbly
	})

	const [activeIndex, setActiveIndex] = useState(0)
	useEffect(() => {
		console.log(actions, 'actions', animations, names)
		let actionsNew: any = actions
		return () => actionsNew[names[activeIndex]]
	}, [actions, names, activeIndex])

	const handleChangeAnmition = useCallback(() => {
		if (activeIndex < names.length - 1) {
			setActiveIndex(activeIndex + 1)
		} else {
			setActiveIndex(0)
		}
	}, [activeIndex])

	return (
		<animated.group
			ref={ref}
			{...props}
			dispose={null}
			scale={scale}
			onPointerOver={() => setActive(!active)}
			onClick={handleChangeAnmition}
		>
			{/* <spotLight color={[0, 0.5, 1]} intensity={2} angle={0.1} penumbra={0.5} position={[0, 0, 0]} castShadow /> */}
			<primitive object={scene} />
		</animated.group>
	)
}

// useGLTF.preload(modelUrl)
