
import beforeAfter from "../../assets/js/before-after.js";
import sliders from "../../assets/js/sliders.js";

export default {
    title: 'Components/Before After',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `Before/After` component displays an image with a vertical slider that slides from side to side to reveal the image underneath. /n Note: Currently this component does not function properly in Storybook, but when used in your project it will work as expected.',
            },
        },
    },
}

export const BeforeAfter = () => {
    setTimeout(sliders, 0);
    setTimeout(beforeAfter, 0);

    return `
        <div class="container p-4">
            <div class="w-full max-w-full m-0 h-[300px]">
                <div class="before-after-wrap h-full overflow-hidden relative rounded-lg md:min-h-[243px] lg:min-h-[293px]">
                    <span class="absolute bg-gray-200 text-black text-sm top-3 left-3 z-50 px-2.5 py-1.5">Before</span>
                    <span class="absolute bg-gray-200 text-black text-sm top-3 right-3 z-50 px-2.5 py-1.5">After</span>

                    <div class="img-before w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10" draggable="false">
                        <div class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full" style="background-image:url('placeholder.png');">
                        </div>
                    </div>
                    <div class="img-after w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10" draggable="false">
                        <div class="absolute min-w-full z-20 top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full" style="background-image:url(placeholder-alt.png);">
                        </div>
                    </div>
                    <div class="scroller w-12 h-12 absolute top-1/2 -translate-y-1/2 rounded-full bg-transparent opacity-90 pointer-events-auto cursor-pointer z-20 bg-scroller bg-center bg-contain hover:opacity-100 transition-opacity

                    before:block before:bg-white before:w-[2px] before:h-48 before:absolute before:left-1/2 before:ml-[-1px] before:z-30 before:transition-all before:duration-100 before:top-full

                    after:block after:bg-white after:w-[2px] after:h-48 after:absolute after:left-1/2 after:ml-[-1px] after:z-30 after:transition-all after:duration-100 after:bottom-full
                    ">
                        <img src="scroller.svg" class="w-full h-full block"/>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export const BeforeAfterSlider = () => {
    setTimeout(sliders, 0);
    setTimeout(beforeAfter, 0);
    
    return ` 
        <section class="py-16 md:py-24 lg:py-28 bg-gray-100">
            <div class="container px-4">
                <div class="flex flex-wrap relative justify-center mb-5">
                    <div class="w-full  md:w-9/12 lg:w-10/12">
                        <div
                            class="swiper h-[300px] flex justify-center items-center  image-after-before-holder">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div
                                        class="before-after-wrap h-full overflow-hidden relative rounded-lg md:min-h-[243px] lg:min-h-[293px]">
                                                <span
                                                    class="absolute bg-gray-200 text-black text-sm top-3 left-3 z-50 px-2.5 py-1.5">Before</span>
                                        <span
                                            class="absolute bg-gray-200 text-black text-sm top-3 right-3 z-50 px-2.5 py-1.5">After</span>
    
                                        <div
                                            class="img-before w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url('placeholder.png');">
                                            </div>
                                        </div>
                                        <div
                                            class="img-after w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute min-w-full z-20 top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url(placeholder-alt.png);">
                                            </div>
                                        </div>
                                        <div class="scroller w-12 h-12 absolute top-1/2 -translate-y-1/2 rounded-full bg-transparent opacity-90 pointer-events-auto cursor-pointer z-20 bg-scroller bg-center bg-contain hover:opacity-100 transition-opacity
                
                                                            before:block before:bg-white before:w-[2px] before:h-48 before:absolute before:left-1/2 before:ml-[-1px] before:z-30 before:transition-all before:duration-100 before:top-full
                
                                                            after:block after:bg-white after:w-[2px] after:h-48 after:absolute after:left-1/2 after:ml-[-1px] after:z-30 after:transition-all after:duration-100 after:bottom-full
                                                            ">
                                            <img src="scroller.svg"
                                                 class="w-full h-full block"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div
                                        class="before-after-wrap h-full overflow-hidden relative rounded-lg md:min-h-[243px] lg:min-h-[293px]">
                                                <span
                                                    class="absolute bg-gray-200 text-black text-sm top-3 left-3 z-50 px-2.5 py-1.5">Before</span>
                                        <span
                                            class="absolute bg-gray-200 text-black text-sm top-3 right-3 z-50 px-2.5 py-1.5">After</span>
    
                                        <div
                                            class="img-before w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url('placeholder.png');">
                                            </div>
                                        </div>
                                        <div
                                            class="img-after w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute min-w-full z-20 top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url(placeholder-alt.png);">
                                            </div>
                                        </div>
                                        <div class="scroller w-12 h-12 absolute top-1/2 -translate-y-1/2 rounded-full bg-transparent opacity-90 pointer-events-auto cursor-pointer z-20 bg-scroller bg-center bg-contain hover:opacity-100 transition-opacity
                
                                                            before:block before:bg-white before:w-[2px] before:h-48 before:absolute before:left-1/2 before:ml-[-1px] before:z-30 before:transition-all before:duration-100 before:top-full
                
                                                            after:block after:bg-white after:w-[2px] after:h-48 after:absolute after:left-1/2 after:ml-[-1px] after:z-30 after:transition-all after:duration-100 after:bottom-full
                                                            ">
                                            <img src="scroller.svg"
                                                 class="w-full h-full block"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div
                                        class="before-after-wrap h-full overflow-hidden relative rounded-lg md:min-h-[243px] lg:min-h-[293px]">
                                                <span
                                                    class="absolute bg-gray-200 text-black text-sm top-3 left-3 z-50 px-2.5 py-1.5">Before</span>
                                        <span
                                            class="absolute bg-gray-200 text-black text-sm top-3 right-3 z-50 px-2.5 py-1.5">After</span>
    
                                        <div
                                            class="img-before w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url('placeholder.png');">
                                            </div>
                                        </div>
                                        <div
                                            class="img-after w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute min-w-full z-20 top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url(placeholder-alt.png);">
                                            </div>
                                        </div>
                                        <div class="scroller w-12 h-12 absolute top-1/2 -translate-y-1/2 rounded-full bg-transparent opacity-90 pointer-events-auto cursor-pointer z-20 bg-scroller bg-center bg-contain hover:opacity-100 transition-opacity
                
                                                            before:block before:bg-white before:w-[2px] before:h-48 before:absolute before:left-1/2 before:ml-[-1px] before:z-30 before:transition-all before:duration-100 before:top-full
                
                                                            after:block after:bg-white after:w-[2px] after:h-48 after:absolute after:left-1/2 after:ml-[-1px] after:z-30 after:transition-all after:duration-100 after:bottom-full
                                                            ">
                                            <img src="scroller.svg"
                                                 class="w-full h-full block"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div
                                        class="before-after-wrap h-full overflow-hidden relative rounded-lg md:min-h-[243px] lg:min-h-[293px]">
                                                <span
                                                    class="absolute bg-gray-200 text-black text-sm top-3 left-3 z-50 px-2.5 py-1.5">Before</span>
                                        <span
                                            class="absolute bg-gray-200 text-black text-sm top-3 right-3 z-50 px-2.5 py-1.5">After</span>
    
                                        <div
                                            class="img-before w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url('placeholder.png');">
                                            </div>
                                        </div>
                                        <div
                                            class="img-after w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden z-10"
                                            draggable="false">
                                            <div
                                                class="absolute min-w-full z-20 top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat w-full"
                                                style="background-image:url(placeholder-alt.png);">
                                            </div>
                                        </div>
                                        <div class="scroller w-12 h-12 absolute top-1/2 -translate-y-1/2 rounded-full bg-transparent opacity-90 pointer-events-auto cursor-pointer z-20 bg-scroller bg-center bg-contain hover:opacity-100 transition-opacity
                
                                                            before:block before:bg-white before:w-[2px] before:h-48 before:absolute before:left-1/2 before:ml-[-1px] before:z-30 before:transition-all before:duration-100 before:top-full
                
                                                            after:block after:bg-white after:w-[2px] after:h-48 after:absolute after:left-1/2 after:ml-[-1px] after:z-30 after:transition-all after:duration-100 after:bottom-full
                                                            ">
                                            <img src="scroller.svg"
                                                 class="w-full h-full block"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-nav flex justify-center mt-8 md:mt-0">
                            <div
                                class="swiper-button-prev relative md:absolute outline-none inline-block md:flex justify-center items-center mt-0 md:top-1/2 md:-translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer mx-4 md:mx-0 left-4 after:border-t-2 after:border-l-2 after:border-blue-400 after:w-8 after:h-8 after:block after:-rotate-45"></div>
                            <div
                                class="swiper-button-next relative md:absolute outline-none inline-block md:flex justify-center items-center mt-0 md:top-1/2 md:-translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer mx-4 md:mx-0 right-4 after:border-t-2 after:border-r-2 after:border-blue-400 after:w-8 after:h-8 after:block after:rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
