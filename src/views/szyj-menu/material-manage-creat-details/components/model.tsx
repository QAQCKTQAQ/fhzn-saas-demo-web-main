/* eslint-disable react/no-unknown-property */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-29 13:49:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-08-04 11:20:57
 */
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
	const { hefangxiangtu } = props
	hefangxiangtu
	const objModel = useLoader(OBJLoader, '/radius3.obj', loader => {
		const objMaterial = useLoader(MTLLoader, '/radius3.mtl')
		loader.setMaterials(objMaterial)
		loader.setWithCredentials(true)
		loader.setCrossOrigin('10')
	})
	console.log(objModel, 'objModel')

	const { scene, animations } = useGLTF('/zhuban.glb')
	scene
	const { actions, names, ref } = useAnimations(animations)
	let refs: any = ref
	useFrame(({ clock }) => {
		refs
		clock
		refs.current.rotation.z = 0 // 头部朝向
		refs.current.rotation.y = 0 //
		refs.current.rotation.x = 0
		refs.current.opacity = 0.1
		// console.log(refs, 'refs')
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

useGLTF.preload('/zhuban.glb')
