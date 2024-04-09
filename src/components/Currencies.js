import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    // Hardcoded exchange rates
    const [exchangeRates, setExchangeRates] = useState(null);
    const [currencySymbols, setCurrencySymbols] = useState(null);

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                const data = await response.json();
                setExchangeRates(data.rates);
                setCurrencySymbols({
                    USD: '$',
                    EUR: '€',
                    INR: '₹',
                    GBP: '£',
                    // Add other currency symbols here
                });
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, [fromCurrency]);

    useEffect(() => {
        if (exchangeRates && exchangeRates[toCurrency]) {
            const converted = amount * exchangeRates[toCurrency];
            setConvertedAmount(converted.toFixed(2));
        }
    }, [amount, exchangeRates, toCurrency]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    return (
        <div>
            <h2>Currency Converter</h2>
            <div>
                <input type="number" value={amount} onChange={handleAmountChange} />
                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    {currencySymbols && Object.keys(currencySymbols).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <span>to</span>
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    {currencySymbols && Object.keys(currencySymbols).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Converted Amount: {amount} {currencySymbols && currencySymbols[fromCurrency]} equals {convertedAmount} {currencySymbols && currencySymbols[toCurrency]}</p>
            </div>
        </div>
    );
};

export default CurrencyConverter;


