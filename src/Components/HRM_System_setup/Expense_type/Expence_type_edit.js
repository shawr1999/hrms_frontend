import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Expence_type from './Expence_type';

export default function Expence_type_Edit() {
    const { Expence_typeId } = useParams();
    const navigate = useNavigate();
    const [Expence_type, setExpence_type] = useState({
        Expence_type_name: '',
        // required_feild: ''
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (Expence_typeId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/expence_type_view/${Expence_typeId}/`)
                .then(response => response.json())
                .then(data => setExpence_type(data))
                .catch(error => console.error('Error fetching Expence_type data:', error));
        }
    }, [Expence_typeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpence_type(prevExpence_type => ({ ...prevExpence_type, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/expence_type_view/${Expence_type.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Expence_type)
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
                        navigate('/Expence_type'); // Redirect to home page after clicking "OK"
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
                    <input type="text" className="form-control" name="Expence_type_name" value={Expence_type.Expence_type_name} onChange={handleChange} />
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
