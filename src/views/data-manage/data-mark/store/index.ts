import produce from 'immer'

// 图片拖动事件
export const IMAGE_DRAG_ACTION = 'IMAGE_DRAG_ACTION'
// 开启标注事件
export const LABEL_RECT_ON_ACTION = 'LABEL_RECT_ON_ACTION'
// 开启十字线
export const CANVAS_CROSS_ON_ACTION = 'CANVAS_CROSS_ON_ACTION'
//标注数据列表
export const LABEL_RECT_RESULT_LIST_ACTION = 'LABEL_RECT_RESULT_LIST_ACTION'

export const initialState = {
	drag: true,
	// 拖拽rect
	rectOn: false,
	// 十字线
	crossOn: false,
	// 基于画布当前标注数据
	labelResultList: []
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case IMAGE_DRAG_ACTION:
			state.drag = action.drag
			break
		case LABEL_RECT_ON_ACTION:
			state.rectOn = action.rectOn
			break
		case LABEL_RECT_RESULT_LIST_ACTION:
			state.labelResultList = action.labelResultList
			break
		case CANVAS_CROSS_ON_ACTION:
			state.crossOn = action.crossOn
			break
		default:
			return state
	}
})
