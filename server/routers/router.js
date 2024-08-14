const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { koaBody } = require('koa-body')

// 权限查询
router.get(`/bff/auth/query`, require('../controllers/auth'))
// 通用文件上传
router.post(`/bff/upload`, koaBody({ multipart: true, formidable: { maxFileSize: 524288000 } }), require('../controllers/upload'))
// 通用图片上传
router.post(
	`/bff/image/upload`,
	koaBody({ multipart: true, formidable: { maxFileSize: 524288000 } }),
	require('../controllers/image-upload')
)

// 文件下载 fileCode
router.get(`/bff/download`, require('../controllers/download'))

// 文件下载fileCode + relativeFilePath
router.get(`/bff/relativeFilePath/download`, require('../controllers/relativeFilePathDownLoad'))

// 算法训练模型下载
router.get(`/aicp/training/outputs/download`, require('../controllers/models-download'))

// 下载运行日志
router.get(`/aicp/training/:id/logs/download`, require('../controllers/output-download'))

// 配置文件上传解析
router.post(
	`/bff/aicp/third-party/service-definitions/configs/upload`,
	koaBody({ multipart: true }),
	require('../controllers/params-upload')
)

// 下载参数配置
router.get(`/aicp/third-party/service-definitions/configs/download`, require('../controllers/output-download'))

// 试验数据下载
router.get(`/aicp/third-party/experiments/:id/excels`, require('../controllers/output-download'))

module.exports = router
