import { useContext, useEffect } from 'react'
import SearchForm from './search-form'
import List from './list'
import Tool from './tool'
import { Context } from '../store/reducerContent'
import FolderFile from '../../folder-file'
import { useSearchParams } from 'react-router-dom'

const SpaceContainer = () => {
	const [params] = useSearchParams()
	const {
		state: {
			selectKeys: { keys }
		},
		setSelectKeys
	} = useContext(Context)

	useEffect(() => {
		const parentId = Number(params.get('parentId'))
		setSelectKeys({ keys: parentId ? [parentId] : [], title: '' })
	}, [params])

	if (keys.length) {
		return <FolderFile id={keys[0]} />
	}

	return (
		<>
			<SearchForm />
			<Tool />
			<List />
		</>
	)
}

export default SpaceContainer
