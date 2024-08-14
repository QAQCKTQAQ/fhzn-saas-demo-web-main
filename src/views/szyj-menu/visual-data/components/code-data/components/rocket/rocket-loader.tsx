/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-07-10 09:50:06
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-07-10 09:58:38
 */
import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
	const { progress } = useProgress()
	let progressNew: any = progress
	return (
		<Html center style={{ color: 'blue' }}>
			{progress ? parseInt(progressNew) : 0} % loaded
		</Html>
	)
}
