import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Transfer_balance from './Transfer_balance';

export default function Transfer_balance_Edit() {
    const { Transfer_balanceId } = useParams();
    const navigate = useNavigate();
    const [Transfer_balance, setTransfer_balance] = useState({
            From_account:'',
            To_account:'',
            Date:'',
            Amount:'',
            Payment_method:'',
            Ref:'',
            Description:'',
        // required_feild: ''
        // Last_name_state: '',
        // Last_name_district: '',
        // Last_name_Email: ''
    });

    useEffect(() => {
        if (Transfer_balanceId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/transfer-balances/${Transfer_balanceId}/`)
                .then(response => response.json())
                .then(data => setTransfer_balance(data))
                .catch(error => console.error('Error fetching Transfer_balance data:', error));
        }
    }, [Transfer_balanceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer_balance(prevTransfer_balance => ({ ...prevTransfer_balance, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/transfer-balances/${Transfer_balance.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Transfer_balance)
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
                        navigate('/Transfer_balance'); // Redirect to home page after clicking "OK"
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
            <h2>Edit transfer-balances</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="From_account" value={Transfer_balance.From_account} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="To_account" value={Transfer_balance.To_account} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Date" value={Transfer_balance.Date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Amount" value={Transfer_balance.Amount} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Payment_method" value={Transfer_balance.Payment_method} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Ref" value={Transfer_balance.Ref} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Transfer_balance.Description} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Email" value={Transfer_balance.Email} onChange={handleChange} />
                </div> */}
                
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
