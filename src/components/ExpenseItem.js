import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10, // Decrement by 10
        };

        dispatch({
            type: 'RED_EXPENSE', // Assuming 'RED_EXPENSE' represents reducing expense
            payload: expense
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>£{props.cost}</td>
            <td><button onClick={() => decreaseAllocation(props.name)}>-</button></td> {/* Button to decrease */}
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense} /></td>
        </tr>
    );
};

export default ExpenseItem;
