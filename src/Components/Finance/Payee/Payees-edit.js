import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Payee from './Payee';

export default function Payee_Edit() {
    const { PayeeId } = useParams();
    const navigate = useNavigate();
    const [Payee, setPayee] = useState({
            Name:'',
            Number:'',
            // End:'',
            // Interview_time:'',
            // Comment:'',
            // Due:'',
            // Description:'',
        // required_feild: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (PayeeId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/payees/${PayeeId}/`)
                .then(response => response.json())
                .then(data => setPayee(data))
                .catch(error => console.error('Error fetching Payee data:', error));
        }
    }, [PayeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayee(prevPayee => ({ ...prevPayee, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/payees/${Payee.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Payee)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Document type updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Payee'); // Redirect to home page after clicking "OK"
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
            <h2>Edit department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Name" value={Payee.Name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Number" value={Payee.Number} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="End" value={Payee.End} onChange={handleChange} />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Interview_time" value={Payee.Interview_time} onChange={handleChange} />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Comment" value={Payee.Comment} onChange={handleChange} />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Due" value={Payee.Due} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Payee.Description} onChange={handleChange} />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Payee.Description} onChange={handleChange} />
                </div> */}
                
                {/* <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="department_state" value={department.department_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="department_district" value={department.department_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="department_address" value={department.department_address} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
