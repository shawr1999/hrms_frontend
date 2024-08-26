import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function EditBranchPage() {
    const { branchId } = useParams();
    const navigate = useNavigate();
    const [branch, setBranch] = useState({
        branch_type: '',
        branch_country: '',
        branch_state: '',
        branch_district: '',
        branch_address: ''
    });

    useEffect(() => {
        if (branchId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/branch_view/${branchId}/`)
                .then(response => response.json())
                .then(data => setBranch(data))
                .catch(error => console.error('Error fetching branch data:', error));
        }
    }, [branchId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBranch(prevBranch => ({ ...prevBranch, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/branch_view/${branch.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branch)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Branch updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/branchs'); // Redirect to home page after clicking "OK"
                    }
                });
                // Redirect to home page after save
            })
            .catch(error => console.error('Error updating branch:', error));
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
            <h2>Edit Branch <span className='float-right'><button className='btn btn-primary' ><Link to="/branchs" className='text-white text-decoration-none'>Go Back</Link></button></span></h2> 
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Branch Type</label>
                    <input type="text" className="form-control" name="branch_type" value={branch.branch_type} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name="branch_country" value={branch.branch_country} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="branch_state" value={branch.branch_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="branch_district" value={branch.branch_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="branch_address" value={branch.branch_address} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
