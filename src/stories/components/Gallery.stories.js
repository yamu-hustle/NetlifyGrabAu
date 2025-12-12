import sliders from "../../assets/js/sliders.js";
import videos from "../../assets/js/video-embeds.js";

export default {
    title: 'Components/Sliders',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Sliders use the SwiperJS library to create a gallery of images or videos. Anything that you see in the Swiper docs is possible using our implementation. See below some variations of the slider component.',
            },
        },
    },
}

export const CutOffGallery = () => {
    setTimeout(sliders, 0);
    return `
        <section>
            <div class="swiper swiper-cutoff">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img class="w-full" nolazy src="placeholder.png">
                    </div>
                    <div class="swiper-slide">
                        <img class="w-full" nolazy src="placeholder.png">
                    </div>
                    <div class="swiper-slide">
                        <img class="w-full" nolazy src="placeholder.png">
                    </div>
                    <div class="swiper-slide">
                        <img class="w-full" nolazy src="placeholder.png">
                    </div>
                </div>
            </div>
            <div class="swiper-pagination flex justify-center mt-6"></div>
        </section>
    `;
};

export const GalleryWithControls = () => {
    setTimeout(sliders, 0);

    return `
        <section>
            <div class="container px-4">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full relative">

                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img nolazy class="w-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide">
                                    <img nolazy class="w-full" src="placeholder-2.jpg">
                                </div>
                                <div class="swiper-slide">
                                    <img nolazy class="w-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide">
                                    <img nolazy class="w-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide">
                                    <img nolazy class="w-full" src="placeholder.png">
                                </div>
                            </div>
                        </div>

                        <div class="swiper control mt-4">
                            <div class="swiper-wrapper ">
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy class="w-full object-cover h-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy class="w-full object-cover h-full" src="placeholder-2.jpg">
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy class="w-full object-cover h-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy class="w-full object-cover h-full" src="placeholder.png">
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy class="w-full object-cover h-full" src="placeholder.png">
                                </div>
                            </div>
                        </div>

                        <div class="swiper-nav flex justify-center mt-8 md:mt-0">
                            <div class="swiper-button-prev relative md:absolute outline-none inline-block md:flex justify-center items-center mt-0 md:top-1/2 md:-translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer mx-4 md:mx-0 left-4 after:border-t-2 after:border-l-2 after:border-blue-400 after:w-8 after:h-8 after:block after:-rotate-45"></div>
                            <div class="swiper-button-next relative md:absolute outline-none inline-block md:flex justify-center items-center mt-0 md:top-1/2 md:-translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer mx-4 md:mx-0 right-4 after:border-t-2 after:border-r-2 after:border-blue-400 after:w-8 after:h-8 after:block after:rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};

export const VideoGallery = () => {
    setTimeout(sliders, 0);
    setTimeout(videos, 0);

    return `
        <section>
            <div class="container px-4">
                <div class="flex flex-wrap justify-center mb-8">
                    <div class="w-full">
    
                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="relative bg-black overflow-hidden  group/video">
                                        <iframe class="aspect-video w-full " src="about:blank" frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
    
                                        <div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden">
                                            <img src="placeholder-2.jpg" class="w-full h-full object-cover " />
                                        </div>
    
                                        <button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-video-trigger hover:scale-110 group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo">
                                            <icon src="icon-play.svg" ></icon>
                                            <p class="text-center font-bold text-white lg:text-2xl">
                                                Denise
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                <div class="swiper-slide slide-2">
                                    <div class="relative bg-black overflow-hidden  group/video">
                                        <iframe class="aspect-video w-full " src="about:blank" frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
    
                                        <div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden">
                                            <img src="placeholder-2.jpg" class="w-full h-full object-cover " />
                                        </div>
    
                                        <button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-video-trigger hover:scale-110 group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo">
                                            <icon src="icon-play.svg" ></icon>
                                            <p class="text-center font-bold text-white lg:text-2xl">
                                                Helen
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                <div class="swiper-slide slide-3">
                                    <div class="relative bg-black overflow-hidden  group/video">
                                        <iframe class="aspect-video w-full " src="about:blank" frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
    
                                        <div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden">
                                            <img src="placeholder-2.jpg" class="w-full h-full object-cover " />
                                        </div>
    
                                        <button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-video-trigger hover:scale-110 group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo">
                                            <icon src="icon-play.svg" ></icon>
                                            <p class="text-center font-bold text-white lg:text-2xl">
                                                Roger
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                <div class="swiper-slide slide-4">
                                    <div class="relative bg-black overflow-hidden  group/video">
                                        <iframe class="aspect-video w-full " src="about:blank" frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
    
                                        <div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden">
                                            <img src="placeholder-2.jpg" class="w-full h-full object-cover " />
                                        </div>
    
                                        <button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-video-trigger hover:scale-110 group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo">
                                            <icon src="icon-play.svg" ></icon>
                                            <p class="text-center font-bold text-white lg:text-2xl">
                                                Myrtle
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                <div class="swiper-slide slide-5">
                                    <div class="relative bg-black overflow-hidden  group/video">
                                        <iframe class="aspect-video w-full " src="about:blank" frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
    
                                        <div class="absolute top-0 left-0 w-full h-full group-[.playing]/video:hidden">
                                            <img src="placeholder-2.jpg" class="w-full h-full object-cover " />
                                        </div>
    
                                        <button class="w-24 p-0 m-0 border-0 appearance-none bg-none z-10 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-video-trigger hover:scale-110 group-[.playing]/video:hidden" data-video-id="gvSGTP2D_Lo">
                                            <icon src="icon-play.svg" ></icon>
                                            <p class="text-center font-bold text-white lg:text-2xl">
                                                George
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-nav">
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                        </div>
    
    
                        <div class="swiper control mt-3 text-center">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy src="placeholder.png">
                                    <h6 class="font-semibold mt-2 text-lg">Denise</h6>
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy src="placeholder.png">
                                    <h6 class="font-semibold mt-2 text-lg">Helen</h6>
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy src="placeholder.png">
                                    <h6 class="font-semibold mt-2 text-lg">Roger</h6>
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy src="placeholder.png">
                                    <h6 class="font-semibold mt-2 text-lg">Myrtle</h6>
                                </div>
                                <div class="swiper-slide h-auto !transition-all duration-500 opacity-60 [&.swiper-slide-thumb-active]:opacity-100">
                                    <img nolazy src="placeholder.png">
                                    <h6 class="font-semibold mt-2 text-lg">George</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};