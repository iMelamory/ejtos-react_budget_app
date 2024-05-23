import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const fixedLimit = 20000; // fixed limit 
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    
        
    const handleBudgetChange = (event) => {
    
    if (newBudget > fixedLimit) {
        alert("Budget cannot exceed "+" "+fixedLimit);
        setNewBudget(budget);
    } else if (newBudget < totalExpenses) {
        alert("You cannot reduce the budget value lower than the spending");
        setNewBudget(totalExpenses);
    } else {
        setNewBudget(event.target.value)
    }
}
    return (
<div className='alert alert-secondary'>
<span>Budget: £{budget}</span>
<input required='required' type="number" step="10" value={newBudget} onChange={(event) => handleBudgetChange(event)}></input>
</div>
    );
};
export default Budget;