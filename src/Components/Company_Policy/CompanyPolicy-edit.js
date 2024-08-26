import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PolicyEdit() {
    const { policiesId } = useParams();
    const navigate = useNavigate();
    const [policies, setPolicies] = useState({
        branch: '',
        title: '',
        description: ''
    });
    const [attachment, setAttachment] = useState(null);

    useEffect(() => {
        if (policiesId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/company-policies/${policiesId}/`)
                .then(response => response.json())
                .then(data => setPolicies(data))
                .catch(error => console.error('Error fetching policy data:', error));
        }
    }, [policiesId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPolicies(prevPolicies => ({ ...prevPolicies, [name]: value }));
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('branch', policies.branch);
        formData.append('title', policies.title);
        formData.append('description', policies.description);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        fetch(`https://shawr1999.pythonanywhere.com//api/company-policies/${policiesId}/`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Policy updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/policies'); // Redirect to policies page after clicking "OK"
                    }
                });
            })
            .catch(error => console.error('Error updating policy:', error));
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
                    <h2>Edit Policy</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Branch</label>
                            <input type="text" className="form-control" name="branch" value={policies.branch} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" value={policies.title} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={policies.description} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Attachment</label>
                            <input type="file" className="form-control" name="attachment" onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
