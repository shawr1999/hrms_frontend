import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function ComplaintCreate() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [complaintFrom, setComplaintFrom] = useState('');
    const [complaintAgainst, setComplaintAgainst] = useState('');
    const [title, setTitle] = useState('');
    const [complaintDate, setComplaintDate] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [complaintId, setComplaintId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/complaints/')
            .then(response => response.json())
            .then(data => {
                setComplaints(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(complaint => [
                        complaint.Complaint_from,
                        complaint.Complaint_against,
                        complaint.Title,
                        complaint.Complaint_date,
                        complaint.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${complaint.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${complaint.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Complaint From" },
                        { title: "Complaint Against" },
                        { title: "Title" },
                        { title: "Complaint Date" },
                        { title: "Description" },
                        { title: "Action" }
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
            .catch(error => console.error('Error fetching complaints:', error));
    }, []);

    const handleEdit = (event) => {
        const complaintId = $(event.currentTarget).data('id');
        navigate(`/edit-complaint/${complaintId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Complaint_from: complaintFrom,
            Complaint_against: complaintAgainst,
            Title: title,
            Complaint_date: complaintDate,
            Description: description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/complaints-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setComplaintId(response.data.complaint_id);
            })
            .catch(error => {
                console.error('There was an error!', error.response.data);
                setResponseMessage('An error occurred. Please try again.');
            });
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
                const complaintId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/complaints/${complaintId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setComplaints(complaints.filter(complaint => complaint.id !== complaintId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The complaint has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting complaint');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
    };

    return (
        <div>
            <div className="main">
                <div className="container-fluid">
                    <div className="card p-3">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newComplaint">
                            Create New Complaint
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="newComplaint">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Complaint</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Complaint From:</label>
                                    <input type="text" className='form-control' value={complaintFrom} onChange={(e) => setComplaintFrom(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Complaint Against:</label>
                                    <input type="text" className='form-control' value={complaintAgainst} onChange={(e) => setComplaintAgainst(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Complaint Date:</label>
                                    <input type="date" className='form-control' value={complaintDate} onChange={(e) => setComplaintDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
