// EditPolicyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const EditPolicyForm = ({ policy, onClose }) => {
    const [branch, setBranch] = useState(policy.branch);
    const [title, setTitle] = useState(policy.title);
    const [description, setDescription] = useState(policy.description);
    const [attachment, setAttachment] = useState(null);

    useEffect(() => {
        setBranch(policy.branch);
        setTitle(policy.title);
        setDescription(policy.description);
    }, [policy]);

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('branch', branch);
        formData.append('title', title);
        formData.append('description', description);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await axios.put(`https://shawr1999.pythonanywhere.com//api/company_policy_update/${policy.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire('Success!', 'Policy updated successfully!', 'success');
            onClose();
        } catch (error) {
            Swal.fire('Error!', 'Failed to update policy.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Edit Company Policy</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="branch" className="form-label">Branch</label>
                    <input
                        type="text"
                        className="form-control"
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment</label>
                    <input
                        type="file"
                        className="form-control"
                        id="attachment"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditPolicyForm;
