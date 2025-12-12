export default {
    title: 'Layouts/Copy Image',
    argTypes: {
        type: {
            control: {type: 'select'},
            options: ['single', 'left', 'right'],
        },
    },
    render: (args) => {
        if(args.type === 'single'){

        }

        if(args.type === 'left'){

        }


        if(args.type === 'right'){

        }
    }
};

export const SingleColumn = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28 bg-gray-100">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center mb-5">
                    <div class="w-full md:w-10/12 lg:w-1/2 mb-7">
                        <img src="placeholder-2.jpg" />
                    </div>
    
                    <div class="w-full md:w-10/12 lg:w-8/12 text-center">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize">Basic Single Column Text Module</h2>
                    </div>
                    <div class="md:w-8/12 lg:w-1/2 lg:text-xl">
                        <p>This is the paragraph text of the section. It will usually be one big paragraph, or two separate
                            paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and
                            not just line breaks.</p>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center">
                    <div class="md:w-8/12 lg:w-1/2">
                        <div class="text-center">
                            <a href="#offer-form"
                               class="inline-block w-full border-0 rounded-md mb-5 lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black">
                                CTA BUTTON TEXT
                            </a>
                            <p class="lg:text-xl w-10/12 mx-auto"> This is the descriptive CTA button which will probably be two lines long
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export const LeftText = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28">
            <div class="container px-4">
                            <div class="flex justify-center items-center flex-wrap lg:flex-nowrap gap-x-8">
                                <div class="w-full md:w-10/12 lg:w-1/2 order-2 lg:order-1  lg:text-xl">
                                    <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize">Copy + Image Module</h2>
                
                                    <p class="mb-5">This is the paragraph text of the section. It will usually be one big paragraph, or two separate
                                        paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and
                                        not just line breaks.</p>
                
                                    <div class="text-center">
                    <a href="#offer-form"
                       class="inline-block w-full border-0 rounded-md mb-5 lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black">
                        CTA BUTTON TEXT
                    </a>
                    <p class="lg:text-xl w-10/12 mx-auto"> This is the descriptive CTA button which will probably be two lines long
                    </p>
                </div>
                </div>
                <div class="w-full md:w-10/12 lg:w-1/2 text-center order-1 lg:order-2">
                    <img class="mb-5 lg:mb-0 w-full" src="placeholder.png">
                </div>
            </div>
        </div>
    </section>
    `;
}

export const RightText = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28 bg-gray-100">
            <div class="container px-4">
                <div class="flex justify-center items-center flex-wrap lg:flex-nowrap gap-x-8">
                    <div class="w-full md:w-10/12 lg:w-1/2 text-center">
                        <img class="mb-5 lg:mb-0 w-full" src="placeholder.png">
                    </div>
                    <div class="w-full md:w-10/12 lg:w-1/2 lg:text-xl">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize">Copy + Image Module</h2>
    
                        <p class="mb-5">This is the paragraph text of the section. It will usually be one big paragraph, or two separate
                            paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and
                            not just line breaks.</p>
    
                        <div class="text-center">
                            <a href="#offer-form"
                               class="inline-block w-full border-0 rounded-md mb-5 lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black">
                                CTA BUTTON TEXT
                            </a>
                            <p class="lg:text-xl w-10/12 mx-auto"> This is the descriptive CTA button which will probably be two lines long
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}