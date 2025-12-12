export default {
    title: 'Layouts/Steps',
}

export const Steps = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center mb-2">
                    <div class="lg:w-8/12">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize text-center">Steps/Blocks Section </h2>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center -mx-4 mb-5">
                    <div class="w-full md:w-1/2 lg:w-1/3 mb-5 px-4">
                        <div class="h-full shadow-lg p-4 lg:p-8 lg:text-xl">
                            <p class="mx-auto bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-5 lg:mb-8"> 1 </p>
                            <h4 class="text-xl lg:text-2xl text-center font-bold leading-tight mb-5"> Interdum et malesuada fames ac ante ipsum </h4>
                            <p> Quisque placerat eget ligula in dictum. Vestibulum pellentesque
                                dictum sem, in sagittis enim faucibus at. </p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mb-5 px-4">
                        <div class="h-full shadow-lg p-4 lg:p-8 lg:text-xl">
                            <p class="mx-auto bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-5 lg:mb-8"> 2 </p>
                            <h4 class="text-xl lg:text-2xl text-center font-bold leading-tight mb-5"> Curabitur ullamcorper tortor eget est imperdiet </h4>
                            <p> Vestibulum tincidunt mattis urna, ac aliquet nunc interdum et.
                                Curabitur magna eros, porttitor in purus vitae, vestibulum faucibus leo. </p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mb-5 px-4">
                        <div class="h-full shadow-lg p-4 lg:p-8 lg:text-xl">
                            <p class="mx-auto bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-5 lg:mb-8"> 3 </p>
                            <h4 class="text-xl lg:text-2xl text-center font-bold leading-tight mb-5"> Fusce interdum luctus est et elementum </h4>
                            <p> Quisque placerat eget ligula in dictum. Vestibulum pellentesque
                                dictum sem, in sagittis enim faucibus at. </p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mb-5 px-4">
                        <div class="h-full shadow-lg p-4 lg:p-8 lg:text-xl">
                            <p class="mx-auto bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-5 lg:mb-8"> 4 </p>
                            <h4 class="text-xl lg:text-2xl text-center font-bold leading-tight mb-5"> Donec tortor est ullamcorper vel </h4>
                            <p> Vestibulum tincidunt mattis urna, ac aliquet nunc interdum et.
                                Curabitur magna eros, porttitor in purus vitae, vestibulum faucibus leo. </p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mb-5 px-4">
                        <div class="h-full shadow-lg p-4 lg:p-8 lg:text-xl">
                            <p class="mx-auto bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-5 lg:mb-8"> 5 </p>
                            <h4 class="text-xl lg:text-2xl text-center font-bold leading-tight mb-5"> Pellentesque pulvinar dui viverra congue </h4>
                            <p> Quisque placerat eget ligula in dictum. Vestibulum pellentesque
                                dictum sem, in sagittis enim faucibus at. </p>
                        </div>
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
};