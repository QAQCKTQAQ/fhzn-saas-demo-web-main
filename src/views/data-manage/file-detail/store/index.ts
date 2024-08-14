/***
 * 通过useReducer 维护每个页面的state，不用放在全局state
 */
import produce from 'immer'

// 详情数据
export const FILE_DETAIL_DATA = 'FILE_DETAIL_DATA'
export const FILE_PREV_ID = 'FILE_PREV_ID'
export const FILE_NEXT_ID = 'FILE_NEXT_ID'
export const ORIGINAL_IMAGE_INFO = 'ORIGINAL_IMAGE_INFO'
export const IMAGE_LABEL = 'IMAGELABEL'
// 根据文件解析后保存标注信息
export const FILE_LABEL_DATA = 'FILE_LABEL_DATA'
// 标注文件类型
export const FILE_LABEL_TYPE = 'FILE_LABEL_TYPE'

/***
 * 初始化state
 */
export const initialState = {
	fileDetailData: {},
	prevId: null, // 上一个文件id
	nextId: null, // 下一个文件ID
	originalImageInfo: null, //原始图片的宽高，用于标注信息
	imageLabel: null, // 标注信息
	fileLabelData: null,
	labelType: null // 标注文件类型信息，根据不同类型走不通解析
}

export const reducer = produce((state: any, action: any) => {
	switch (action.type) {
		case FILE_DETAIL_DATA:
			state.fileDetailData = action.fileDetailData
			break
		case FILE_PREV_ID:
			state.prevId = action.prevId
			break
		case FILE_NEXT_ID:
			state.nextId = action.nextId
			break
		case ORIGINAL_IMAGE_INFO:
			state.originalImageInfo = action.originalImageInfo
			break
		case IMAGE_LABEL:
			state.imageLabel = action.imageLabel
			break
		case FILE_LABEL_DATA:
			state.fileLabelData = action.fileLabelData
			break
		case FILE_LABEL_TYPE:
			state.labelType = action.labelType
			break
		default:
			return state
	}
})
