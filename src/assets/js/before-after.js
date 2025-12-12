export default function beforeAfter() {
  const wraps = document.querySelectorAll( '.before-after-wrap' );

  wraps.forEach( ( wrap ) => {
    let active = false;  // Each wrap has its own `active` state

    const scroller = wrap.querySelector( '.scroller' );
    const imgAfter = wrap.querySelector( '.img-after' );

    if ( !scroller || !imgAfter ) {
      return; // Ensure there's a corresponding scroller and image for each wrap
    }

    const imgAfterInner = imgAfter.querySelector('div');
    imgAfterInner.style.width = wrap.getBoundingClientRect().width + 'px';

    window.addEventListener('resize', function () {
      imgAfterInner.style.width = wrap.getBoundingClientRect().width + 'px';
      scrollIt(wrap.getBoundingClientRect().width * .2, wrap, scroller, imgAfter);
    });

    scroller.addEventListener( 'mousedown', function () {
      active = true;
      scroller.classList.add( 'scrolling' );
    } );

    wrap.addEventListener( 'mouseup', function () {
      active = false;
      scroller.classList.remove( 'scrolling' );
    } );

    wrap.addEventListener( 'mouseleave', function () {
      active = false;
      scroller.classList.remove( 'scrolling' );
    } );

    wrap.addEventListener( 'mousemove', function ( e ) {
      if ( !active ) return;
      let x = e.pageX;
      x -= wrap.getBoundingClientRect().left;
      scrollIt( x, wrap, scroller, imgAfter );
    } );

    function scrollIt( x, wrap, scroller, imgAfter ) {
      let transform = Math.max( 0, ( Math.min( x, wrap.offsetWidth ) ) );
      imgAfter.style.width = transform + "px";
      scroller.style.left = transform - 25 + "px";
    }

    scrollIt( 150, wrap, scroller, imgAfter );

    scroller.addEventListener( 'touchstart', function () {
      active = true;
      scroller.classList.add( 'scrolling' );
    } );

    wrap.addEventListener( 'touchend', function () {
      active = false;
      scroller.classList.remove( 'scrolling' );
    } );

    wrap.addEventListener( 'touchcancel', function () {
      active = false;
      scroller.classList.remove( 'scrolling' );
    } );
  } );
}
