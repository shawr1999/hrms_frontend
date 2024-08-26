import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Meeting_create() {
    const navigate = useNavigate();
    const [Meetings, setMeetings] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Branch, setBranch] = useState('');
    const [Department, setDepartment] = useState('');
    const [Employee, setEmployee] = useState('');
    const [Meeting_title, setMeeting_title] = useState('');
    const [Meeting_date, setMeeting_date] = useState('');
    const [Time, setTime] = useState('');
    const [Note, setNote] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/meetings/')
            .then(response => response.json())
            .then(data => {
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Meeting => [
                        Meeting.Branch,
                        Meeting.Department,
                        Meeting.Employee,
                        Meeting.Meeting_title,
                        Meeting.Meeting_date,
                        Meeting.Time,
                        Meeting.Note,
                        `<button class="edit-btn btn btn-primary" data-id="${Meeting.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Meeting.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Branch" },
                        { title: "Department" },
                        { title: "Employee" },
                        { title: "Meeting Title" },
                        { title: "Meeting Date" },
                        { title: "Time" },
                        { title: "Note" },
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
            .catch(error => console.error('Error fetching meeting data:', error));
    }, []);

    const handleEdit = (event) => {
        const MeetingId = $(event.currentTarget).data('id');
        navigate(`/edit-Meeting/${MeetingId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Branch,
            Department,
            Employee,
            Meeting_title,
            Meeting_date,
            Time,
            Note
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/meetings-create/', formData)
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
                const MeetingId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/meetings/${MeetingId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setMeetings(Meetings.filter(Meeting => Meeting.id !== MeetingId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your meeting has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting meeting');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newMeeting">
                            Create New Meeting
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newMeeting">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Meeting</h5>
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
                                    <label>Employee:</label>
                                    <input type="text" className='form-control' value={Employee} onChange={(e) => setEmployee(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Meeting Title:</label>
                                    <input type="text" className='form-control' value={Meeting_title} onChange={(e) => setMeeting_title(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Meeting Date:</label>
                                    <input type="date" className='form-control' value={Meeting_date} onChange={(e) => setMeeting_date(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input type="time" className='form-control' value={Time} onChange={(e) => setTime(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Note:</label>
                                    <textarea className='form-control' value={Note} onChange={(e) => setNote(e.target.value)} required />
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
