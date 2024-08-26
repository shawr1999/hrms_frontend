import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Department_Edit() {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const [department, setdepartment] = useState({
        department_category: '',
        department_name: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (departmentId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/department_view/${departmentId}/`)
                .then(response => response.json())
                .then(data => setdepartment(data))
                .catch(error => console.error('Error fetching department data:', error));
        }
    }, [departmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdepartment(prevdepartment => ({ ...prevdepartment, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/department_view/${department.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(department)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "department updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/departments'); // Redirect to home page after clicking "OK"
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
                    <label className="form-label">Department Function</label>
                    <input type="text" className="form-control" name="department_category" value={department.department_category} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department Name</label>
                    <input type="text" className="form-control" name="department_name" value={department.department_name} onChange={handleChange} />
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
