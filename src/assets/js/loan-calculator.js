export class LoanCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Define the template with slots. This is so we can project the component into the light DOM. The reason for this is because of component scoping styles, Tailwind CSS styles will not apply to the shadow dom.
        const template = document.createElement('template');
        template.innerHTML = `
            <slot></slot>
        `;

        // Attach the template content to the shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.calculateLoan = this.calculateLoan.bind(this); // Ensure proper context for the method
    }

    connectedCallback() {
        // Handle slot content change
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
            const calculateButton = this.querySelector('#calculate');
            calculateButton.addEventListener('click', this.calculateLoan);
        });
    }

    disconnectedCallback() {
        const calculateButton = this.querySelector('#calculate');
        if (calculateButton) {
            calculateButton.removeEventListener('click', this.calculateLoan);
        }
    }

    formatCurrency(number) {
        const roundedNumber = Math.round(number);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0, // No decimal places
            maximumFractionDigits: 0, // No decimal places
        }).format(roundedNumber);
    }

    calculateLoan() {
        const amount = parseFloat(this.querySelector('#amount').value);
        const interest = parseFloat(this.querySelector('#interest').value);

        // Check if the input for years is a text input or radio button, and set the value accordingly
        let years;
        const yearsInput = this.querySelector('#years');
        if (yearsInput) {
            years = parseFloat(yearsInput.value);
        } else {
            const selectedYearRadio = this.querySelector('input[name="years"]:checked');
            years = selectedYearRadio ? parseFloat(selectedYearRadio.value) : NaN;
        }

        const errorMessage = this.querySelector('#error-message');
        
        if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
            errorMessage.innerHTML = `<p>Please enter numbers only.</p>`;
            return;
        }
        
        const monthlyInterestRate = interest / 100 / 12;
        const numberOfPayments = years * 12;
        const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - amount;
        
        const resultElement = this.querySelector('#loan-calculation-results');
        resultElement.classList.add('js-display-results');
        resultElement.querySelector('#monthly-repayments').innerHTML = this.formatCurrency(monthlyPayment);
        resultElement.querySelector('#total-payments').innerHTML = this.formatCurrency(totalPayment);
        resultElement.querySelector('#total-interest').innerHTML = this.formatCurrency(totalInterest);
    }
}

if (!customElements.get('loan-calculator')) {
    customElements.define('loan-calculator', LoanCalculator);
}
