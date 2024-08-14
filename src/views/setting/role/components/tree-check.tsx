/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-27 10:43:08
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-03-28 14:10:20
 */
import { Tree } from 'antd'
import type { TreeProps } from 'antd/es/tree'
import React, { useState, useEffect } from 'react'

const TreeCheck: any = (props: any) => {
	const { treeData, defaultSelectKeys, onChecked } = props
	const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

	useEffect(() => {
		setCheckedKeys(defaultSelectKeys)
	}, [defaultSelectKeys])

	const onCheck: TreeProps['onCheck'] = (checkedKeysValue: any) => {
		const { checked = [] } = checkedKeysValue || {}
		setCheckedKeys(checked || [])
		onChecked(checked)
	}

	return <Tree checkable defaultExpandAll checkStrictly checkedKeys={checkedKeys} onCheck={onCheck} treeData={treeData} />
}

export default TreeCheck
