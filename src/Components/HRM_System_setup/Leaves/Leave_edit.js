import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Leaves from './Leaves';

export default function Leave_Edit() {
    const { leaveId } = useParams();
    const navigate = useNavigate();
    const [leave, setleave] = useState({
        leave_name: '',
        days_per_year: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (leaveId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/leave_view/${leaveId}/`)
                .then(response => response.json())
                .then(data => setleave(data))
                .catch(error => console.error('Error fetching leave data:', error));
        }
    }, [leaveId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setleave(prevleave => ({ ...prevleave, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/leave_view/${leave.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leave)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Leave updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/leave'); // Redirect to home page after clicking "OK"
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
                    <label className="form-label">Leave Name</label>
                    <input type="text" className="form-control" name="leave_name" value={leave.leave_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Days Per Year</label>
                    <input type="text" className="form-control" name="days_per_year" value={leave.days_per_year} onChange={handleChange} />
                </div>
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
