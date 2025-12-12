export default {
    title: 'Layouts/eBook Hero',
    argTypes: {
        type: {
            control: {type: 'select'},
            options: ['left', 'right'],
        },
    }
}

export const LeftForm = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center items-center -mx-4">
                    <div class="w-full md:w-10/12 lg:w-1/2 order-2 lg:order-1 lg:text-xl px-4">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize">eBook Form Module, Image Right</h2>
    
                        <p>This is the paragraph text of the section. It will usually be one big paragraph, or two separate paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and not just line breaks.</p>
    
                        <form method="POST" action="" id="ebook-form" class="kk-validation kk-showthankyou mt-5">
                            <div class="mb-4 relative">
                                <label class="sr-only" for="name">Full Name:</label>
                                <span class="w-5 absolute top-4 left-5">
                                    <img class="w-full" src="icon-name.svg"/>
                                </span>
                                <input type="text" class="h-14 w-full bg-white text-black border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="name" id="name" placeholder="Name" required />
                            </div>
    
                            <div class="mb-4 relative">
                                <label class="sr-only" for="email">Email Address:</label>
                                <span class="w-5 absolute top-5 left-5">
                                    <img class="img-fluid view-animation" src="icon-email.svg"/>
                                </span>
                                <input type="email" class="h-14 w-full bg-white text-black border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" id="email" name="email" placeholder="Email"
                                       required />
                            </div>
    
                            <input type="submit" class="inline-block w-full border-0 rounded-md lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black" value="Get My Free Ebook">
    
                            <div class="form-messages mt-5  [&.error]:text-red-500 [&.success]:text-green-600 empty:hidden"
                                 data-success="Success! Your eBook is being sent to your inbox!"></div>
                        </form>
    
                    </div>
                    <div class="w-full md:w-10/12 lg:w-1/2 text-center order-1 lg:order-2 px-4">
                        <img class="mb-5 lg:mb-0" src="placeholder.png">
                    </div>
                </div>
            </div>
        </section>
    `;
};

export const RightForm = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28 bg-gray-100">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center items-center -mx-4">
                    <div class="w-full md:w-10/12 lg:w-1/2 text-center px-4">
                        <img class="mb-5 lg:mb-0" src="placeholder.png">
                    </div>
                    <div class="w-full md:w-10/12 lg:w-1/2 lg:text-xl px-4">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize">eBook Form Module, Image Left</h2>
    
                        <p>This is the paragraph text of the section. It will usually be one big paragraph, or two separate paragraphs. Make sure you separate the different blocks of text with separate paragraph tags and not just line breaks.</p>
    
                        <form method="POST" action="" id="ebook-form" class="kk-validation kk-showthankyou mt-5">
                            <div class="mb-4 relative">
                                <label class="sr-only" for="name">Full Name:</label>
                                <span class="w-5 absolute top-4 left-5">
                                    <img class="w-full" src="icon-name.svg"/>
                                </span>
                                <input type="text" class="h-14 w-full bg-white text-black border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="name" id="name" placeholder="Name" required />
                            </div>
    
                            <div class="mb-4 relative">
                                <label class="sr-only" for="email">Email Address:</label>
                                <span class="w-5 absolute top-5 left-5">
                                    <img class="img-fluid view-animation" src="icon-email.svg"/>
                                </span>
                                <input type="email" class="h-14 w-full bg-white text-black border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" id="email" name="email" placeholder="Email"
                                       required />
                            </div>
    
                            <input type="submit" class="inline-block w-full border-0 rounded-md lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black" value="Get My Free Ebook">
    
                            <div class="form-messages mt-5  [&.error]:text-red-500 [&.success]:text-green-600 empty:hidden"
                                 data-success="Success! Your eBook is being sent to your inbox!"></div>
                        </form>
    
                    </div>
                </div>
            </div>
        </section>
    `;
};
