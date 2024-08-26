import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Announcement_create() {
    const navigate = useNavigate();
    const [Announcement, setAnnouncement] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Announcement_title, setAnnouncement_title] = useState('');
    const [Branch, setBranch] = useState('');
    const [Department, setDepartment] = useState('');
    const [Employee, setEmployee] = useState('');
    const [Announcement_start_date, setAnnouncement_start_date] = useState('');
    const [Announcement_end_date, setAnnouncement_end_date] = useState('');
    const [Announcement_description, setAnnouncement_description] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [AnnouncementId, setAnnouncementId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/announcements/')
            .then(response => response.json())
            .then(data => {
                setAnnouncement(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(announcement => [
                        announcement.Announcement_title,
                        announcement.Branch,
                        announcement.Department,
                        announcement.Employee,
                        announcement.Announcement_start_date,
                        announcement.Announcement_end_date,
                        announcement.Announcement_description,
                        `<button class="edit-btn btn btn-primary" data-id="${announcement.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${announcement.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Announcement Title" },
                        { title: "Branch" },
                        { title: "Department" },
                        { title: "Employee" },
                        { title: "Start Date" },
                        { title: "End Date" },
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
            .catch(error => console.error('Error fetching announcement data:', error));
    }, []);

    const handleEdit = (event) => {
        const AnnouncementId = $(event.currentTarget).data('id');
        navigate(`/edit-Announcement/${AnnouncementId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Announcement_title,
            Branch,
            Department,
            Employee,
            Announcement_start_date,
            Announcement_end_date,
            Announcement_description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/announcements-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Announcement Created!",
                    text: response.data.message + " with Announcement Id: " + response.data.Announcement_id,
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setAnnouncementId(response.data.Announcement_id);
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
                const AnnouncementId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/announcements/${AnnouncementId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setAnnouncement(Announcement.filter(announcement => announcement.id !== AnnouncementId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your announcement has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            console.error('Error deleting announcement');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newAnnouncement">
                            Create New Announcement
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newAnnouncement">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Announcement</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Announcement Title:</label>
                                    <input type="text" className='form-control' value={Announcement_title} onChange={(e) => setAnnouncement_title(e.target.value)} required />
                                </div>
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
                                    <label>Start Date:</label>
                                    <input type="date" className='form-control' value={Announcement_start_date} onChange={(e) => setAnnouncement_start_date(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>End Date:</label>
                                    <input type="date" className='form-control' value={Announcement_end_date} onChange={(e) => setAnnouncement_end_date(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className='form-control' value={Announcement_description} onChange={(e) => setAnnouncement_description(e.target.value)} required />
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
