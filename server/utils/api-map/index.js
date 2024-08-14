const papayaApiMap = require('./lib')
const pathRules = require('./path-rules')
const removePrefix = require('../remove-prefix')

const mapper = papayaApiMap(pathRules)

// ajax 请求会在接口请求路径前加上 apiPrefix，用于区分页面请求和 ajax 请求
// 计算实际路径时，清除请求路径的前缀
module.exports = path => mapper(removePrefix(path, '/api'))
