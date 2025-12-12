
export default {
    title: 'Components/Marquee',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Scrolling marquee input example.'
            }
        }
    }
};

export const Marquee = () => {
    return `
        <section class="py-4 overflow-hidden select-none">    
            <div class="flex lg:text-xl">
                <ul class="p-0 my-1 flex items-center justify-around min-w-full animate-marqueereverse shrink-0">
                    <li class="bg-black px-7 py-2 text-white">
                        Sed venenatis
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Mauris vulputate metus et
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                </ul>
                <ul class="p-0 my-1 flex items-center justify-around min-w-full animate-marqueereverse shrink-0">
                    <li class="bg-black px-7 py-2 text-white">
                        Sed venenatis
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Mauris vulputate metus et
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                </ul>
            </div>
    
            <div class="flex lg:text-xl">
                <ul class="p-0 my-1 flex items-center justify-around min-w-full animate-marquee shrink-0">
                    <li class="bg-black px-7 py-2 text-white">
                        Sed venenatis
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Mauris vulputate metus et
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                </ul>
                <ul class="p-0 my-1 flex items-center justify-around min-w-full animate-marquee shrink-0">
                    <li class="bg-black px-7 py-2 text-white">
                        Sed venenatis
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Mauris vulputate metus et
                    </li>
                    <li class="bg-black px-7 py-2 text-white">
                        Ut volutpat diam
                    </li>
                </ul>
            </div>
        </section>
    `;
}