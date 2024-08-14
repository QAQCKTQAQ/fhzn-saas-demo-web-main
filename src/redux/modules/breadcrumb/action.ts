import * as types from '@/redux/mutation-types'

// * setBreadcrumbList
export const setBreadcrumbList = (breadcrumbList: { [propName: string]: any }) => ({
	type: types.SET_BREADCRUMB_LIST,
	breadcrumbList
})

// 设置当前面包屑
export const setCurrentBreadcrumb = (currentBreadcrumb: any[], currentPage?: object) => {
	const breadcrumbs = currentPage ? [...currentBreadcrumb, currentPage] : currentBreadcrumb
	return {
		type: types.SET_CURRENT_BREADCRUMB,
		currentBreadcrumb: breadcrumbs
	}
}
