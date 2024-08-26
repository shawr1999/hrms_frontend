import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Trip_create() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [employee, setEmployee] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [purpose, setPurpose] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [tripId, setTripId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/trips/')
            .then(response => response.json())
            .then(data => {
                setTrips(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(trip => [
                        trip.employee,
                        trip.start,
                        trip.end,
                        trip.purpose,
                        trip.country,
                        trip.description,
                        `<button class="edit-btn btn btn-primary" data-id="${trip.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${trip.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Start" },
                        { title: "End" },
                        { title: "Purpose" },
                        { title: "Country" },
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
            .catch(error => console.error('Error fetching trip data:', error));
    }, []);

    const handleEdit = (event) => {
        const tripId = $(event.currentTarget).data('id');
        navigate(`/edit-Trip/${tripId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            employee,
            start,
            end,
            purpose,
            country,
            description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/trips-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Trip ID: " + response.data.trip_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setTripId(response.data.trip_id);
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
                const tripId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/trips/${tripId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setTrips(trips.filter(trip => trip.id !== tripId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your trip has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting trip');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newTrip">
                            Create New Trip
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="newTrip">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Trip</h5>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Employee:</label>
                                    <input type="text" className='form-control' value={employee} onChange={(e) => setEmployee(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Start Date:</label>
                                    <input type="date" className='form-control' value={start} onChange={(e) => setStart(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>End Date:</label>
                                    <input type="date" className='form-control' value={end} onChange={(e) => setEnd(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Purpose:</label>
                                    <input type="text" className='form-control' value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Country:</label>
                                    <input type="text" className='form-control' value={country} onChange={(e) => setCountry(e.target.value)} required />
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
