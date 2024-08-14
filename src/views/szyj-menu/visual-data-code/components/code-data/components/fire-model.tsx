/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-13 11:31:35
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-13 13:42:04
 */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useCallback } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'

export default function FireModel(props: any) {
	const { scene, animations } = useGLTF('/bomberman_fire.glb')
	scene
	const { actions, names, ref } = useAnimations(animations)
	let refs: any = ref
	useFrame(({ clock }) => {
		refs
		clock
		refs.current.rotation.z = 900
		// refs.current.rotation.y = -10
		// refs.current.rotation.x = 180
		// refs.current.rotation.z = Math.sin(clock.getElapsedTime())
		// refs.current.rotation.x = Math.cos(clock.getElapsedTime())
	})
	useFrame((_, delta) => {
		refs.current.rotation.x += delta
		// refs.current.rotation.y += 0.5 * delta
	})
	const [active, setActive] = useState(false)
	const { scale } = useSpring({
		scale: active ? 0.02 : 0.02,
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

useGLTF.preload('/bomberman_fire.glb')
