import MicroModal from 'micromodal'

const microModalSettings = {
	openTrigger: 'data-mm-target',
	closeTrigger: 'data-mm-dismiss',
	openClass: 'is-open',
	onShow: (e) => {
		document.body.classList.add('overflow-hidden');

		let modalVideoButton = document.querySelector('.modal.is-open .inline-video-trigger');

		if(modalVideoButton){
			_playVideo(modalVideoButton);
		}
	},
	onClose: () => {
		document.body.classList.remove('overflow-hidden');

		let activeVideo = document.querySelector('iframe.aspect-video:not([src="about:blank"])');
		
        if(activeVideo){
            activeVideo.src = 'about:blank';
            activeVideo.closest('.video-preview-container').classList.remove('playing');
        }
	},
}

export function initModals() {
	MicroModal.init(microModalSettings)
}

export function exitIntent() {
	var exitHappened = 0
	let eiModal = [].slice.call(document.querySelectorAll('.modal--ei'));

	eiModal.map((modal) => {
		return setTimeout(function () {
			document.addEventListener('mouseout', function (evt) {
				if (
					((evt.toElement === null && evt.relatedTarget === null) ||
						(typeof evt.toElement == 'undefined' &&
							evt.relatedTarget === null)) &&
					exitHappened < 1
				) {
					if (!document.querySelector('.modal.is-open')) {
						MicroModal.show(modal.id, microModalSettings)
						exitHappened = 1
					}
				}
			})
		}, 4000)
	})
}
