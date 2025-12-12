/**
 * Home page JS here
 */
import accordion from ".././assets/js/accordion";
import kkThankYou from '.././assets/js/thank-you';
import contentLoaded from '.././assets/js/vendor/contentloaded';

contentLoaded(window, () => {
    kkThankYou();
    accordion();
})