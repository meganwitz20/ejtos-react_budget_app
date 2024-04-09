// Hardcoded exchange rates
const exchangeRates = {
    'USD': 1,
    'EUR': 0.84, // 1 USD = 0.84 EUR
    'INR': 74.93, // 1 USD = 74.93 INR
    'GBP': 0.73 // 1 USD = 0.73 GBP
};

// Function to convert currency
function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!(fromCurrency in exchangeRates) || !(toCurrency in exchangeRates)) {
        console.error('Unsupported currency.');
        return null;
    }

    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    return convertedAmount;
}

// Currency symbols object
const currencySymbols = {
    USD: '$',
    EUR: '€',
    INR: '₹',
    GBP: '£'
};

// Example usage
const amount = 100; // Amount to convert
const fromCurrency = 'USD';
const toCurrency = 'EUR';

const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
console.log(`${amount} ${currencySymbols[fromCurrency]} equals ${convertedAmount.toFixed(2)} ${currencySymbols[toCurrency]}`);

