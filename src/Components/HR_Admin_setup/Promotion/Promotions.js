import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Promotion_create() {
    const navigate = useNavigate();
    const [promotions, setPromotions] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [employee, setEmployee] = useState('');
    const [designation, setDesignation] = useState('');
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDate, setPromotionDate] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [promotionId, setPromotionId] = useState('');

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/promotions/')
            .then(response => response.json())
            .then(data => {
                setPromotions(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(promotion => [
                        promotion.Employee,
                        promotion.Designation,
                        promotion.Promotion_title,
                        promotion.Promotion_date,
                        promotion.Description,
                        `<button class="edit-btn btn btn-primary" data-id="${promotion.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${promotion.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Designation" },
                        { title: "Promotion Title" },
                        { title: "Promotion Date" },
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
            .catch(error => console.error('Error fetching promotion data:', error));
    }, []);

    const handleEdit = (event) => {
        const promotionId = $(event.currentTarget).data('id');
        navigate(`/edit-promotion/${promotionId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            Employee: employee,
            Designation: designation,
            Promotion_title: promotionTitle,
            Promotion_date: promotionDate,
            Description: description
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/promotions-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: response.data.message + " with Promotion ID: " + response.data.promotion_id,
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
                setResponseMessage(response.data.message);
                setPromotionId(response.data.promotion_id);
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
                const promotionId = $(event.currentTarget).data('id');
                fetch(`https://shawr1999.pythonanywhere.com//api/promotions/${promotionId}/`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            setPromotions(promotions.filter(promotion => promotion.id !== promotionId));
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
                            console.error('Error deleting promotion');
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newPromotion">
                            Create New Promotion
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="newPromotion">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Promotion</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Employee:</label>
                                    <input type="text" className='form-control' value={employee} onChange={(e) => setEmployee(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Designation:</label>
                                    <input type="text" className='form-control' value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Promotion Title:</label>
                                    <input type="text" className='form-control' value={promotionTitle} onChange={(e) => setPromotionTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Promotion Date:</label>
                                    <input type="date" className='form-control' value={promotionDate} onChange={(e) => setPromotionDate(e.target.value)} required />
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
