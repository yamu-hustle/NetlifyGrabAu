export default {
    title: 'Form Elements/Checkbox Inputs',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'These examples show a few different styles of checkbox buttons.'
            }
        }
    }
}

export const BasicCheckbox = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <fieldset>
            <legend class="sr-only">Checkboxes</legend>

            <div class="space-y-2">
                <label for="Option1" class="flex cursor-pointer items-start gap-4">
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option1" />
                </div>

                <div>
                    <strong class="font-medium text-gray-900"> John Clapton </strong>
                </div>
                </label>

                <label for="Option2" class="flex cursor-pointer items-start gap-4">
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option2" />
                </div>

                <div>
                    <strong class="font-medium text-gray-900"> Peter Mayer </strong>
                </div>
                </label>

                <label for="Option3" class="flex cursor-pointer items-start gap-4">
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option3" />
                </div>

                <div>
                    <strong class="font-medium text-gray-900"> Eric King </strong>
                </div>
                </label>
            </div>
            </fieldset>
        </div>
    `;
};

export const GroupedLabelAndHighlighted = () => {
    return `
        <div class="container mx-auto max-w-xl px-4 py-8 ">
            <fieldset>
            <legend class="sr-only">Checkboxes</legend>

            <div class="space-y-2">
                <label
                for="Option1-1"
                class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option1-1" />
                </div>

                <div>
                    <strong class="font-medium text-gray-900"> John Clapton </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                </label>

                <label
                for="Option2-2"
                class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option2-2" />
                </div>

                <div>
                    <strong class="font-medium text-gray-900"> Peter Mayer </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>
                </label>

                <label
                for="Option3-3"
                class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                <div class="flex items-center">
                    &#8203;
                    <input type="checkbox" class="size-4 rounded border-gray-300" id="Option3-3" />
                </div>

                <div>
                    <strong class="text-pretty font-medium text-gray-900"> Eric King </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                </label>
            </div>
        </fieldset>
    </div>
    `;
};
