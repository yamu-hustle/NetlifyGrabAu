export default {
    title: 'Layouts/Featured In'
}

export const FeaturedIn = () => {
    return `
        <section class="bg-slate-200 py-16 relative">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center items-center ">
                    <div class="w-full xl:w-2/12">
                        <h5 class="text-center mb-5 xl:mb-0 md:text-xl font-bold">Featured In:</h5>
                    </div>
    
                    <div class="w-full xl:w-10/12 ">
                        <div class="flex flex-wrap justify-center gap-x-4 sm:gap-x-5">
                            <div class="flex-1 mb-4 sm:mb-0">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                            <div class="flex-1 mb-4 sm:mb-0">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                            <div class="flex-1 mb-4 sm:mb-0">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                            <div class="w-full block sm:hidden"></div>
                            <div class="flex-1 ">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                            <div class="flex-1">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                            <div class="flex-1">
                                <img class="block w-full mx-auto" src="placeholder.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
