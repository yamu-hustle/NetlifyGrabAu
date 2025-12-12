export default {
    title: 'Layouts/Image Grid',
    render: (args) => {

    }
}

export const ImageGrid = () => {
    return `
        <section class="bg-gray-100 py-16">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center mb-4">
                    <div class="col-sm-12">
                        <h2 class="text-3xl lg:text-4xl mb-4 leading-tight font-bold capitalize text-center">
                            Image Grid
                        </h2>
                    </div>
                </div>
    
                <div class="flex flex-wrap justify-center items-center -mx-2">
                    <div class="w-full xl:w-10/12">
                        <div class="flex flex-wrap mb-4 md:mb-0">
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                            <div class="w-1/2 lg:w-1/4 mb-4 px-2">
                                <img class="w-full" src="placeholder.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};
