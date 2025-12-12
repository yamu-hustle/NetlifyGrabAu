import timer from '../../assets/js/timer.js';

export default {
    title: 'Components/Countdown Timers',
    tags: ['autodocs'],
}

export const CountdownProgressBar = (args) => {
    setTimeout(timer, 0);

    return `
        <div class="container px-4">
            <div class="flex flex-wrap justify-center">
                <div class="w-full text-center">
                    <div class="js-countdown-timer">
                        <div class="progressbar w-10/12 h-8 my-2 mx-auto rounded-full p-1 bg-gray-200 mb-5">
                            <div class="completed relative h-full w-7/12 rounded-xl bg-green-400 transition-[width] duration-300
                                    after:absolute
                                    after:top-0
                                    after:left-0
                                    after:bottom-0
                                    after:right-0
                                    after:bg-progressBar
                                    after:animate-progressbar
                                    after:bg-[length:50px_50px]
                            "></div>
                        </div>

                        <h3 class="js-training-text font-bold"
                            data-end-text="Offer Ended!">
                            <span class="block lg:inline">Offer Ends In:</span>&nbsp;
                            <span class="js-time-left text-green-500"></span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const FlipClock = () => {
    setTimeout(timer, 0);

    return `
        <div class="container px-4">
            <div class="flex flex-wrap justify-center">
                <div class="w-full lg:text-xl text-center">
                    <!-- FLIP CLOCK TIMER -->
                    <div class="js-flipclock-timer my-7"></div>
                </div>
            </div>
        </div>
    `;
}

export const NeverEndingProgressBar = () => {
    setTimeout(timer, 0);

    return `
        <div class="container px-4">
            <div class="flex flex-wrap justify-center">
                <div class="w-full lg:text-xl text-center">
                    <div class="progressbar w-10/12 h-8 my-2 mx-auto rounded-full p-1 bg-gray-200 mb-5">
                        <div class="completed relative h-full w-7/12 rounded-xl bg-green-400 transition-[width] duration-300
                                after:absolute
                                after:top-0
                                after:left-0
                                after:bottom-0
                                after:right-0
                                after:bg-progressBar
                                after:animate-progressbar
                                after:bg-[length:50px_50px]
                        "></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}