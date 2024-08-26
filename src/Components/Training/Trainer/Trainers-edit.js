import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Trainer from './Trainer';

export default function Trainer_Edit() {
    const { TrainerId } = useParams();
    const navigate = useNavigate();
    const [Trainer, setTrainer] = useState({
            Branch:'',
            First_name:'',
            Last_name:'',
            Contact:'',
            Email:'',
            Expertise:'',
            Address:'',
        // required_feild: ''
        // Last_name_state: '',
        // Last_name_district: '',
        // Last_name_Email: ''
    });

    useEffect(() => {
        if (TrainerId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/trainers/${TrainerId}/`)
                .then(response => response.json())
                .then(data => setTrainer(data))
                .catch(error => console.error('Error fetching Trainer data:', error));
        }
    }, [TrainerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainer(prevTrainer => ({ ...prevTrainer, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/trainers/${Trainer.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Trainer)
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
                        navigate('/Trainer'); // Redirect to home page after clicking "OK"
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
            <h2>Edit trainers</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Branch" value={Trainer.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="First_name" value={Trainer.First_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Last_name" value={Trainer.Last_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Contact" value={Trainer.Contact} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Email" value={Trainer.Email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Expertise" value={Trainer.Expertise} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Address" value={Trainer.Address} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Email" value={Trainer.Email} onChange={handleChange} />
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
