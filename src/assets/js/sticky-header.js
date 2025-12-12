export default function stickyHeader() {

	let headerEl = document.querySelector('.site-header');

	if(!headerEl){
		return;
	}

	_checkScrolled();

	window.addEventListener('scroll', function(){
		_checkScrolled();
	});

	function _checkScrolled(){
		if(window.scrollY >= 30){
			headerEl.classList.add('bg-white','shadow-lg');
		}else{
			headerEl.classList.remove('bg-white','shadow-lg');
		}
	}
}
