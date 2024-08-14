/* eslint-disable react/no-unknown-property */
/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-06-14 17:05:13
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-06-16 15:37:20
 */
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function Box(props: any) {
	const boxRef = useRef<Mesh>(null!)
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	useFrame(() => {
		boxRef.current.rotation.x += 0.05
		boxRef.current.rotation.y += 0.01
	})

	return (
		<mesh
			ref={boxRef}
			{...props}
			scale={active ? 1.5 : 1}
			onClick={() => setActive(!active)}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<boxGeometry args={[4, 4, 4]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

function ThreeScene() {
	return (
		<Canvas style={{ height: '600px' }}>
			<axesHelper></axesHelper>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-1, 0, 0]} />
		</Canvas>
	)
}

function ModelCoordinate() {
	return (
		<div className="App h-screen side-top-box">
			<ThreeScene />
		</div>
	)
}

export default ModelCoordinate
