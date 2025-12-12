/**
 * Marquee Class
 *
 * A JavaScript class that creates infinite scrolling marquee effects for content.
 * Automatically clones content to ensure seamless infinite scrolling and handles
 * responsive behavior with ResizeObserver.
 *
 * @class Marquee
 * @description Creates and manages infinite scrolling marquee animations
 *
 * @example
 * // HTML structure required:
 * <div class="flex gap-[--marquee-gap] [--marquee-gap:20px] md:[--marquee-gap:40px] overflow-hidden" data-marquee>
 *   <ul class="flex gap-5 animate-marquee gap-[--marquee-gap]" data-marquee-items>
 *     <li class="shrink-0">Item 1</li>
 *     <li class="shrink-0">Item 2</li>
 *     <li class="shrink-0">Item 3</li>
 *   </ul>
 * </div>
 *
 * // JavaScript usage:
 * import initMarquees from './marquee.js';
 * const marquees = initMarquees();
 *
 * @example
 * // Manual instantiation:
 * const marqueeElement = document.querySelector('[data-marquee]');
 * const marquee = new Marquee(marqueeElement);
 */

class Marquee {
	constructor(element) {
		this.marquee = element
		this.marqueeItems = [] // this will be populated in getMarqueeItems()
		this.marqueeWidth = null // this will be populated in calculateMarqueeWidth()
		this.marqueeContainer = this.marquee.parentElement
		this.marqueeContainerWidth = this.marqueeContainer.offsetWidth
		this.marqueeGap = this.marquee.getAttribute('data-marquee-gap') ?? 20
		this.animationStyles = {
			animationName: null,
			animationDuration: null,
			animationTimingFunction: null,
			animationIterationCount: null,
		}

		this._init()
	}

	_init() {
		this.calculateMarqueeWidth()
		this.animationStyles = this._getAnimationStyles()
		this._removeAnimationStyles()
		this.cloneContent() // we need at least one duplicate regardless of screen/marquee width
		this.fillMarquee()
		this.setupResizeObserver() // Monitor parent width changes

		this._waitForImagesAndAddStyles()
	}

	fillMarquee() {
		const singleMarqueeWidth = this.marqueeWidth
		const targetFillWidth = this.marqueeContainerWidth * 2
		const completeMarqueeGroups = Math.floor(
			targetFillWidth / singleMarqueeWidth
		)
		const remainingWidth = targetFillWidth % singleMarqueeWidth
		const totalMarqueeGroupsNeeded =
			remainingWidth > 0
				? completeMarqueeGroups + 1
				: completeMarqueeGroups

		this.cloneContent(totalMarqueeGroupsNeeded)
		this.calculateMarqueeWidth()
	}

	calculateMarqueeWidth() {
		this.getMarqueeItems()

		// Get the computed gap value from CSS
		const computedStyle = window.getComputedStyle(this.marquee)
		const gapValue = this.marqueeGap

		let width = 0
		this.marqueeItems.forEach((item) => {
			width += item.offsetWidth

			// Add gaps between items within each ul
			const itemCount = item.children.length
			const gapsInThisUl = Math.max(0, itemCount - 1)

			width += gapsInThisUl * gapValue
		})

		this.marqueeWidth = width
	}

	getMarqueeItems() {
		const items = this.marquee.querySelectorAll('[data-marquee-items]')
		this.marqueeItems = Array.from(items)
	}

	cloneContent(numberOfClones) {
		for (let i = 0; i < numberOfClones; i++) {
			this.marquee.appendChild(this.marqueeItems[0].cloneNode(true))
		}
	}

	setupResizeObserver() {
		// Use ResizeObserver to monitor parent width changes
		if (window.ResizeObserver) {
			this.resizeObserver = new ResizeObserver(() => {
				const newContainerWidth = this.marqueeContainer.offsetWidth

				// Only add more content if parent got wider
				if (newContainerWidth > this.marqueeContainerWidth) {
					this.marqueeContainerWidth = newContainerWidth
					this._removeAnimationStyles()
					this.fillMarquee()
					this._waitForImagesAndAddStyles()
				}
			})

			this.resizeObserver.observe(this.marqueeContainer)
		}
	}

	destroy() {
		// Clean up the ResizeObserver
		if (this.resizeObserver) {
			this.resizeObserver.disconnect()
		}
	}

	_getAnimationStyles() {
		const computedStyle = getComputedStyle(this.marqueeItems[0])

		if (
			computedStyle.animationName &&
			computedStyle.animationName !== 'none'
		) {
			console.log('Animation name:', computedStyle.animationName)
			console.log('Animation duration:', computedStyle.animationDuration)
			console.log(
				'Animation timing function:',
				computedStyle.animationTimingFunction
			)
			return {
				animationName: computedStyle.animationName,
				animationDuration: computedStyle.animationDuration,
				animationTimingFunction: computedStyle.animationTimingFunction,
				animationIterationCount: computedStyle.animationIterationCount,
			}
		}
		console.warn('No animation styles')
		return null
	}

	_removeAnimationStyles() {
		console.log('Removing animation styles')
		this.marqueeItems.forEach((item) => {
			item.style.animation = 'none'
			item.style.animationDuration = '0s'
			item.style.animationTimingFunction = 'none'
			item.style.animationIterationCount = 'none'
		})
	}

	_addAnimationStyles() {
		this.marqueeItems.forEach((item) => {
			item.style.animation = this.animationStyles.animationName
			item.style.animationDuration =
				this.animationStyles.animationDuration
			item.style.animationTimingFunction =
				this.animationStyles.animationTimingFunction
			item.style.animationIterationCount =
				this.animationStyles.animationIterationCount
		})
	}

	async _waitForImagesAndAddStyles() {
		const images = this._getAllImages()

		if (images.length === 0) {
			// No images found, add styles immediately
			this._addAnimationStyles()
			return
		}

		try {
			await this._waitForAllImages(images)
			this._addAnimationStyles()
		} catch (error) {
			console.warn(
				'Some images failed to load, proceeding with animation anyway:',
				error
			)
			this._addAnimationStyles()
		}
	}

	_getAllImages() {
		const images = []
		this.marqueeItems.forEach((item) => {
			const itemImages = item.querySelectorAll('img')
			images.push(...itemImages)
		})
		return images
	}

	_waitForAllImages(images) {
		const imagePromises = images.map((img) => {
			return new Promise((resolve, reject) => {
				if (img.complete) {
					// Image is already loaded
					resolve()
				} else {
					// Wait for image to load
					img.addEventListener('load', resolve)
					img.addEventListener('error', reject)
				}
			})
		})

		return Promise.allSettled(imagePromises)
	}
}

// Initialize all marquees on the page
export default function initMarquees() {
	const marqueeElements = document.querySelectorAll('[data-marquee]')
	const marqueeInstances = []

	marqueeElements.forEach((element) => {
		const marqueeInstance = new Marquee(element)
		marqueeInstances.push(marqueeInstance)
	})

	return marqueeInstances
}

initMarquees()

