export default function (menus: any) {
	return [sort, parseMenus, filterEmptyMenu].reduce((value: any, fn: any) => fn(value), menus)
}

// 排序
function sort(menus: any) {
	const list = menus.slice()
	// 若值为 null 或 undefined, 设置最大值
	const getValue = (v: any) => {
		return v == null ? Number.MAX_SAFE_INTEGER : v
	}

	list.sort(
		(a: any, b: any) =>
			// sort 是不稳定排序，使用id保证顺序
			getValue(a.sort) - getValue(b.sort) || a.id - b.id
	)

	return list
}

// 按照菜单层级进行数据解析
function parseMenus(menus: any, parentCode: string) {
	return menus
		.filter((menu: any) => {
			// 针对一级菜单，parentCode可能为空或者不存在
			if (!parentCode) {
				return !menu.parentCode
			}

			return menu.parentCode === parentCode
		})
		.map((menu: any) => {
			const path = getPath(menu.resourceUrl)
			const children = parseMenus(menus, menu.code)

			return Object.assign(toJSON(menu.resourceExt), {
				code: menu.code,
				id: menu.id,
				title: menu.name,
				path,
				icon: menu.icon,
				children
			})
		})
}

// 过滤没有子菜单和无 path 的一级菜单
const filterEmptyMenu = (menus: any) => menus.filter((menu: any) => menu.children.length || menu.path)

// 获取实际的菜单地址
// 目前的逻辑是 使用 \n 分割地址，去空之后取第一个地址作为菜单的 path
const getPath = (path = '') =>
	path
		.split(/\s+/)
		.map(u => u.trim())
		.find(a => !!a) || ''

// 扩展资源转为对象
const toJSON = (str: string) => {
	let obj = {}
	if (str) {
		try {
			obj = JSON.parse(str)
		} catch (e) {
			// eslint-disable-next-line
		}
	}
	return obj
}
