/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-04-19 14:00:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-05-18 17:28:26
 */
import { useEffect, useCallback, useRef } from 'react'
import { dataSetImgMap } from '@/api/modules/data-set'
// 接口调用
export const useFetch = (data: any, dispatch: any) => {
	useEffect(() => {
		dispatch({ type: 'FETCHING_IMAGES', fetching: true })
		dataSetImgMap(data.id, data.version, { page: data.page, pageSize: 10 })
			.then((res: any) => {
				let images: any = res.items || []
				dispatch({ type: 'STACK_IMAGES', images })
				dispatch({ type: 'FETCHING_IMAGES', fetching: false })
			})
			.catch(e => {
				// handle error
				dispatch({ type: 'FETCHING_IMAGES', fetching: false })
				return e
			})
	}, [dispatch, data.page])
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef: any, dispatch: any) => {
	const scrollObserver = useCallback(
		(node: any) => {
			new IntersectionObserver(entries => {
				entries.forEach(en => {
					if (en.intersectionRatio > 0) {
						dispatch({ type: 'ADVANCE_PAGE' })
					}
				})
			}).observe(node)
		},
		[dispatch]
	)

	useEffect(() => {
		if (scrollRef.current) {
			scrollObserver(scrollRef.current)
		}
	}, [scrollObserver, scrollRef])
}

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector: any, items: any) => {
	const imgObserver = useCallback((node: any) => {
		const intObs = new IntersectionObserver(entries => {
			entries.forEach(en => {
				if (en.intersectionRatio > 0) {
					const currentImg: any = en.target
					const newImgSrc = currentImg.dataset.src

					// only swap out the image source if the new url exists
					if (!newImgSrc) {
						console.error('Image source is invalid')
					} else {
						currentImg.src = newImgSrc
					}
					intObs.unobserve(node)
				}
			})
		})
		intObs.observe(node)
	}, [])

	const imagesRef: any = useRef(null)

	useEffect(() => {
		imagesRef.current = document.querySelectorAll(imgSelector)

		if (imagesRef.current) {
			imagesRef.current.forEach((img: any) => imgObserver(img))
		}
	}, [imgObserver, imagesRef, imgSelector, items])
}
