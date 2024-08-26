import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Termination_create() {
    const navigate = useNavigate();
    const [terminations, setTerminations] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [employee, setEmployee] = useState('');
    const [terminationType, setTerminationType] = useState('');
    const [noticeDate, setNoticeDate] = useState('');
    const [terminationDate, setTerminationDate] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [terminationId, setTerminationId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/terminations/')
            .then(response => response.json())
            .then(data => {
                setTerminations(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(termination => [
                        termination.Employee,
                        termination.Termination_type,
                        termination.Notice_date,
                        termination.Termination_date,
                        termination.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${termination.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${termination.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Termination Type" },
                        { title: "Notice Date" },
                        { title: "Termination Date" },
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
            .catch(error => console.error('Error fetching termination data:', error));
    }, []);

    const handleEdit = (event) => {
        const terminationId = $(event.currentTarget).data('id');
        navigate(`/edit-Termination/${terminationId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Employee: employee,
            Termination_type: terminationType,
            Notice_date: noticeDate,
            Termination_date: terminationDate,
            Description: description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/terminations-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Termination Id: " + response.data.Termination_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setTerminationId(response.data.Termination_id);
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
                const terminationId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/terminations/${terminationId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setTerminations(terminations.filter(termination => termination.id !== terminationId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your record has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting termination');
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
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newTermination">
                            Create New Termination
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newTermination">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Termination</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Employee:</label>
                                    <input type="text" className='form-control' value={employee} onChange={(e) => setEmployee(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Termination Type:</label>
                                    <input type="text" className='form-control' value={terminationType} onChange={(e) => setTerminationType(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Notice Date:</label>
                                    <input type="date" className='form-control' value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Termination Date:</label>
                                    <input type="date" className='form-control' value={terminationDate} onChange={(e) => setTerminationDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
