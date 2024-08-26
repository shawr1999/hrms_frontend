import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Award_create() {
    const navigate = useNavigate();
    const [awards, setAwards] = useState([]);
    const tableRef = useRef();
    const [formData, setFormData] = useState({
        Employee: '',
        Award_type: '',
        Date: '',
        Gift: '',
        Address: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const User_Role_Name = localStorage.getItem('Curr_User');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/awards/')
            .then(response => response.json())
            .then(data => {
                setAwards(data);
                const table = $(`#table1`).DataTable({
                    data: data.map(award => [
                        award.Employee,
                        award.Award_type,
                        award.Date,
                        award.Gift,
                        award.Address,
                        User_Role_Name !== "Employee" && 
                        `<button class="edit-btn btn btn-primary" data-id="${award.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${award.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Award Type" },
                        { title: "Date" },
                        { title: "Gift" },
                        { title: "Address" },
                        User_Role_Name !== "Employee" && { title: "Action" }
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
            .catch(error => console.error('Error fetching award data:', error));
    }, [User_Role_Name]);

    const handleEdit = (event) => {
        const awardId = $(event.currentTarget).data('id');
        navigate(`/edit-award/${awardId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://shawr1999.pythonanywhere.com//api/awards-create/', formData)
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
                const awardId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/awards/${awardId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setAwards(awards.filter(award => award.id !== awardId));
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
                            console.error('Error deleting award');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="main">
                <div className="container-fluid">
                    <div className="card p-3">
                        {User_Role_Name !== "Employee" && (
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newAward">
                                Create New Award
                            </button>
                        )}
                        <table className="display" width="100%" id="table1" ref={tableRef}></table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="newAward" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Award</h5>
                                <button type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            <div className="modal-body">
                                {Object.keys(formData).map(key => (
                                    <div className="form-group" key={key}>
                                        <label>{key.replace(/_/g, ' ').toUpperCase()}:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
