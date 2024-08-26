import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Event from './Event';

export default function Event_Edit() {
    const { EventId } = useParams();
    const navigate = useNavigate();
    const [Event, setEvent] = useState({
          Branch: '',
        Department: '',
        Event_title: '',
        Event_start: '',
        Select_Color: '',
        Description: '',
        // required_feild: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (EventId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/events/${EventId}/`)
                .then(response => response.json())
                .then(data => setEvent(data))
                .catch(error => console.error('Error fetching Event data:', error));
        }
    }, [EventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/events/${Event.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Event)
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
                        navigate('/Event'); // Redirect to home page after clicking "OK"
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
                    <input type="text" className="form-control" name="Branch" value={Event.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Department" value={Event.Department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Event_title" value={Event.Event_title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Event_start" value={Event.Event_start} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Select_Color" value={Event.Select_Color} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Event.Description} onChange={handleChange} />
                </div>
{/*                 
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="Note" value={Event.Note} onChange={handleChange} />
                </div> */}
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
