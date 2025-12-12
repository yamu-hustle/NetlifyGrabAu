import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules'

Swiper.use([Navigation, Pagination, Autoplay, Thumbs])

export default function sliders() {
	// get all sliders, we need to loop them due to different settings + nav
	var swipers = document.querySelectorAll(
		'.swiper:not(.control):not(.mobile)'
	)

	swipers.forEach(function (el, index) {
		var closestSection = el.closest('section')
		var controls = closestSection.querySelector('.control')
		var paginationEl = closestSection.querySelector('.swiper-pagination')
		var nextEl = closestSection.querySelector('.swiper-button-next')
		var prevEl = closestSection.querySelector('.swiper-button-prev')

		// slider settings
		var options = {
			speed: 600,
			loop: true,
			lazy: true,
			slideToClickedSlide: true,
			centeredSlides: true,
			spaceBetween: 30,
			slidesPerView: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			navigation: {
				nextEl: nextEl ? nextEl : '',
				prevEl: prevEl ? prevEl : '',
			},
			pagination: {
				el: paginationEl ? paginationEl : '',
				clickable: true,
				bulletActiveClass: 'bg-sky-600',
				renderBullet: function (index, className) {
					className += ' cursor-pointer w-3 h-3 rounded-full bg-slate-200 mx-2';
					return '<span class="'+className+'"></span>'
				}
			},
			thumbs: {},
		}

		if(el.classList.contains('swiper-cutoff')){
			options.slidesPerView = 1;
			options.breakpoints = {
				1200: {
					slidesPerView: 1.2,
					spaceBetween: 30,
				},
				2000: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			}
		}

		if (el.classList.contains('image-after-before-holder')) {
			options.autoplay = false;
			options.allowTouchMove = false;
			options.centeredSlides = false;
			options.breakpoints = {
				768: {
					slidesPerView: 2,
					spaceBetween: 40
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 80,
				},
			}
		}

		if (el.classList.contains('swiper-testimonial-blocks')) {
			options.centeredSlides = false
			options.slidesPerView = 1;
			options.slidesOffsetbefore = 0;
			options.breakpoints = {
				640: {
					spaceBetween: 20,
					slidesOffsetBefore: 100,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 50,
					slidesOffsetBefore: 250,
				},
			}
		}

		// For gallery sliders
		if (controls) {
			options.thumbs.swiper = new Swiper(controls, {
				speed: 600,
				loop: true,
				slidesPerView: 2,
				spaceBetween: 10,
				lazy: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				slideToClickedSlide: true,
				controller: {},
				autoplay: {
					delay: 5000,
					disableOnInteraction: true,
				},
				breakpoints: {
					640: {
						slidesPerView: 3,
					},
					992: {
						slidesPerView: 4,
					},
				},
			})
		}

		let mainSwiper = new Swiper(el, options)

		// pause autoplay when video starts, as disableOnInteraction doesnt alway work
		let videoButtons = closestSection.querySelectorAll('.play-button')
		videoButtons.forEach(function (el, index) {
			el.addEventListener('click', function () {
				mainSwiper.autoplay.stop()
			})
		})

		// stop video on slide change
		mainSwiper.on('slideChange', function () {
			let activeVideo = closestSection.querySelector(
				'iframe:not([src="about:blank"])'
			)
			if (activeVideo) {
				activeVideo.src = 'about:blank'
				activeVideo
					.closest('.video-preview-container')
					.classList.remove('playing')
			}
		})
	})

	// Load More Gallery feature
	// var hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide')
	// if (!hiddenSlides.length) {
	//     $('.load-more-gallery').hide()
	// }
	// $(document).on(
	//     'click',
	//     '.extended-gallery .load-more-gallery',
	//     function (event) {
	//         hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide')
	//         if (hiddenSlides.length <= 3) {
	//             $(this).hide()
	//         } else {
	//             for (var i = 0; i < 3; i++) {
	//                 var slide = hiddenSlides[i]
	//                 $(slide).removeClass('extra-slide')
	//                 $(slide).fadeIn(500)
	//             }
	//         }
	//     }
	// )
}

//
