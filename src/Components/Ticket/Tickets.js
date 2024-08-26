import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

$.DataTable = require('datatables.net');

export default function Ticket_create() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [subject, setSubject] = useState('');
    const [ticketFor, setTicketFor] = useState('');
    const [priority, setPriority] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/tickets/')
            .then(response => response.json())
            .then(data => {
                setTickets(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(ticket => [
                        ticket.Subject,
                        ticket.Ticket_for,
                        ticket.Priority,
                        ticket.End,
                        ticket.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${ticket.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${ticket.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Subject" },
                        { title: "Ticket For" },
                        { title: "Priority" },
                        { title: "End" },
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
            .catch(error => console.error('Error fetching ticket data:', error));
    }, []);

    const handleEdit = (event) => {
        const ticketId = $(event.currentTarget).data('id');
        navigate(`/edit-Ticket/${ticketId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Subject: subject,
            Ticket_for: ticketFor,
            Priority: priority,
            End: end,
            Description: description,
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/tickets-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTickets([...tickets, response.data.ticket]); // Add new ticket to table
                        setSubject('');
                        setTicketFor('');
                        setPriority('');
                        setEnd('');
                        setDescription('');
                    }
                });
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
                const ticketId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/tickets/${ticketId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        } else {
                            console.error('Error deleting ticket');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newTicket">
                            Create New Ticket
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newTicket">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Ticket</h5>
                                {/* <button type="button" className="close" data-dismiss="modal">×</button> */}
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Subject:</label>
                                    <input type="text" className='form-control' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Ticket For:</label>
                                    <input type="text" className='form-control' value={ticketFor} onChange={(e) => setTicketFor(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Priority:</label>
                                    <input type="text" className='form-control' value={priority} onChange={(e) => setPriority(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>End:</label>
                                    <input type="date" className='form-control' value={end} onChange={(e) => setEnd(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
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
