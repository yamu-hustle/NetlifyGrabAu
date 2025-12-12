/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
        '@storybook/manager-api',
        '@storybook/addon-links',
		'@whitespace/storybook-addon-html',
		{
			name: '@storybook/addon-essentials',
			options: {
				actions: false,
				// controls: false
			}
		},
        '@storybook/addon-mdx-gfm'
    ],
	staticDirs: [
		'../src/assets/images',
		'../src/stories/html/'
	],
	framework: {
		name: '@storybook/html-vite',
		options: {},
	},
}
export default config
