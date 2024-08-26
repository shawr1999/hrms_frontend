import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

$.DataTable = require('datatables.net');

export default function Holiday_create() {
    const navigate = useNavigate();
    const [Holiday, setHoliday] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Occasion, setOccasion] = useState('');
    const [Start, setStart] = useState('');
    const [End, setEnd] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [HolidayId, setHolidayId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/holidays/')
            .then(response => response.json())
            .then(data => {
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Holiday => [
                        Holiday.Occasion,
                        Holiday.Start,
                        Holiday.End,
                        `<button class="edit-btn btn btn-primary" data-id="${Holiday.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Holiday.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Occasion" },
                        { title: "Start" },
                        { title: "End" },
                        { title: "Action" }
                    ],
                    destroy: true,
                    searching: true,
                    createdRow: function (row) {
                        $(row).find('.edit-btn').on('click', handleEdit);
                        $(row).find('.delete-btn').on('click', handleDelete);
                    }
                });

                return () => {
                    table.destroy();
                };
            })
            .catch(error => console.error('Error fetching holiday data:', error));
    }, []);

    const handleEdit = (event) => {
        const HolidayId = $(event.currentTarget).data('id');
        navigate(`/edit-Holiday/${HolidayId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { Occasion, Start, End };

        axios.post('https://shawr1999.pythonanywhere.com//api/holidays-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Holiday Id: " + response.data.Holiday_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setHolidayId(response.data.Holiday_id);
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
                const HolidayId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/holidays/${HolidayId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setHoliday(Holiday.filter(Holiday => Holiday.id !== HolidayId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The holiday has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting holiday');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newHoliday">
                            Create New Holiday
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newHoliday">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Holiday</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">  
                                    <label>Occasion:</label>
                                    <input type="text" className='form-control' value={Occasion} onChange={(e) => setOccasion(e.target.value)} required />
                                </div>
                                <div className="form-group">  
                                    <label>Start Date:</label>
                                    <input type="date" className='form-control' value={Start} onChange={(e) => setStart(e.target.value)} required />
                                </div>
                                <div className="form-group">  
                                    <label>End Date:</label>
                                    <input type="date" className='form-control' value={End} onChange={(e) => setEnd(e.target.value)} required />
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
