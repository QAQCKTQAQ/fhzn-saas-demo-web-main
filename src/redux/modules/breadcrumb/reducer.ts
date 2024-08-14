import { AnyAction } from 'redux'
import { BreadcrumbState } from '@/redux/interface'
import produce from 'immer'
import * as types from '@/redux/mutation-types'

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {},
	currentBreadcrumb: []
}

// breadcrumb reducer
const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_BREADCRUMB_LIST:
				draftState.breadcrumbList = action.breadcrumbList
				break
			case types.SET_CURRENT_BREADCRUMB:
				draftState.currentBreadcrumb = action.currentBreadcrumb
				break
			default:
				return draftState
		}
	})

export default breadcrumb
