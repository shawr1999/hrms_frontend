import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Designation_Edit() {
    const { designationId } = useParams();
    const navigate = useNavigate();
    const [designation, setdesignation] = useState({
        designation_department: '',
        designation_name: ''
      
    });

    useEffect(() => {
        if (designationId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/designation_view/${designationId}/`)
                .then(response => response.json())
                .then(data => setdesignation(data))
                .catch(error => console.error('Error fetching designation data:', error));
        }
    }, [designationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdesignation(prevdesignation => ({ ...prevdesignation, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/designation_view/${designation.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(designation)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "designation updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/designation'); // Redirect to home page after clicking "OK"
                    }
                });
                // Redirect to home page after save
            })
            .catch(error => console.error('Error updating designation:', error));
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
            <h2>Edit designation</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Designation Department</label>
                    <input type="text" className="form-control" name="designation_department" value={designation.designation_department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">designation Name</label>
                    <input type="text" className="form-control" name="designation_name" value={designation.designation_name} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="designation_state" value={designation.designation_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="designation_district" value={designation.designation_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="designation_address" value={designation.designation_address} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
