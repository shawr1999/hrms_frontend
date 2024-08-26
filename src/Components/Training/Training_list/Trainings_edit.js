import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Training from './Training';

export default function Training_Edit() {
    const { TrainingId } = useParams();
    const navigate = useNavigate();
    const [Training, setTraining] = useState({
            Branch:'',
            Trainer_option:'',
            Training_type:'',
            Trainer:'',
            Training_cost:'',
            Employee:'',
            Start:'',
            End: '',
            Description: '',
        // Training_type_district: '',
        // Training_type_Training_cost: ''
    });

    useEffect(() => {
        if (TrainingId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/trainings/${TrainingId}/`)
                .then(response => response.json())
                .then(data => setTraining(data))
                .catch(error => console.error('Error fetching Training data:', error));
        }
    }, [TrainingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraining(prevTraining => ({ ...prevTraining, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/trainings/${Training.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Training)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Document type upTraining_typed successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Training'); // Redirect to home page after clicking "OK"
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
            <h2>Edit trainings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Branch" value={Training.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Trainer_option" value={Training.Trainer_option} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Training_type" value={Training.Training_type} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Trainer" value={Training.Trainer} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Training_cost" value={Training.Training_cost} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Employee" value={Training.Employee} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Start" value={Training.Start} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="End" value={Training.End} onChange={handleChange} />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="Description" value={Training.Description} onChange={handleChange} />
                </div>
               {/*  <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="Training_type_district" value={Training_type.Training_type_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Training_cost</label>
                    <input type="text" className="form-control" name="Training_type_Training_cost" value={Training_type.Training_type_Training_cost} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
