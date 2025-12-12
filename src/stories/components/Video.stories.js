import video from '../../assets/js/video-embeds.js'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
	title: 'Components/Video Embeds',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'The `Video Embeds` component displays placeholder image and button for video embeds. The component should be used to display video embeds in a consistent way across the website.',
			},
		},
	},
	argTypes: {
		embedType: {
			options: ['wistia', 'vimeo', 'youtube'],
			control: {
				type: 'select',
			},
			defaultValue: 'youtube',
		},
		videoId: {
			control: {
				type: 'text',
			},
			defaultValue: 'gvSGTP2D_Lo',
		},
		previewType: {
			options: ['image', 'video'],
			control: {
				type: 'select',
			},
			defaultValue: 'image',
		},
	},
};

const Template = ({ embedType, videoId, previewType }) => {
	setTimeout(() => {
		video() // This function should be exported from your `video.js`
	}, 0) // Executing after the current call stack clears, giving time for the DOM to update

	let preview = '';

	if (previewType === 'image') {
		preview = `<img src="https://picsum.photos/640/360" class="w-full h-full object-cover " />`;
	} else {
		preview = `
			<video width="100%" muted="" autoplay="" playsinline="" loop="" data-js-modal-trigger="free-training">
				<source src="https://kingkong.co/wp-content/uploads/2024/04/vsl-2024-preview.mp4" type="video/mp4">
			</video>
		`;  
	}

	return `
		<div class="container p-4">
			<div class="relative bg-black overflow-hidden mb-8 group/video">
				<iframe class="aspect-video w-full" src="about:blank" frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>

				<div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden inline-video-trigger cursor-pointer" data-video-id="${videoId}">
					${preview}
				</div>

				<button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 group-hover/video:scale-110 group-[.playing]/video:hidden pointer-events-none">
					<svg viewBox="0 0 183 183" fill="none" class=""><circle opacity=".2" cx="91.605" cy="91.267" r="91.099" fill="#4AC186"></circle><circle cx="91.605" cy="91.266" r="62.113" fill="#4AC186"></circle><path d="M112.311 92.302l-31.057 17.93v-35.86l31.057 17.93z" fill="#fff"></path></svg>
				</button>
			</div>
		</div>
	`;
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ImagePreview = Template.bind({});
ImagePreview.args = {
    embedType: 'youtube',
	videoId: 'gvSGTP2D_Lo',
	previewType: 'image',
};

export const VideoPreview = Template.bind({});
VideoPreview.args = {
	embedType: 'youtube',
	videoId: 'gvSGTP2D_Lo',
	previewType: 'video',
};
