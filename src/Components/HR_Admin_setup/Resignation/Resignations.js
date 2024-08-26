import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Resignation_create() {
    const navigate = useNavigate();
    const [resignations, setResignations] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');
    const [lastWorkingDay, setLastWorkingDay] = useState('');
    const [reason, setReason] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [resignationId, setResignationId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/resignations/')
            .then(response => response.json())
            .then(data => {
                setResignations(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(resignation => [
                        resignation.Employee,
                        resignation.Date,
                        resignation.Last_working_day,
                        resignation.Reason,
                        `<button class="edit-btn btn btn-primary" data-id="${resignation.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${resignation.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Date" },
                        { title: "Last Working Day" },
                        { title: "Reason" },
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
            .catch(error => console.error('Error fetching resignation data:', error));
    }, []);

    const handleEdit = (event) => {
        const resignationId = $(event.currentTarget).data('id');
        navigate(`/edit-Resignation/${resignationId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Employee: employee,
            Date: date,
            Last_working_day: lastWorkingDay,
            Reason: reason
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/resignations-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setResignationId(response.data.Resignation_id);
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
                const resignationId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/resignations/${resignationId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setResignations(resignations.filter(resignation => resignation.id !== resignationId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting resignation');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newResignation">
                            Create New Resignation
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newResignation">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Resignation</h5>
                                <button type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Employee Name:</label>
                                    <input type="text" className='form-control' value={employee} onChange={(e) => setEmployee(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Date:</label>
                                    <input type="date" className='form-control' value={date} onChange={(e) => setDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Last Working Day:</label>
                                    <input type="date" className='form-control' value={lastWorkingDay} onChange={(e) => setLastWorkingDay(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Reason:</label>
                                    <textarea className='form-control' value={reason} onChange={(e) => setReason(e.target.value)} required />
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
