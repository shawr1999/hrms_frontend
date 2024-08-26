import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

$.DataTable = require('datatables.net');

export default function Event_create() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Branch, setBranch] = useState('');
    const [Department, setDepartment] = useState('');
    const [Employee, setEmployee] = useState('');
    const [Event_title, setEvent_title] = useState('');
    const [Select_Color, setSelect_Color] = useState('');
    const [Event_start, setEvent_start] = useState('');
    const [Description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [EventId, setEventId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/events/')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(event => [
                        event.Branch,
                        event.Department,
                        event.Event_title,
                        event.Event_start,
                        event.Select_Color,
                        event.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${event.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${event.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Branch" },
                        { title: "Department" },
                        { title: "Event Title" },
                        { title: "Event Start" },
                        { title: "Select Color" },
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
            .catch(error => console.error('Error fetching events data:', error));
    }, []);

    const handleEdit = (event) => {
        const eventId = $(event.currentTarget).data('id');
        navigate(`/edit-Event/${eventId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Branch: Branch,
            Department: Department,
            Employee: Employee,
            Event_title: Event_title,
            Event_start: Event_start,
            Select_Color: Select_Color,
            Description: Description,
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/events-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Event ID: " + response.data.Event_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setEventId(response.data.Event_id);
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
                const eventId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/events/${eventId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setEvents(events.filter(event => event.id !== eventId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The event has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting event');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newEvent">
                            Create New Event
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newEvent">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Event</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Branch:</label>
                                    <input type="text" className='form-control' value={Branch} onChange={(e) => setBranch(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Department:</label>
                                    <input type="text" className='form-control' value={Department} onChange={(e) => setDepartment(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Event Title:</label>
                                    <input type="text" className='form-control' value={Event_title} onChange={(e) => setEvent_title(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Event Start:</label>
                                    <input type="date" className='form-control' value={Event_start} onChange={(e) => setEvent_start(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Select Color:</label>
                                    <input type="text" className='form-control' value={Select_Color} onChange={(e) => setSelect_Color(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input type="text" className='form-control' value={Description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" style={{ background: "#f8f9fa" }} data-dismiss="modal">Close</button>
                                <button type="submit" className='btn text-white' style={{ background: "#8F76FF" }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
