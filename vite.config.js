import { resolve, posix } from 'path'
import { defineConfig } from 'vite'
import { glob } from 'glob'
import viteCompression from 'vite-plugin-compression'
import viteImageSizes from '@kingkongdevs/vite-plugin-image-sizes'
import viteInlineSVG from '@kingkongdevs/vite-plugin-svg-inline'
import viteHTMLIncludes from '@kingkongdevs/vite-plugin-html-includes'

export default defineConfig({
	root: './src',
	base: './',
	build: {
		outDir: '../dist/',
		emptyOutDir: true, // because outDir is outside our project root, force deletion
		assetsDir: './assets',
		sourcemap: false,
		rollupOptions: {
			input: glob.sync(
				posix.join('src', '**/*.html'),
				posix.join('src', '**/*.stories.js'),
				{"ignore":['**/sections/*', '**/src/components/*']}),
			treeshake: true,
			output: {
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name].[ext]',
			},
			maxParallelFileOps: 5
		},
	},
	plugins: [
		{
			...viteCompression({
				filter: (filePath) =>
					filePath.endsWith('.html') ||
					filePath.endsWith('.js') ||
					filePath.endsWith('.css'),
				algorithm: 'brotliCompress',
				verbose: true,
			}),
			apply: 'build',
			enforce: 'post',
		},
		viteHTMLIncludes({
			componentsPath: '/components/',
		}),
		viteImageSizes({
			outputDir: 'dist/assets/images',
			inputDir: 'src/assets/images',
		}),
		viteInlineSVG({
			cwd: 'src/assets/images',
			tag: 'icon', 
			attr: 'src'
		})
	],
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	}
})
