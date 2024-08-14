/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// import { Polyhedron } from '@react-three/drei'
import * as THREE from 'three'
export default function GeometoryModel(props: any) {
	props
	const ref: any = useRef()
	let mesh: any
	// let scene: any
	const geometry = new THREE.BoxGeometry(50, 50, 50)
	const material: any = new THREE.MeshPhongMaterial({ vertexColors: true })
	const colors: any = geometry.getAttribute('position').array
	for (let i = 0, l = colors.length; i < l; i++) {
		if (colors[i] > 0) colors[i] = 0.5
		else colors[i] = 0
	}
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, false))
	mesh = new THREE.Mesh(geometry, material)
	mesh.castShadow = true
	mesh.position.y = 25
	useFrame((_, delta) => {
		_
		delta
		// ref.current.rotation.x += 1 * delta
		// ref.current.rotation.y += 0.5 * delta
	})

	return (
		<mesh
			{...props}
			ref={ref}
			onPointerDown={e => console.log('pointer down ' + e.object.name)}
			onPointerUp={e => console.log('pointer up ' + e.object.name)}
			onPointerOver={e => console.log('pointer over ' + e.object.name)}
			onPointerOut={e => console.log('pointer out ' + e.object.name)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={0x00ff00} wireframe wireframeLinewidth={40} />
		</mesh>
	)
}
