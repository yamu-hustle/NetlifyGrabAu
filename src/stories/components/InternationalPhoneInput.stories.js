import initTelInputs from '../../assets/js/intl-tel-input.js';
import 'intl-tel-input/build/css/intlTelInput.css';

export default {
    title: 'Components/International Phone Input',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The international phone input component allows users to enter international phone numbers using international formatting. It uses the `intl-tel-input` library to handle the international phone number formatting and validation.',
            },
        },
    },
}

export const InternationalPhoneInput = () => {
    setTimeout(initTelInputs, 0);

    return `
        <div class="container px-4">
            <div class="flex flex-wrap justify-center mb-5">    
                <div class="w-full md:w-8/12 lg:w-4/12">
                    <div class="single-column__form">
                        <form method="POST" action="" id="ebook-form" class="kk-validation kk-showthankyou mt-5">

                            <div class="mb-4 relative">
                                <label class="sr-only" for="phone">Phone Number:</label>
                                <input type="tel" class="text-lg appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline intl-phone" id="phone" name="phone" placeholder="Phone Number*" required />
                            </div>

                            <input type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" value="Get My Free Ebook">

                            <div class="form-messages mt-5  [&.error]:text-red-500 [&.success]:text-green-600 empty:hidden" ></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
};
