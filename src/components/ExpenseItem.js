import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { FaPlusCircle   } from 'react-icons/fa';
import { FaMinusCircle   } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
        
    
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }
        const decreaseAllocation = name => {
            dispatch({
                type: 'RED_EXPENSE',
                payload: { name, cost: 10 }
            });
        }
    

    return (
        <tr>
        <td>{props.name}</td>
        <td><span style={{ fontSize: '18px' }}>{currency}</span>{props.cost}</td>
        <td><button style={{
                border: 'none', // Remove button border
                backgroundColor: 'transparent'}} onClick={event=> increaseAllocation(props.name)}><FaPlusCircle size={30} color="#4fac5c" /></button></td>
        <td><button style={{
                border: 'none', // Remove button border
                backgroundColor: 'transparent'}} onClick={event=>decreaseAllocation(props.name)}><FaMinusCircle size={30} color="#FF0000" /></button></td>
        
        </tr>
    );
};

export default ExpenseItem;
