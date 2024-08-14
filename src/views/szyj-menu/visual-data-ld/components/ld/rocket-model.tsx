/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-10 09:48:29
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-01 09:51:44
 */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function Model(props: any) {
	const objModel = useLoader(OBJLoader, '/radius3.obj', loader => {
		const objMaterial = useLoader(MTLLoader, '/radius3.mtl')
		loader.setMaterials(objMaterial)
		loader.setWithCredentials(true)
		loader.setCrossOrigin('10')
	})
	console.log(objModel, 'objModel')

	// const gltfObj = useLoader(GLTFLoader, '/radius1.gltf', loader => {
	// 	const dracoLoader = new DRACOLoader()
	// 	// 以下路径表示 DRACOLoader 加载器调用时的必要依赖文件（可去 threejs 源码中寻找）
	// 	// 该文件版本需要与 threejs 的版本对应
	// 	dracoLoader.setDecoderPath('/draco/')
	// 	loader.setDRACOLoader(dracoLoader)
	// }).scene

	const { scene, animations } = useGLTF('/dfwh.glb')
	scene
	const { actions, names, ref } = useAnimations(animations)
	let refs: any = ref
	useFrame(({ clock }) => {
		refs
		clock
		refs.current.rotation.z = 300
		refs.current.rotation.x = 90
		// refs.current.rotation.z = Math.sin(clock.getElapsedTime())
		// refs.current.rotation.x = Math.cos(clock.getElapsedTime())
	})
	const [active, setActive] = useState(false)
	const { scale } = useSpring({
		scale: active ? 1 : 1,
		config: config.wobbly
	})

	const [activeIndex, setActiveIndex] = useState(0)
	useEffect(() => {
		console.log(actions, 'actions', animations, names)
		let actionsNew: any = actions
		// if (actionsNew) {
		// 	return actionsNew[names[activeIndex]].fadeIn(0.5).play()
		// }
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

useGLTF.preload('/dfwh.glb')
