import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Goal_tracking from './Goal_tracking';

export default function Goal_tracking_Edit() {
    const { Goal_trackingId } = useParams();
    const navigate = useNavigate();
    const [Goal_tracking, setGoal_tracking] = useState({
            Branch:'',
            Goaltypes:'',
            Start:'',
            End:'',
            Subject:'',
            Target:'',
            Description:'',
        // Description: ''
        // Last_name_state: '',
        // Last_name_district: '',
        // Last_name_Email: ''
    });

    useEffect(() => {
        if (Goal_trackingId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/goal-trackings/${Goal_trackingId}/`)
                .then(response => response.json())
                .then(data => setGoal_tracking(data))
                .catch(error => console.error('Error fetching Goal_tracking data:', error));
        }
    }, [Goal_trackingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal_tracking(prevGoal_tracking => ({ ...prevGoal_tracking, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/goal-trackings/${Goal_tracking.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Goal_tracking)
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
                        navigate('/Goal_tracking'); // Redirect to home page after clicking "OK"
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
            <h2>Edit goal-trackings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Branch" value={Goal_tracking.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Goaltypes" value={Goal_tracking.Goaltypes} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Start" value={Goal_tracking.Start} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="End" value={Goal_tracking.End} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Subject" value={Goal_tracking.Subject} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Target" value={Goal_tracking.Target} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Goal_tracking.Description} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Description" value={Goal_tracking.Description} onChange={handleChange} />
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
