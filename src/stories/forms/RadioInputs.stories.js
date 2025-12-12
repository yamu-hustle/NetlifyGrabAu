export default {
    title: 'Form Elements/Radio Inputs',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'These examples show a few different styles of radio buttons.'
            }
        }
    }
}

export const StackedWithBorderHighlight = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">

            <fieldset class="space-y-3">
                <legend class="sr-only">Delivery</legend>

                <div>
                    <label
                    for="DeliveryStandard"
                    class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                    <p class="text-gray-700 font-bold">Standard</p>

                    <p class="text-gray-900">Free</p>

                    <input
                        type="radio"
                        name="DeliveryOption"
                        value="DeliveryStandard"
                        id="DeliveryStandard"
                        class="sr-only"
                        checked
                    />
                    </label>
                </div>

                <div>
                    <label
                    for="DeliveryPriority"
                    class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                    <p class="text-gray-700 font-bold">Next Day</p>

                    <p class="text-gray-900">£9.99</p>

                    <input
                        type="radio"
                        name="DeliveryOption"
                        value="DeliveryPriority"
                        id="DeliveryPriority"
                        class="sr-only"
                    />
                    </label>
                </div>
            </fieldset>
        </div>
    `;
};

export const StackedWithIcon = () => {
    return `
    <div class="container mx-auto max-w-xl px-4 py-8 ">
        <fieldset class="space-y-3">
            <legend class="sr-only">Delivery</legend>

            <div>
                <label
                for="DeliveryStandard1"
                class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                <div>
                    <p class="text-gray-700 font-bold">Standard</p>

                    <p class="mt-1 text-gray-900">Free</p>
                </div>

                <input
                    type="radio"
                    name="DeliveryOption1"
                    value="DeliveryStandard1"
                    id="DeliveryStandard1"
                    class="size-5 border-gray-300 text-blue-500"
                    checked
                />
                </label>
            </div>

            <div>
                <label
                for="DeliveryPriority1"
                class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                >
                <div>
                    <p class="text-gray-700 font-bold">Next Day</p>

                    <p class="mt-1 text-gray-900">£9.99</p>
                </div>

                <input
                    type="radio"
                    name="DeliveryOption1"
                    value="DeliveryPriority1"
                    id="DeliveryPriority1"
                    class="size-5 border-gray-300 text-blue-500"
                />
                </label>
            </div>
            </fieldset>
        </div>
    `;
};

export const TabStyle = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
        <fieldset class="flex flex-wrap gap-3 justify-center">
            <legend class="sr-only">Color</legend>

            <div>
                <label
                for="Tab1"
                class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                >
                <input
                    type="radio"
                    name="TabOptions"
                    value="Tab1"
                    id="Tab1"
                    class="sr-only"
                    checked
                />

                <p class="text-sm font-medium">Texas Tea</p>
                </label>
            </div>

            <div>
                <label
                for="Tab2"
                class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                >
                <input type="radio" name="TabOptions" value="Tab2" id="Tab2" class="sr-only" />

                <p class="text-sm font-medium">Fiesta Red</p>
                </label>
            </div>

            <div>
                <label
                for="Tab3"
                class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                >
                <input type="radio" name="TabOptions" value="Tab3" id="Tab3" class="sr-only" />

                <p class="text-sm font-medium">Cobalt Blue</p>
                </label>
            </div>

            <div>
                <label
                for="Tab4"
                class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                >
                <input type="radio" name="TabOptions" value="Tab4" id="Tab4" class="sr-only" />

                <p class="text-sm font-medium">Goldtop</p>
                </label>
            </div>
            </fieldset>
            </div>
    `;
};

export const ColourCircleVariants = () => {
    return `
    <div class="container mx-auto max-w-xl px-4 py-8 ">
        <fieldset class="flex flex-wrap gap-3 justify-center">
            <legend class="sr-only">Color</legend>

            <label
                for="ColorBlack"
                class="block size-8 cursor-pointer rounded-full bg-black shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-black has-[:checked]:ring-offset-2"
            >
                <input
                type="radio"
                name="ColorOption"
                value="ColorBlack"
                id="ColorBlack"
                class="sr-only"
                checked
                />

                <span class="sr-only"> Texas Tea </span>
            </label>

            <label
                for="ColorRed"
                class="block size-8 cursor-pointer rounded-full bg-red-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-red-500 has-[:checked]:ring-offset-2"
            >
                <input type="radio" name="ColorOption" value="ColorRed" id="ColorRed" class="sr-only" />

                <span class="sr-only">Fiesta Red</span>
            </label>

            <label
                for="ColorBlue"
                class="block size-8 cursor-pointer rounded-full bg-blue-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-blue-500 has-[:checked]:ring-offset-2"
            >
                <input type="radio" name="ColorOption" value="ColorBlue" id="ColorBlue" class="sr-only" />

                <span class="sr-only">Cobalt Blue</span>
            </label>

            <label
                for="ColorGold"
                class="block size-8 cursor-pointer rounded-full bg-amber-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-amber-500 has-[:checked]:ring-offset-2"
            >
                <input type="radio" name="ColorOption" value="ColorGold" id="ColorGold" class="sr-only" />

                <span class="sr-only">Goldtop</span>
            </label>
            </fieldset>
        </div>
    `;
};

// export const StackedWithBorderHighlight = () => {
//     return `
//     `;
// };

