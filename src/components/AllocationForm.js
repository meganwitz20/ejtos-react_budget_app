import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

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

const AllocationForm = (props) => {
    const { dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Added state for selected currency

    const submitEvent = async () => {
        if (cost > remaining) {
            alert("The value cannot exceed remaining funds £" + remaining);
            setCost("");
            return;
        }

        // Convert the cost to USD
        const costInUSD = await convertCurrency(cost, selectedCurrency, 'USD');

        const expense = {
            name: name,
            cost: parseInt(costInUSD), // Use the converted cost in USD
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing">Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                        <option value="Admin" name="admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    {/* Dropdown for selecting currency */}
                    <select className="custom-select" id="inputGroupSelect03" onChange={(event) => setSelectedCurrency(event.target.value)}>
                        {Object.keys(exchangeRates).map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>

                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem', size: 10 }}
                        onChange={(event) => setCost(event.target.value)}>
                    </input>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;


