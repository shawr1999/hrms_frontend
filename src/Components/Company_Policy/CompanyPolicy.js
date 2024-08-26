import React, { useEffect, useRef,useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function CreatePolicyForm() {
    const [branch, setBranch] = useState('');
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef();
    const [policiesId, setpoliciesId] = useState('');
    const tableName = "table1";

    $.DataTable = require('datatables.net');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/company-policies/')
            .then(response => response.json())
            .then(data => {
                setpoliciesId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(policy => [
                        policy.branch,
                        policy.title,
                        policy.description,
                        policy.attachment ? (
                                    `<a href=${policy.attachment} target="_blank" rel="noopener noreferrer">View Attachment</a>`
                                ) : (
                                    `No Attachment`
                                ),
                        // branch.branch_state,
                        // branch.branch_state,
                        // branch.branch_district,
                        // branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${policy.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${policy.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Award name" },
                        { title: "State" },
                        { title: "District" },
                        { title: "Address" },
                        { title: "Actions" }
                    ],
                    destroy: true,
                    searching: true,
                    createdRow: function (row, data, dataIndex) {
                        $(row).find('.edit-btn').on('click', handleEdit);
                        $(row).find('.delete-btn').on('click', handleDelete);
                    }
                });
                return () => {
                    table.destroy();
                };
            })
            .catch(error => console.error('Error fetching branch data:', error));
    }, []);

   const handleEdit = (event) => {
        const policiesId = $(event.currentTarget).data('id');
        navigate(`/edit-policy/${policiesId}`);
    };

        const handleDelete = (event) => {
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    // 
    const policiesId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/company_policy_delete/${policiesId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setPolicies(policies.filter(policies => policies.id !== policiesId));
                    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(); // Redirect to home page after clicking "OK"
                    }
                });
                } else {
                    console.error('Error deleting Leave');
                }
            })
            .catch(error => console.error('Error:', error));
  }
});
        
    };


    // useEffect(() => {
    //     const fetchPolicies = async () => {
    //         try {
    //             const response = await axios.get('https://shawr1999.pythonanywhere.com//api/company-policies/');
    //             setPolicies(response.data);
    //         } catch (error) {
    //             setError('Failed to fetch policies.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPolicies();
    // }, []);

    // if (loading) return <p>Loading policies...</p>;
    // if (error) return <p>{error}</p>;


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
            const response = await axios.post('https://shawr1999.pythonanywhere.com//api/company_policy_create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success'
            });
        } catch (error) {
            console.error('There was an error!', error.response.data);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error creating the policy.',
                icon: 'error'
            });
        }
    };

    return (
       <div className="main">
         <div className="container">
            <h2>Create Company Policy</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="branch" className="form-label">Branch</label>
                    <input
                        type="text"
                        className="form-control"
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
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
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment</label>
                    <input
                        type="file"
                        className="form-control"
                        id="attachment"
                        onChange={(e) => setAttachment(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

                
            <h2>Company Policies</h2>
            {/* <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Branch</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Attachment</th>
                        <th>Action</th>
                            
                    </tr>
                </thead>
                <tbody>
                    {policies.map(policy => (
                        <tr key={policy.id}>
                            <td>{policy.id}</td>
                            <td>{policy.branch}</td>
                            <td>{policy.title}</td>
                            <td>{policy.description}</td>
                            <td>
                                {policy.attachment ? (
                                    <a href={policy.attachment} target="_blank" rel="noopener noreferrer">View Attachment</a>
                                ) : (
                                    'No Attachment'
                                )}
                            </td>
                            <td><button class="edit-btn btn btn-primary" data-id={policy.id}>Edit</button>
                         <button class="delete-btn btn btn-danger" data-id={policy.id}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                </table> */}
                
            <table className="display" width="100%" id={tableName} ref={tableRef}></table>

        </div>
       </div>
        
    );
}
