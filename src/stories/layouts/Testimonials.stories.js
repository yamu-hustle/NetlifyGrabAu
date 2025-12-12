import sliders from "../../assets/js/sliders.js";

export default {
    title: 'Layouts/Testimonials',
    argTypes: {
        type: {
            control: {type: 'select'},
            options: ['single', 'offset'],
        },
    },
    render: (args) => {
        setTimeout(sliders, 0);

        if(args.type === 'single') {

        }

        if(args.type === 'offset'){

        }

    }
}

export const SingleSlide = () => {
    setTimeout(sliders, 0);
    return `
        <section class="py-16 md:py-28 text-center text-white relative">
            <div class="absolute top-0 left-0 z-10 pointer-events-none h-full w-full bg-black">
                <img src="placeholder.png" class="w-full h-full object-cover select-none opacity-60" />
            </div>
            <div class="container px-4 relative z-20">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full md:w-10/12 lg:w-8/12">
                        <h2 class="text-3xl lg:text-4xl mb-5 font-bold capitalize leading-tight">This Is What Our Customers Are Saying About Us...</h2>
                    </div>
                    <div class="w-full md:w-10/12 lg:w-8/12">
    
                        <!-- Slider and slides within -->
                        <div class="swiper reviews flex justify-center items-center text-center lg:text-xl">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <p class="mx-auto">This is the paragraph text of the section. It will usually be one big paragraph, or two separate paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and not just line breaks.</p>
                                </div>
                                <div class="swiper-slide">
                                    <p class="mx-auto">It will usually be one big paragraph, or two separate paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and not just line breaks. This is the paragraph text of the section.</p>
                                </div>
                                <div class="swiper-slide">
                                    <p class="mx-auto">Make sure you separate the different blocks of text with separate paragraph tags and not just line breaks. This is the paragraph text of the section. It will usually be one big paragraph, or two separate paragraphs.</p>
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

export const OffsetSlides = () => {
    setTimeout(sliders, 0);
    return `
        <section class="py-16 md:py-24 lg:py-28 bg-black">
            <div class="px-4 sm:px-0">
                <div class="flex flex-wrap justify-center text-center text-light">
                    <div class="w-full">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize text-center text-white mb-5">
                            Offset Testimonial Blocks Slider
                        </h2>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center ">
                    <div class="w-full">
    
                        <div class="swiper swiper-testimonial-blocks mb-8">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote. This particular testimonial
                                            contains heaps more words init. This is some testimonial text. It is a paragraph
                                            of text that also includes a
                                            citation of who the person was that gave the quote. This particular testimonial
                                            contains heaps more words init.This is some testimonial text. It is a paragraph
                                            of text that also includes a
                                            citation of who the person was that gave the quote. This particular testimonial
                                            contains heaps more words init.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                                <div class="swiper-slide bg-white p-3">
                                    <blockquote class="text-lg lg:text-2xl mb-0">
                                        <p>This is some testimonial text. It is a paragraph of text that also includes a
                                            citation of who the person was that gave the quote.</p>
                                        <cite class="text-end">John Snow</cite>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
    
                        <div class="swiper-pagination flex justify-center text-white/20"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
