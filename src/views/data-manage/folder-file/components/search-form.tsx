import { useContext, useEffect } from 'react'
import { Context } from '../store/reducerContent'

const SearchForm = () => {
	const { queryList, routerId } = useContext(Context)

	useEffect(() => {
		queryList({ parentId: routerId })
	}, [routerId])

	return null
}

export default SearchForm
