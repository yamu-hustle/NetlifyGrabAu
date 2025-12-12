export default {
    title: 'Design Elements/Buttons',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Sample button styles.'
            }
        }
    }
};

export const Button = () => {
    return `
        <div class="container p-4 flex justify-center">
            <div class="lg:w-1/2 text-center">
                <a href="#offer-form" class="w-full block mb-4 text-center text-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    CTA Button Text
                </a>
                <p class="mx-auto"> This is the descriptive CTA button which will probably be two lines long
                </p>
            </div>
        </div>
    `;
}