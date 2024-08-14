import { RouteObject } from '@/routers/interface'
import { JSEncrypt } from 'jsencrypt'

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear()
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
	let defaultBrowserLang = ''
	if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
		defaultBrowserLang = 'zh'
	} else {
		defaultBrowserLang = 'en'
	}
	return defaultBrowserLang
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
	let newStr: string = ''
	let newArr: any[] = []
	let arr = path.split('/').map(i => '/' + i)
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i]
		newArr.push(newStr)
	}
	return newArr
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} code 当前访问地址
 * @param {Araay} authRouter 全量资源
 * @returns array
 */
export const getOpenKeysByCode = (code: string, authRouter: any) => {
	const openKeys: any = []
	const findParentCode = (key: any) => {
		const itemObj = authRouter.find((item: any) => item.code === key)
		const { parentCode } = itemObj || {}
		if (!parentCode) {
			openKeys.push(key)
		} else {
			openKeys.push(parentCode)
			findParentCode(parentCode)
		}
	}
	findParentCode(code)
	return openKeys
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {}
	for (let item of routes) {
		if (item.code === path) return item
		if (item.children) {
			const res = searchRoute(path, item.children)
			if (Object.keys(res).length) result = res
		}
	}
	return result
}

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: Menu.MenuOptions[]) => {
	let tempPath: any[] = []
	try {
		const getNodePath = (node: Menu.MenuOptions) => {
			tempPath.push(node)
			// 找到符合条件的节点，通过throw终止掉递归
			if (node.path === path) {
				throw new Error('GOT IT!')
			}
			if (node.children && node.children.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					getNodePath(node.children[i])
				}
				// 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
				tempPath.pop()
			} else {
				// 找到叶子节点时，删除路径当中的该叶子节点
				tempPath.pop()
			}
		}
		for (let i = 0; i < menuList.length; i++) {
			getNodePath(menuList[i])
		}
	} catch (e) {
		return tempPath
	}
}

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
export const findAllBreadcrumb = (menuList: Menu.MenuOptions[]): { [key: string]: any } => {
	let handleBreadcrumbList: any = {}
	const loop = (menuItem: Menu.MenuOptions) => {
		// 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
		if (menuItem?.children?.length) menuItem.children.forEach(item => loop(item))
		else handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList)
	}
	menuList.forEach(item => loop(item))
	return handleBreadcrumbList
}

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === 'object' && item.path && newArr.push(item.path)
		item.children && item.children.length && handleRouter(item.children, newArr)
	})
	return newArr
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
	if (val === null) return 'null'
	if (typeof val !== 'object') return typeof val
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any
	try {
		newObj = obj.push ? [] : {}
	} catch (error) {
		newObj = {}
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepCopy(obj[attr])
		} else {
			newObj[attr] = obj[attr]
		}
	}
	return newObj
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max)
	return num
}

// RSA 加密
export function rsaEnc(data: string) {
	let pubkey = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMCPzoiP9peC1FpMxEpvibat980X5zHM
sT5kQP8VgXHz5XqGpFei1yDPbY+YbpksM4Ieyy1gVTk/+QqaAmZZ1+UCAwEAAQ==
-----END PUBLIC KEY-----
`
	let encrypt = new JSEncrypt()
	encrypt.setPublicKey(pubkey)
	return encrypt.encrypt(data)
}

// 穿梭框数据格式
export function transformArray(list: any[], idKey: string, keyName: string, chosen = false) {
	const tempArr: any = []
	if (list && list.length) {
		list.map(item => {
			if (chosen) {
				tempArr.push(item[idKey] + '')
			} else {
				tempArr.push({
					key: item[idKey] ? item[idKey] + '' : '',
					title: item[keyName]
				})
			}
		})
	}
	return tempArr
}

// 数组对象指定key 去重
export const uniqueFunc = (arr: any[], uniId: string) => {
	const res = new Map()
	return arr.filter(item => !item[uniId] || (!res.has(item[uniId]) && res.set(item[uniId], 1)))
}

// 随机生成暖色
export const rdmRgbColor = () => {
	return 'hsl(' + Math.floor(360 * Math.random()) + ', 85%, 55%)'
}

// 对比字符串
function compareStrings(a: any, b: any, ignoreCase: any) {
	a = String(a)
	b = String(b)
	return ignoreCase ? a.toLocaleLowerCase() === b.toLocaleLowerCase() : a === b
}

// 获取头字段 大小写不敏感
export function getHeader(header: any, field: any) {
	if (!header) {
		return ''
	}
	const name: any = Object.keys(header).find(f => compareStrings(f, field, true))
	return header[name] || ''
}

export function pow1024(num: number) {
	return Math.pow(1024, num)
}

// 格式文件大小展示
export function filterFileSize(size: number) {
	if (!size) return '-'
	if (size < pow1024(1)) return size + ' B'
	if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB'
	if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB'
	if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB'
	return (size / pow1024(4)).toFixed(2) + ' TB'
}
// 随机生成浅色系
export function getRandomColor() {
	const color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)'
	return color
}

// 路径转换为tree接口
export const pathToTree = (input: any) => {
	let root: any = []
	for (let i = 0; i < input.length; i++) {
		let chain: any = input[i].split('/')
		let currentHierarchy = root
		for (let j = 0; j < chain.length; j++) {
			let wantedNode = chain[j]
			if (wantedNode === '') {
				continue
			}
			let lastHierarchy = currentHierarchy

			// 遍历root是否已有该层级
			for (let k = 0; k < currentHierarchy.length; k++) {
				if (currentHierarchy[k].title === wantedNode) {
					currentHierarchy = currentHierarchy[k].children
					break
				}
			}

			if (lastHierarchy === currentHierarchy) {
				let key
				if (j === chain.length - 1) {
					key = input[i]
				} else {
					key = chain.slice(0, j + 1).join('/') + '/'
				}
				let newNode: any = {
					key: key,
					title: wantedNode,
					value: key,
					children: []
				}
				// 文件，最后一个字符不是"/“符号
				if (j === chain.length - 1) {
					delete newNode.children
				}
				currentHierarchy.push(newNode)
				currentHierarchy = newNode.children
			}
		}
	}

	return root
}

// post请求文件流，触发下载
export const downLoadFileByPost = (filename: string, url: any) => {
	const link = document.createElement('a')
	link.download = filename || ''
	link.style.display = 'none'
	link.href = url
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

// 从 disposition 中获取 filename
export const getFileNameFromDisposition = (disposition: string) => {
	let filename: any
	if (disposition && disposition.includes('attachment')) {
		let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i
		let matches = filenameRegex.exec(disposition)
		if (matches && matches[1]) {
			filename = matches[1].replace(/['"]/g, '')
		}
	}
	return decodeURIComponent(filename)
}

// 截取文件后缀
export const getSuffix = (fileName: string) => {
	return fileName.split('.').pop()?.toUpperCase() || ''
}

/***
 * url 和对象拼接 新url
 */
export function generateUrlWithParams(url: string, params: any) {
	const urlParams = []
	for (const key in params) {
		if (params[key]) {
			!!params[key] && urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
		}
	}
	url += '?' + urlParams.join('&')
	return url
}

/***
 * 数字字典 转化为map对象数组
 */
export const transitionArrToMap = (data: any) => {
	const map: any = {}
	;(data || []).map((item: any) => {
		const { name, code } = item
		map[code] = name
	})
	return map
}

/***
 * 数字字典 转化为options对象
 */
export const transitionArrKey = (data: any) => {
	return (data || []).map((item: any) => {
		const { name, code } = item
		return {
			value: code,
			label: name
		}
	})
}

/***
 * base64 图片 转化为file文件
 */
export const dataURLtoFile = (dataurl: string, filename: string) => {
	let arr: any = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[arr.length - 1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, { type: mime })
}
