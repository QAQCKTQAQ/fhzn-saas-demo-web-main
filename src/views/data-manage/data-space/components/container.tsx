/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-08-21 14:59:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-26 15:07:36
 */

import List from './list'
import Tool from './tool'
import { Context } from '../store/reducerContent'
import React, { useContext } from 'react'

const Container = () => {
	const {
		state: { selectNode }
	} = useContext(Context)
	return (
		<>
			<div className="tool-content">{selectNode?.isLeaf && <Tool />}</div>
			<List />
		</>
	)
}

export default Container
