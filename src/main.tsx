/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-03-17 13:32:31
 * @LastEditors: ZeroSi
 * @LastEditTime: 2023-11-03 14:18:59
 */
import '@/styles/reset.less'
import '@/assets/iconfont/iconfont.less'
import '@/assets/fonts/font.less'
import '@/styles/common.less'
import 'virtual:svg-icons-register'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from '@/redux'
import App from '@/App'
import '@/config/config'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
	// * react严格模式
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
)
