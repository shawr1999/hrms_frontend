import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function WarningCreate() {
    const navigate = useNavigate();
    const [warnings, setWarnings] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [warningBy, setWarningBy] = useState('');
    const [warningTo, setWarningTo] = useState('');
    const [subject, setSubject] = useState('');
    const [warningDate, setWarningDate] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [warningId, setWarningId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/warnings/')
            .then(response => response.json())
            .then(data => {
                setWarnings(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(warning => [
                        warning.Warning_by,
                        warning.Warning_to,
                        warning.Subject,
                        warning.Warning_date,
                        warning.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${warning.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${warning.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Warning By" },
                        { title: "Warning To" },
                        { title: "Subject" },
                        { title: "Warning Date" },
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
            .catch(error => console.error('Error fetching warnings data:', error));
    }, []);

    const handleEdit = (event) => {
        const id = $(event.currentTarget).data('id');
        navigate(`/edit-warning/${id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Warning_by: warningBy,
            Warning_to: warningTo,
            Subject: subject,
            Warning_date: warningDate,
            Description: description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/warnings-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Warning Id: " + response.data.Warning_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setWarningId(response.data.Warning_id);
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
                const id = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/warnings/${id}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setWarnings(warnings.filter(warning => warning.id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your warning has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting warning');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newWarning">
                            Create New Warning
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newWarning">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Warning</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Warning By:</label>
                                    <input type="text" className='form-control' value={warningBy} onChange={(e) => setWarningBy(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Warning To:</label>
                                    <input type="text" className='form-control' value={warningTo} onChange={(e) => setWarningTo(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Subject:</label>
                                    <input type="text" className='form-control' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Warning Date:</label>
                                    <input type="date" className='form-control' value={warningDate} onChange={(e) => setWarningDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" style={{ background:"#f8f9fa" }} data-dismiss="modal">Close</button>
                                <button type="submit" className='btn text-white' style={{ background:"#8F76FF" }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
