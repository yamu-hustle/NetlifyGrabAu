export default function timer() {
	let deadlineHour = 2 //hours
	let deadlineMinut = 0 //minutes
	let deadlineSecond = 0 //seconds
	window.endTimestamp = localStorage.getItem('endTimestamp');

	let countdownTimer = document.querySelectorAll('.js-countdown-timer');
	let flipclockTimer = document.querySelectorAll('.js-flipclock-timer');

	let remainingTime = calcRemainingTime(),
		countHours = remainingTime['countHours'],
		countMinutes = remainingTime['countMinutes'],
		countSeconds = remainingTime['countSeconds'];

	if(!window.endTimestamp || (countHours == 0 && countMinutes == 0 && countSeconds == 0)){
		let nowDate = new Date();
		nowDate.addHours(deadlineHour);
		nowDate.addMins(deadlineMinut);
		nowDate.addSeconds(deadlineSecond);
		window.endTimestamp = nowDate.getTime();
		localStorage.setItem('endTimestamp', window.endTimestamp);
	}

	//COUNTDOWN
	if (countdownTimer.length > 0) {
		function countdownTimer() {
			let remainingTime = calcRemainingTime(),
				countHours = remainingTime['countHours'],
				countMinutes = remainingTime['countMinutes'],
				countSeconds = remainingTime['countSeconds'],
				remainingCount =
					countHours * 60 * 60 + countMinutes * 60 + countSeconds,
				deadlineCount =
					deadlineHour * 60 * 60 +
					deadlineMinut * 60 +
					deadlineSecond,
				hourString = ' Hours, ',
				minuteString = ' Minutes, ',
				secondString = ' Seconds'

			if (countHours == 1) {
				hourString = ' Hour, '
			}
			if (countMinutes == 1) {
				minuteString = ' Minute, '
			}
			if (countSeconds == 1) {
				secondString = ' Second'
			}

			document
				.querySelectorAll('.js-training-text .js-time-left')
				.forEach(function (selected, index) {
					if (countHours < 1 && countMinutes < 1) {
						selected.innerHTML = countSeconds + secondString
					} else if (countHours < 1) {
						selected.innerHTML =
							countMinutes +
							minuteString +
							countSeconds +
							secondString
					} else {
						selected.innerHTML =
							countHours +
							hourString +
							countMinutes +
							minuteString +
							countSeconds +
							secondString
					}
				})
			progress(remainingCount, deadlineCount)
		}
		setInterval(countdownTimer, 1000)
	}

	// FLIPCLOCK TIMER
	if (flipclockTimer.length > 0) {
		let remainingTime = calcRemainingTime(),
			countHours = remainingTime['countHours'],
			countMinutes = remainingTime['countMinutes'],
			countSeconds = remainingTime['countSeconds'],
			deadline = new Date(
				Date.parse(new Date()) +
					countHours * 60 * 60 * 1000 +
					countMinutes * 60 * 1000 +
					countSeconds * 1000
			)

		document
			.querySelectorAll('.js-flipclock-timer')
			.forEach(function (selected, index) {
				let clock = new Clock(deadline, function () {
					console.log('countdown complete')
				})
				selected.appendChild(clock.el)
			})
	}

	function calcRemainingTime() {
		// let dt = new Date()
		// let startHour = dt.getHours()
		// let startMinut = dt.getMinutes()
		// let startSecond = dt.getSeconds()

		// let countHours = startMinut
		// 	? deadlineHour - 1 - (startHour % deadlineHour)
		// 	: deadlineHour - (startHour % deadlineHour)

		// let countMinutes = startSecond
		// 	? deadlineMinut - 1 - (startMinut % deadlineMinut)
		// 	: deadlineMinut - (startMinut % deadlineMinut)

		// let countSeconds = startSecond ? 60 - startSecond : startSecond

		// return {
		// 	countHours: countHours,
		// 	countMinutes: countMinutes,
		// 	countSeconds: countSeconds,
		// }
		let t = getTimeRemaining();
		let countHours = t.Hours;
		let countMinutes = t.Minutes;
		let countSeconds = t.Seconds;

		return {
			countHours: countHours,
			countMinutes: countMinutes,
			countSeconds: countSeconds,
		}
	}

	function progress(timeleft, timetotal) {
		let progressBarWidth = 100 - (timeleft / timetotal) * 100;

		let processBarComplete = document.querySelector('.js-countdown-timer .progressbar .completed');
		if(processBarComplete){
			processBarComplete.style.width = progressBarWidth + '%';
		}
	}

	// Flipclock Timer
	function CountdownTracker(label, value) {
		let el = document.createElement('span')
		el.className = 'inline-block mx-1 md:mx-2 group/flip'
		el.innerHTML =
			'<b class="block relative pb-[.8em] md:pb-[.8em] text-3xl md:text-4xl leading-[.95]">'+
			'<b class="card__top block h-[.8em] md:h-[.8em] text-gray-300 bg-gray-900 px-4 pt-2 pb-1.5 md:py-3 rounded-t-md w-20 md:w-32 transform-gpu"></b>' +
			'<b class="card__bottom  h-[.8em] md:h-[.8em] text-gray-100 bg-gray-900 px-4 px-4 pt-2 pb-1.5 md:py-3 rounded-b-md w-20 md:w-32 transform-gpu  absolute top-1/2 left-0 border-t border-t-black bg-gray-700 rounded-b-md pointer-events-none overflow-hidden  after:block after:-mt-[.8em] md:after:-mt-[.8em] after:block after:-mt-[.8em] after:content-[attr(data-value)]"></b>' +
			'<b class="card__back absolute top-0 h-full left-0 pointer-events-none before:overflow-hidden group-[.flip]/flip:before:animate-fliptop before:origin-[center_bottom] before:relative before:z-[-1]  before:block before:h-[.8em] md:before:h-[.8em] before:text-gray-300 before:bg-gray-900 before:px-4 before:pt-2 before:pb-1.5 md:before:py-3 before:rounded-t-md before:w-20 md:before:w-32 before:transform-gpu before:content-[attr(data-value)]">' +
			'<b class="card__bottom group-[.flip]/flip:animate-flipbottom origin-[center_top] h-[.8em] md:h-[.8em] text-white bg-gray-900 px-4 pt-2 pb-1.5 md:py-3 rounded-t-md rounded-r-md w-20 md:w-32 transform-gpu absolute top-1/2 left-0 border-t border-t-black bg-gray-700 rounded-b-md pointer-events-none overflow-hidden after:block after:-mt-[.8em] md:after:-mt-[.8em] after:content-[attr(data-value)]">' +
			'</b></b></b>' +
			'<span class="flip-clock__slot mt-2 block md:text-xl text-semibold">' +
			label +
			'</span>'
		this.el = el

		let top = el.querySelector('.card__top'),
			bottom = el.querySelector('.card__bottom'),
			back = el.querySelector('.card__back'),
			backBottom = el.querySelector('.card__back .card__bottom')

		this.update = function (val) {
			val = ('0' + val).slice(-2)
			if (val !== this.currentValue) {
				if (this.currentValue >= 0) {
					back.setAttribute('data-value', this.currentValue)
					bottom.setAttribute('data-value', this.currentValue)
				}
				this.currentValue = val
				top.innerText = this.currentValue
				backBottom.setAttribute('data-value', this.currentValue)

				this.el.classList.remove('flip')
				void this.el.offsetWidth
				this.el.classList.add('flip')
			}
		}
		this.update(value)
	}

	// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
	function getTimeRemaining(endtime) {
		let t = window.endTimestamp - Date.parse(new Date());

		if(t < 0){
			t = 0;
		}

		return {
			Total: t,
			// 'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
			Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
			Minutes: Math.floor((t / 1000 / 60) % 60),
			Seconds: Math.floor((t / 1000) % 60),
		}
	}

	function getTime() {
		let t = new Date()
		return {
			Total: t,
			Hours: t.getHours() % 12,
			Minutes: t.getMinutes(),
			Seconds: t.getSeconds(),
		}
	}

	function Clock(countdown, callback) {
		countdown = countdown ? new Date(Date.parse(countdown)) : false
		callback = callback || function () {}

		let updateFn = countdown ? getTimeRemaining : getTime

		this.el = document.createElement('div')
		this.el.className = 'flip-clock'

		let trackers = {},
			t = updateFn(countdown),
			key,
			timeinterval

		for (key in t) {
			if (key === 'Total') {
				continue
			}
			trackers[key] = new CountdownTracker(key, t[key])
			this.el.appendChild(trackers[key].el)
		}

		let i = 0
		function updateClock() {
			timeinterval = requestAnimationFrame(updateClock)

			// throttle so it's not constantly updating the time.
			if (i++ % 10) {
				return
			}

			let t = updateFn(countdown)
			if (t.Total < 0) {
				cancelAnimationFrame(timeinterval)
				for (key in trackers) {
					trackers[key].update(0)
				}
				callback()
				return
			}

			for (key in trackers) {
				trackers[key].update(t[key])
			}
		}
		setTimeout(updateClock, 500)
	}
}


Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

Date.prototype.addMins = function(m) {
  this.setTime(this.getTime() + (m*60*1000));
  return this;
}

Date.prototype.addSeconds = function(m) {
  this.setTime(this.getTime() + (m*1000));
  return this;
}
