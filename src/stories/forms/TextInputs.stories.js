export default {
    title: 'Form Elements/Text Inputs',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'These examples show a few different styles of checkbox buttons.'
            }
        }
    }
}

export const TextInput = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <div>
            <label for="UserEmail" class="block text-xs font-medium text-gray-700"> Email </label>

            <input
                type="email"
                id="UserEmail"
                placeholder="john@rhcp.com"
                class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
            </div>
        </div>
    `;
};

export const SearchInput = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <div class="relative">
                <label for="Search" class="sr-only"> Search </label>

                <input
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                />

                <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" class="text-gray-600 hover:text-gray-700">
                    <span class="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    </button>
                </span>
            </div>
        </div>
    `;
};

export const FloatingLabel = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <label
            for="UserEmail"
            class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
            <input
                type="email"
                id="UserEmail"
                placeholder="Email"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span
                class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
            >
                Email
            </span>
            </label>
        </div>
    `;
};


export const FloatingLabelWithUnderlinedInput = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <label
            for="UserEmail"
            class="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
            >
            <input
                type="email"
                id="UserEmail"
                placeholder="Email"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span
                class="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
            >
                Email
            </span>
            </label>
        </div>
    `;
}