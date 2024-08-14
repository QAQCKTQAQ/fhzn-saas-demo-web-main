const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const configPath = path.join(__dirname, '../../config/app.yaml')
const config = yaml.load(fs.readFileSync(configPath))

// 根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = config
