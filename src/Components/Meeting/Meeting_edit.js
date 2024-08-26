import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Meeting from './Meeting';

export default function Meeting_Edit() {
    const { MeetingId } = useParams();
    const navigate = useNavigate();
    const [Meeting, setMeeting] = useState({
          Branch: '',
        Department: '',
        Employee: '',
        Meeting_title: '',
        Meeting_date: '',
        Time: '',
        Note: '',
        // required_feild: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (MeetingId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/meetings/${MeetingId}/`)
                .then(response => response.json())
                .then(data => setMeeting(data))
                .catch(error => console.error('Error fetching Meeting data:', error));
        }
    }, [MeetingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting(prevMeeting => ({ ...prevMeeting, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/meetings/${Meeting.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Meeting)
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
                        navigate('/Meeting'); // Redirect to home page after clicking "OK"
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
                    <input type="text" className="form-control" name="Branch" value={Meeting.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Department" value={Meeting.Department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Employee" value={Meeting.Employee} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Meeting_title" value={Meeting.Meeting_title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Meeting_date" value={Meeting.Meeting_date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Time" value={Meeting.Time} onChange={handleChange} />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="Note" value={Meeting.Note} onChange={handleChange} />
                </div>
                 {/*<div className="mb-3">
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
