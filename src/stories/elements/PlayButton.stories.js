export default {
	title: 'Design Elements/Play Button',
	render: ({ label, ...args }) => {
		let html
		let color = args['color'] || '#4AC186'
		let pulseColor = args['pulseColor'] || '#4AC186'
		let pulseOpacity = args['pulseOpacity'] || '0.2'
		let size = args['size'] || { height: 300, width: 300 }

		html = `
			<div class="container py-16 text-center">
				<button class="block mx-auto relative flex h-16 w-16 hover:scale-110 transition-transform duration-300">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 inline-video-trigger group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo""></span>
					<span class="relative inline-flex rounded-full h-16 w-16 bg-sky-500">
						<svg class="w-100 h-100" viewBox="0 0 183 183" fill="none"><path d="M112.311 92.302l-31.057 17.93v-35.86l31.057 17.93z" fill="#fff"></path></svg> 
					</span>
				</button>
			</div>
		`;

		return html
	},
	argTypes: {
		color: {
			control: {
				type: 'color',
			},
		},
		pulseColor: {
			control: {
				type: 'color',
			},
		},
	},
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PlayButton = {
	args: {
		color: '#4AC186',
		pulseColor: '#4AC186',
	},
}

// export const Year = {
//   args: {
//     type: 'year',
//   },
// };
