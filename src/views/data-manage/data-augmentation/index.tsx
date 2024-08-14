/***
 * 数据增广
 */

import { ReducerContent } from './store/reducerContent'
import './index.less'
import Container from './components/container'
import 'cropperjs/dist/cropper.css'

const DataAugmentation = (props: any) => {
	return (
		<ReducerContent imageInfo={props?.imageInfo || {}}>
			<div className="card content-box m-p-data-augmentation">
				<Container />
			</div>
		</ReducerContent>
	)
}

export default DataAugmentation
