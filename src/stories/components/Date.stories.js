import date from '../../assets/js/date.js'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
	title: 'Components/Dynamic Date',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'The `Dynamic Date` component displays the current month or year dynamically based on the selected type. Use this component to show date-related information that updates automatically.',
			},
		},
	},
	render: ({ label, ...args }) => {
		setTimeout(() => {
			date() // This function should be exported from your `date.js`
		}, 0) // Executing after the current call stack clears, giving time for the DOM to update

		let html

		if (args['type'] == 'month') {
			html = `
				<div class="container p-4">
					<div class="text-center">
						<p>The current month is: <span class="dyn-month">this month</span></p>
					</div>
				</div>
			`
		} else {
			html = `
				<div class="container p-4">
					<div class="text-center">
						<p>The current year is: <span class="dyn-year">this year</span></p>
					</div>
				</div>
			`
		}

		return html
	},
	argTypes: {
		type: {
			options: ['month', 'year'],
			control: {
				// type: 'radio',
				disable: true,
				// hideNoControlsWarning: true
			},
		},
	},
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Month = {
	args: {
		type: 'month',
	},
}

export const Year = {
	args: {
		type: 'year',
	},
}
