import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const fixedLimit = 20000; // fixed limit 
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const CURRENCY_LIST = [
        {
          symbol: "$",
          name: "$ Dollar"
        },
        {
          symbol: "£",
          name: "£ Pound"
        },
        {
          symbol: "€",
          name: "€ Euro"
        },
        {
          symbol: "₹",
          name: "₹ Rupee"
        }
      ];

    const handleBudgetChange = (event) => {
        const value = parseFloat(event.target.value);

        if (value > fixedLimit) {
            alert("Budget cannot exceed " + fixedLimit);
            setNewBudget(budget);
        } else if (value < totalExpenses) {
            alert("You cannot reduce the budget value lower than the spending");
            setNewBudget(totalExpenses);
        } else {
            setNewBudget(value);
            dispatch({ type: "SET_BUDGET", payload: value });
        }
    };

    const handleCurrencyChange = (event) => {
        const selectedCurrency = CURRENCY_LIST.find(c => c.symbol === event.target.value);
        if (selectedCurrency) {
            dispatch({ type: "CHG_CURRENCY", payload: selectedCurrency.symbol });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {newBudget} {currency}</span>
            <div>
                <label htmlFor='currency' style={{fontSize: '18px'}}>Currency: </label>
                <select id='currency' onChange={handleCurrencyChange} value={currency}>
                    {CURRENCY_LIST.map((curr) => (
                        <option key={curr.symbol} value={curr.symbol}>{curr.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <label style={{ fontSize: '15px', marginRight: '5px' }} htmlFor='cost'>Budget {currency}</label>
                <input 
                    required='required' 
                    type="number" 
                    step="10" 
                    value={newBudget} 
                    onChange={handleBudgetChange}
                    style={{ width: "100px" }}
                />
            </div>
        </div>
    );
};

export default Budget;
