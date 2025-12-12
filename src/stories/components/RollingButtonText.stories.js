import rolodex from "../../assets/js/rolodex.js";

export default {
    title: 'Components/Rolling Button Text',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `Rolling Button Text` component displays a list of text that scrolls vertically as a timed event. Text in this component should be short and concise, and should be used to highlight important information or actions.',
            },
        },
    },
    argTypes: {
        duration: {
            control: {
                type: 'number',
            },
            defaultValue: 2000, // Default value for the duration in milliseconds
            description: 'Duration of the visible text in milliseconds',
        },
    },
};

const Template = ({ duration }) => {
    setTimeout(() => {
        rolodex(duration); // This function should be exported from your `rolodex.js`
    }, 0); // Executing after the current call stack clears, giving time for the DOM to update

    return `
        <div class="container p-4">
            <div data-rolodex class="relative flex items-center justify-center w-full h-8 mt-5 text-center lg:text-xl">
                <p class="transition-all duration-[500ms] opacity-100 leading-[1] absolute translate-y-0 translate-x-0 text-center m-0 whitespace-nowrap flex items-center justify-center [&.last]:opacity-0 [&.last]:-translate-y-full [&.next]:opacity-0 [&.next]:translate-y-full">  
                    <img src="icon-check.svg" class="w-5 min-w-5 relative top-[-1px] mr-2"/> Sed venenatis
                </p>
                <p class="transition-all duration-[500ms] next opacity-100 leading-[1] absolute translate-y-0 translate-x-0 text-center m-0 whitespace-nowrap flex items-center justify-center [&.last]:opacity-0 [&.last]:-translate-y-full [&.next]:opacity-0 [&.next]:translate-y-full">
                    <img src="icon-check.svg" class="w-5 min-w-5 relative top-[-1px] mr-2"/> Ut volutpat diam
                </p>
                <p class="transition-all duration-[500ms] last opacity-100 leading-[1] absolute translate-y-0 translate-x-0 text-center m-0 whitespace-nowrap flex items-center justify-center [&.last]:opacity-0 [&.last]:-translate-y-full [&.next]:opacity-0 [&.next]:translate-y-full">
                    <img src="icon-check.svg" class="w-5 min-w-5 relative top-[-1px] mr-2"/> Mauris vulputate metus
                </p>
                <p class="transition-all duration-[500ms] last opacity-100 leading-[1] absolute translate-y-0 translate-x-0 text-center m-0 whitespace-nowrap flex items-center justify-center [&.last]:opacity-0 [&.last]:-translate-y-full [&.next]:opacity-0 [&.next]:translate-y-full">
                    <img src="icon-check.svg" class="w-5 min-w-5 relative top-[-1px] mr-2"/> Ut volutpat diam
                </p>
            </div>
        </div>
    `;
};

export const RollingButtonText = Template.bind({});
RollingButtonText.args = {
    duration: 2000, // Default value for the duration in milliseconds
};
