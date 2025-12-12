export default {
    title: 'Layouts/Pricing Table',
    tags: ['autodocs']
}


export const TwoColumnWithDescription = () => {
    return `
        <div class="bg-white">
        <div class="container px-6 py-8 mx-auto">
            <div class="xl:items-center xl:-mx-8 xl:flex">
                <div class="flex flex-col items-center xl:items-start xl:mx-8">
                    <h1 class="text-2xl font-medium text-gray-800 capitalize lg:text-3xl">Our Pricing Plan</h1>

                    <div class="mt-4">
                        <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                        <span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                        <span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                    </div>

                    <p class="mt-4 font-medium text-gray-500">
                        You can get All Access by selecting your plan!
                    </p>

                    <a href="#" class="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize hover:underline hover:text-blue-600">
                        <span class="mx-1">read more</span>
                        <svg class="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>

                <div class="flex-1 xl:mx-8">
                    <div class="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                        <div class="max-w-sm mx-auto border rounded-lg md:mx-4">
                            <div class="p-6">
                                <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-2xl">Essential</h1>

                                <p class="mt-4 text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                                </p>

                                <h2 class="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">$3.00 <span class="text-base font-medium">/Month</span></h2>

                                <p class="mt-1 text-gray-500">
                                    Yearly payment
                                </p>

                                <button class="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                    Start Now
                                </button>
                            </div>

                            <hr class="border-gray-200">

                            <div class="p-6">
                                <h1 class="text-lg font-medium text-gray-700 capitalize lg:text-xl">What's included:</h1>

                                <div class="mt-8 space-y-4">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">All limited links</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Own analytics platform</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Chat support</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Optimize hashtags</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Mobile app</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Unlimited users</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="max-w-sm mx-auto border rounded-lg md:mx-4">
                            <div class="p-6">
                                <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-2xl">Premium</h1>

                                <p class="mt-4 text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                                </p>

                                <h2 class="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">$50.00 <span class="text-base font-medium">/life time</span></h2>

                                <p class="mt-1 text-gray-500">
                                    One time payment
                                </p>

                                <button class="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                    Start Now
                                </button>
                            </div>

                            <hr class="border-gray-200">

                            <div class="p-6">
                                <h1 class="text-lg font-medium text-gray-700 capitalize lg:text-xl">What's included:</h1>

                                <div class="mt-8 space-y-4">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">All limited links</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Own analytics platform</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Chat support</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Optimize hashtags</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Mobile app</span>
                                    </div>

                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="mx-4 text-gray-700">Unlimited users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export const TwoColumn = () => {
    return `
        <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                <div
                class="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12"
                >
                <div class="text-center">
                    <h2 class="text-lg font-medium text-gray-900">
                    Pro
                    <span class="sr-only">Plan</span>
                    </h2>

                    <p class="mt-2 sm:mt-4">
                    <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 30$ </strong>

                    <span class="text-sm font-medium text-gray-700">/month</span>
                    </p>
                </div>

                <ul class="mt-6 space-y-2">
                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 20 users included </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 5GB of storage </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Email support </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Help center access </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Phone support </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Community access </span>
                    </li>
                </ul>

                <a
                    href="#"
                    class="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
                >
                    Get Started
                </a>
                </div>

                <div class="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
                <div class="text-center">
                    <h2 class="text-lg font-medium text-gray-900">
                    Starter
                    <span class="sr-only">Plan</span>
                    </h2>

                    <p class="mt-2 sm:mt-4">
                    <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 20$ </strong>

                    <span class="text-sm font-medium text-gray-700">/month</span>
                    </p>
                </div>

                <ul class="mt-6 space-y-2">
                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 10 users included </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 2GB of storage </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Email support </span>
                    </li>

                    <li class="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-indigo-700"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Help center access </span>
                    </li>
                </ul>

                <a
                    href="#"
                    class="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                    Get Started
                </a>
                </div>
            </div>
        </div>
    `;
};


export const ThreeColumn = () => {
    return `
    <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            <div class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div class="p-6 sm:px-8">
                <h2 class="text-lg font-medium text-gray-900">
                Starter
                <span class="sr-only">Plan</span>
                </h2>

                <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <p class="mt-2 sm:mt-4">
                <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 20$ </strong>

                <span class="text-sm font-medium text-gray-700">/month</span>
                </p>

                <a
                class="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                href="#"
                >
                Get Started
                </a>
            </div>

            <div class="p-6 sm:px-8">
                <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                <ul class="mt-2 space-y-2 sm:mt-4">
                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 10 users </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 2GB of storage </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Email support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-red-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span class="text-gray-700"> Help center access </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-red-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span class="text-gray-700"> Phone support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-red-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span class="text-gray-700"> Community access </span>
                </li>
                </ul>
            </div>
            </div>

            <div class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div class="p-6 sm:px-8">
                <h2 class="text-lg font-medium text-gray-900">
                Pro
                <span class="sr-only">Plan</span>
                </h2>

                <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <p class="mt-2 sm:mt-4">
                <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 30$ </strong>

                <span class="text-sm font-medium text-gray-700">/month</span>
                </p>

                <a
                class="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                href="#"
                >
                Get Started
                </a>
            </div>

            <div class="p-6 sm:px-8">
                <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                <ul class="mt-2 space-y-2 sm:mt-4">
                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 20 users </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 5GB of storage </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Email support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Help center access </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-red-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span class="text-gray-700"> Phone support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-red-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span class="text-gray-700"> Community access </span>
                </li>
                </ul>
            </div>
            </div>

            <div class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div class="p-6 sm:px-8">
                <h2 class="text-lg font-medium text-gray-900">
                Enterprise
                <span class="sr-only">Plan</span>
                </h2>

                <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <p class="mt-2 sm:mt-4">
                <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 100$ </strong>

                <span class="text-sm font-medium text-gray-700">/month</span>
                </p>

                <a
                class="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                href="#"
                >
                Get Started
                </a>
            </div>

            <div class="p-6 sm:px-8">
                <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                <ul class="mt-2 space-y-2 sm:mt-4">
                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 50 users </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> 20GB of storage </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Email support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Help center access </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Phone support </span>
                </li>

                <li class="flex items-center gap-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 text-indigo-700"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span class="text-gray-700"> Community access </span>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    `;
};

