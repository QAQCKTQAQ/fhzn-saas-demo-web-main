/*
 * @Descripttion:
 * @version:
 * @Author: maoyueer
 * @Date: 2023-10-10 14:29:32
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-10-10 14:39:39
 */
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { wrapperEnv } from './src/utils/getEnv'
// import { visualizer } from "rollup-plugin-visualizer";
// import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from 'vite-plugin-compression'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import cesium from 'vite-plugin-cesium'

export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd())
	const viteEnv = wrapperEnv(env)

	return {
		// base: "/",
		// alias config
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		// global css
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						'primary-color': '#1890ff'
					},
					javascriptEnabled: true,
					charset: false
					// additionalData: `@import "@/styles/var.less";`
				}
			}
		},
		plugins: [
			react(),
			cesium(),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			// viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: 'gzip',
					ext: '.gz'
				})
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		// build configure
		build: {
			outDir: 'client',
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: 'esbuild',
			// minify: 'terser',
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	}
})
