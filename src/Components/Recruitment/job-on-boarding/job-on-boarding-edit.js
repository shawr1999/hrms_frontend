import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Job_On_Boarding from './Job_On_Boarding';

export default function Job_On_Boarding_Edit() {
    const { Job_On_BoardingId } = useParams();
    const navigate = useNavigate();
    const [Job_On_Boarding, setJob_On_Boarding] = useState({
            Interviewer:'',
            Joining_date:'',
            Days_of_week:'',
            Salary:'',
            Salary_type:'',
            Salary_duration:'',
            Job_Type:'',
            Status: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (Job_On_BoardingId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/job-on-boarding/${Job_On_BoardingId}/`)
                .then(response => response.json())
                .then(data => setJob_On_Boarding(data))
                .catch(error => console.error('Error fetching Job_On_Boarding data:', error));
        }
    }, [Job_On_BoardingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob_On_Boarding(prevJob_On_Boarding => ({ ...prevJob_On_Boarding, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/job-on-boarding/${Job_On_Boarding.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Job_On_Boarding)
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
                        navigate('/Job_On_Boarding'); // Redirect to home page after clicking "OK"
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
                    <input type="text" className="form-control" name="Interviewer" value={Job_On_Boarding.Interviewer} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Joining_date" value={Job_On_Boarding.Joining_date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Days_of_week" value={Job_On_Boarding.Days_of_week} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Salary" value={Job_On_Boarding.Salary} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Salary_type" value={Job_On_Boarding.Salary_type} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Salary_duration" value={Job_On_Boarding.Salary_duration} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Job_Type" value={Job_On_Boarding.Job_Type} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Status" value={Job_On_Boarding.Status} onChange={handleChange} />
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
