import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Leaves_Edit() {
    const { LeavesId } = useParams();
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        Employee_id: '',
        Leave_type: '',
        Start: '',
        End: '',
        Reason: '',
        Remark: '',
        Status: ''
    });

    const [employeeList, setEmployeeList] = useState([]);
    const [leaveOptions, setLeaveOptions] = useState([]);
    const CurrRole = localStorage.getItem('Curr_User');
    const currEmpId = localStorage.getItem('Curr_Emp_id');
    const leaveStatus = ['Approved','Panding','Rejected'];

    useEffect(() => {
        // Fetch leave details if LeavesId is present
        if (LeavesId) {
            axios.get(`https://shawr1999.pythonanywhere.com//api/create-leaves/${LeavesId}/`)
                .then(response => setLeave(response.data))
                .catch(error => console.error('Error fetching leave data:', error));
        }

        // Fetch employee list and leave options
        axios.get('https://shawr1999.pythonanywhere.com//api/employee_view/')
            .then(response => setEmployeeList(response.data))
            .catch(error => console.error('Error fetching employee data:', error));

        axios.get('https://shawr1999.pythonanywhere.com//api/leave_view/')
            .then(response => setLeaveOptions(response.data))
            .catch(error => console.error('Error fetching leave options:', error));
    }, [LeavesId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave(prevLeave => ({ ...prevLeave, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://shawr1999.pythonanywhere.com//api/create-leaves/${LeavesId}/`, leave)
            .then(response => {
                Swal.fire({
                    title: "Success!",
                    text: "Leave updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/leaves'); // Redirect to leave list after saving
                    }
                });
            })
            .catch(error => {
                console.error('Error updating leave:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update leave. Please try again.",
                    icon: "error",
                });
            });
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
                    <h2>Edit Leave</h2>
                    <form onSubmit={handleSubmit}>
                        {CurrRole !== 'Employee' && (
                            <div className="mb-3">
                                <label className="form-label">Employee</label>
                                <select
                                    className="form-control"
                                    name="Employee_id"
                                    value={leave.Employee_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employeeList.map(emp => (
                                        <option key={emp.Employee_id} value={emp.Employee_id}>
                                            {emp.Employee_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Leave Type</label>
                            <select
                                className="form-control"
                                name="Leave_type"
                                value={leave.Leave_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Leave Type</option>
                                {leaveOptions.map(option => (
                                     <option key={option.id} value={option.leave_name}>
                                                {option.leave_name}
                                            </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="Start"
                                value={leave.Start}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="End"
                                value={leave.End}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason</label>
                            <textarea
                                className="form-control"
                                name="Reason"
                                value={leave.Reason}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Remark (Optional)</label>
                            <textarea
                                className="form-control"
                                name="Remark"
                                value={leave.Remark}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            {CurrRole !== 'Employee' && (  
                                <><label className="form-label">Leave Type</label>
                            <select
                                className="form-control"
                                name="Status"
                                value={leave.Status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Leave Type</option>
                                {leaveStatus.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                                    </select>
                            </>)}
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
