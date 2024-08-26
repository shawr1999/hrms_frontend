import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Expense from './Expense';

export default function Expense_Edit() {
    const { ExpenseId } = useParams();
    const navigate = useNavigate();
    const [Expense, setExpense] = useState({
            Account:'',
            Amount:'',
            Date:'',
            Category:'',
            Payee:'',
            Payment_method:'',
            Ref:'',
        Description: ''
        // Last_name_state: '',
        // Last_name_district: '',
        // Last_name_Email: ''
    });

    useEffect(() => {
        if (ExpenseId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/expenses/${ExpenseId}/`)
                .then(response => response.json())
                .then(data => setExpense(data))
                .catch(error => console.error('Error fetching Expense data:', error));
        }
    }, [ExpenseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prevExpense => ({ ...prevExpense, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/expenses/${Expense.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Expense)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Document type upLast_named successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Expense'); // Redirect to home page after clicking "OK"
                    }
                });
                // Redirect to home page after save
            })
            .catch(error => console.error('Error updating department:', error));
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
            <h2>Edit expenses</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Account" value={Expense.Account} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Amount" value={Expense.Amount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Date" value={Expense.Date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Category" value={Expense.Category} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Payee" value={Expense.Payee} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Payment_method" value={Expense.Payment_method} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Ref" value={Expense.Ref} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Expense.Description} onChange={handleChange} />
                </div>
                
                {/* <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="Last_name_state" value={Last_name.Last_name_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="Last_name_district" value={Last_name.Last_name_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" name="Last_name_Email" value={Last_name.Last_name_Email} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
