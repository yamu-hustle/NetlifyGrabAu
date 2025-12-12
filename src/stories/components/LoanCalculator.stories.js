
import { LoanCalculator } from '../../assets/js/loan-calculator.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
	title: 'Components/Loan Calculator',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					`
This component allows users to calculate the monthly payments, total payments, and interest for a loan.

**Required Inputs:**
- Loan amount
- Interest rate
- Loan term

Any of these fields can be set to a static value and hidden from the user - for example, if loans are only available at the one interest rate or period, we can hide these fields and display them in small print on the results instead.

*Note: Loan calculations round to the nearest whole dollar amount by default. This can be changed by setting the fixed-point precision of the number final output*
                    
*Note: The preview of this component on the docs page is a little buggy - to see the full functionality, please click the loan calculator preview itself*

## How We Calculate Monthly Payments, Total Payments, and Interest
                    
### Monthly Payment Calculation:

We start with the loan amount (how much is borrowed), the annual interest rate, and the number of years it will take to repay the loan.

Step 1: Convert the annual interest rate to a monthly rate by dividing it by 12.

Step 2: Convert the loan term in years to the number of monthly payments by multiplying it by 12.

Step 3: Use these values in a standard formula to calculate the monthly payment. This formula accounts for both the principal (loan amount) and the interest.

### Total Payment Calculation:

Once we have the monthly payment, we simply multiply it by the total number of monthly payments to get the total amount that will be paid over the life of the loan.

### Total Interest Calculation:

To find out how much extra is pay due to interest, we subtract the original loan amount from the total payment. This difference is the total interest paid.`
			},
		},
	},
}

export const BasicLoanCalculator = () => {
    setTimeout(() => {
        const element = document.getElementById('loan-calculator');
        new LoanCalculator(element);
    }, 0) // Executing after the current call stack clears, giving time for the DOM to update

    return `
        <div class="container py-16 px-5">
            <loan-calculator>
                <div class="flex flex-col md:flex-row bg-white rounded-lg shadow-lg space-y-6">
                    <div class="w-full md:w-1/2 p-12">
                        <h1 class="text-3xl font-bold leading-9	text-gray-800 mb-6">Get Started With Our Extremely Easy <span class="text-violet-600">Loan Calculator</span></h1>
                        <div class="mb-4">
                            <label for="amount" class="block text-sm font-medium text-gray-600 mb-2">Loan Amount</label>
                            <input type="number" id="amount" class="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter loan amount">
                        </div>
                        <div class="mb-4">
                            <label for="interest" class="block text-sm font-medium text-gray-600 mb-2">Interest Rate (%)</label>
                            <input type="number" id="interest" class="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter interest rate">
                        </div>
                        <div class="mb-4">
                            <label for="interest" class="block text-sm font-medium text-gray-600 mb-2">Length of Loan</label>
                            <fieldset class="inline-flex w-full overflow-hidden rounded-md border bg-white shadow-sm">
                                <label for="years-5" class="inline-block cursor-pointer grow border-gray-300 text-center border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 has-[:checked]:bg-gray-100 focus:relative">
                                    <input type="radio" name="years" value="5" id="years-5" class="sr-only" checked />
                                    <p class="text-sm font-medium">5 Years</p>
                                </label>
                                <label for="years-10" class="inline-block cursor-pointer grow border-gray-300 text-center border-e px-4 py-2 text-gray-700 hover:bg-gray-50 has-[:checked]:bg-gray-100 focus:relative">
                                    <input type="radio" name="years" value="10" id="years-10" class="sr-only" />
                                    <p class="text-sm font-medium">10 Years</p>
                                </label>
                                <label for="years-15" class="inline-block cursor-pointer grow border-gray-300 text-center border-e px-4 py-2 text-gray-700 hover:bg-gray-50 has-[:checked]:bg-gray-100 focus:relative">
                                    <input type="radio" name="years" value="15" id="years-15" class="sr-only" />
                                    <p class="text-sm font-medium">15 Years</p>
                                </label>
                                <label for="years-30" class="inline-block cursor-pointer grow border-gray-300 text-center px-4 py-2 text-gray-700 hover:bg-gray-50 has-[:checked]:bg-gray-100 focus:relative">
                                    <input type="radio" name="years" value="30" id="years-30" class="sr-only" />
                                    <p class="text-sm font-medium">30 Years</p>
                                </label>
                            </fieldset>
                        </div>

                        <button id="calculate" class="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Calculate</button>
                        <div id="error-message" class="text-red-500 text-sm mt-2"></div>
                    </div>

                    <div id="loan-calculation-results" class="group w-full md:w-1/2 flex flex-col justify-center align-center grow mt-4 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-r-lg bg-indigo-600 bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-12">
                        <p class="mb-2 text-violet-300">
                            Monthly Repayments:
                        </p>
                        <p class="text-6xl font-bold text-violet-500 group-[.js-display-results]:text-white">
                            <span id="monthly-repayments"> -</span>
                        </p>

                        <div class="flex mt-5">
                            <div class="w-1/2">
                                <small class="text-violet-400 mr-2">
                                    Total Payments:
                                </small>
                                <p class="font-bold text-violet-500 group-[.js-display-results]:text-white">
                                    <span id="total-payments"> -</span>
                                </p>
                            </div>
                            <div class="m-1/2">
                                <small class="text-violet-400 mr-2">
                                    Total Interest:
                                </small>
                                <p class="font-bold text-violet-500 group-[.js-display-results]:text-white">
                                   <span id="total-interest"> -</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </loan-calculator>
        </div>
    `;
};
