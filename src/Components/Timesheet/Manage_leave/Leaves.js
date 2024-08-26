import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function LeavesCreate() {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [employee, setEmployee] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [reason, setReason] = useState('');
    const [remark, setRemark] = useState('');
    const [leaveOptions, setLeaveOptions] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const CurrRole = localStorage.getItem('Curr_User');
    const currEmpId = localStorage.getItem('Curr_Emp_id');
    const tableRef = useRef();
    const tableName = "table1";

    useEffect(() => {
        // Fetch leave data to populate table and dropdown
        const fetchData = async () => {
            try {
                const leaveResponse = await axios.get('https://shawr1999.pythonanywhere.com//api/create-leaves/');
                let filteredLeaves = leaveResponse.data;

                // If the current role is Employee, filter leaves by the current employee's ID
                if (CurrRole === "Employee") {
                    filteredLeaves = filteredLeaves.filter(leave => leave.Employee_id === currEmpId);
                }

                setLeaves(filteredLeaves);
                initDataTable(filteredLeaves);

                const leaveOptionsResponse = await axios.get('https://shawr1999.pythonanywhere.com//api/leave_view/');
                setLeaveOptions(leaveOptionsResponse.data);

                const employeeResponse = await axios.get('https://shawr1999.pythonanywhere.com//api/employee_view/');
                setEmployeeList(employeeResponse.data);

                // If Curr_Emp_id is in localStorage, pre-select the employee
                if (currEmpId) {
                    const emp = employeeResponse.data.find(emp => emp.Employee_id === currEmpId);
                    if (emp) {
                        setEmployee(emp.Employee_id);
                        setEmployeeName(emp.Employee_name);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: "Error!",
                    text: 'Failed to fetch initial data. Please try again.',
                    icon: "error",
                });
            }
        };

        fetchData();
    }, [currEmpId]);

    useEffect(() => {
        // If employee changes, update employeeName
        const emp = employeeList.find(emp => emp.Employee_id === employee);
        setEmployeeName(emp ? emp.Employee_name : '');
    }, [employee, employeeList]);

       const getEmployeeNameById = (id) => {
        const emp = employeeList.find(emp => emp.Employee_id === id);
        return emp ? emp.Employee_name : 'Unknown';
    };

    const initDataTable = (data) => {
        if ($.fn.dataTable.isDataTable(`#${tableName}`)) {
            $(`#${tableName}`).DataTable().destroy();
        }
        $(`#${tableName}`).DataTable({
            data: data.map(leave => {
                return CurrRole !== "Employee"
                    ? [
                        getEmployeeNameById(leave.Employee_id),
                        leave.Leave_type,
                        leave.Start,
                        leave.End,
                        leave.Reason,
                        leave.Remark,
                        leave.Status,
                        `<button class="edit-btn btn btn-primary" data-id="${leave.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${leave.id}">Delete</button>`
                    ] : [
                        leave.Leave_type,
                        leave.Start,
                        leave.End,
                        leave.Reason,
                        leave.Remark,
                        leave.Status,
                        `<button class="edit-btn btn btn-primary" data-id="${leave.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${leave.id}">Delete</button>`
                    ];
            }),
            columns: [
                CurrRole !== "Employee" && { title: "Employee" },
                { title: "Leave Type" },
                { title: "Start" },
                { title: "End" },
                { title: "Reason" },
                { title: "Remark" },
                { title: "Status" },
                { title: "Action" }
            ].filter(Boolean),  // Filter out null columns
            destroy: true,
            searching: true,
            createdRow: function (row, data, dataIndex) {
                $(row).find('.edit-btn').on('click', handleEdit);
                $(row).find('.delete-btn').on('click', handleDelete);
            }
        });
    };

 

    const handleEdit = (event) => {
        const leavesId = $(event.currentTarget).data('id');
        navigate(`/edit-leaves/${leavesId}`);
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
                const leavesId = $(event.currentTarget).data('id');
                axios.delete(`https://shawr1999.pythonanywhere.com//api/create-leaves/${leavesId}/`)
                    .then(response => {
                        setLeaves(leaves.filter(leave => leave.id !== leavesId));
                        Swal.fire("Deleted!", "Your record has been deleted.", "success");
                        initDataTable(leaves.filter(leave => leave.id !== leavesId));
                    })
                    .catch(error => {
                        console.error('Error deleting leave:', error);
                        Swal.fire("Error!", "Failed to delete record. Please try again.", "error");
                    });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!employee || !leaveType || !start || !end || !reason) {
            Swal.fire({
                title: "Error!",
                text: 'Please fill all the required fields.',
                icon: "error",
            });
            return;
        }

        const formData = {
            Employee_id: CurrRole === 'Employee' ? currEmpId : employee,
            Leave_type: leaveType,
            Start: start,
            End: end,
            Reason: reason,
            Remark: remark,
            Status: 'Panding'
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/create-leaves-create/', formData)
            .then(response => {
                Swal.fire({
                    title: "Good job!",
                    text: `${response.data.message} with Leave Id: ${response.data.Leave_id}`,
                    icon: "success",
                }).then(() => {
                    // Reset form fields and refresh the table
                    resetForm();
                    initDataTable([...leaves, response.data.leave]);
                    $('#newLeave').modal('hide');
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                Swal.fire({
                    title: "Error!",
                    text: 'An error occurred. Please try again.',
                    icon: "error",
                });
            });
    };

    const resetForm = () => {
        setEmployee('');
        setEmployeeName('');
        setLeaveType('');
        setStart('');
        setEnd('');
        setReason('');
        setRemark('');
    };

    return (
        <div>
            <div className="main">
                <div className="container-fluid">
                    <div className="card p-3">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newLeave">
                            Create New Leave
                        </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="newLeave">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Leave</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    {CurrRole !== 'Employee' ? (
                                        <>
                                            <label>Employee:</label>
                                            <select
                                                className="form-control"
                                                value={employee}
                                                onChange={(e) => setEmployee(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Employee</option>
                                                {employeeList.map(emp => (
                                                    <option key={emp.Employee_id} value={emp.Employee_id}>
                                                        {emp.Employee_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ) : (
                                        <input type="text" value={currEmpId} disabled hidden className="form-control" />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Leave Type:</label>
                                    <select
                                        className="form-control"
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Leave Type</option>
                                        {leaveOptions.map(leave => (
                                            <option key={leave.id} value={leave.leave_name}>
                                                {leave.leave_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Start Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={start}
                                        onChange={(e) => setStart(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={end}
                                        onChange={(e) => setEnd(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Reason:</label>
                                    <textarea
                                        className="form-control"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Remark (optional):</label>
                                    <textarea
                                        className="form-control"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
