import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

$.DataTable = require('datatables.net');

export default function EmployeeAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [user, setUser] = useState([]);
    const tableRef = useRef();
    const tableName = "attendanceTable";

    useEffect(() => {
        // Fetch all necessary data
        const fetchAttendance = fetch('https://shawr1999.pythonanywhere.com//api/attandance/')
            .then(response => response.json())
            .catch(error => console.error('Error fetching attendance data:', error));
        
        const fetchEmployees = fetch('https://shawr1999.pythonanywhere.com//api/employee_view/')
            .then(response => response.json())
            .catch(error => console.error('Error fetching employee data:', error));
        
        const fetchUsers = fetch('https://shawr1999.pythonanywhere.com//api/user/')
            .then(response => response.json())
            .catch(error => console.error('Error fetching user data:', error));

        // When all data is fetched
        Promise.all([fetchAttendance, fetchEmployees, fetchUsers])
            .then(([attendance, employees, users]) => {
                setAttendanceData(attendance);
                setEmployee(employees);
                setUser(users);

                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().split('T')[0];

                // Process data to include only today's records or 'Absent' where applicable
                const processedData = employees.map(emp => {
                    const user = users.find(us => us.email === emp.Email);
                    const attendanceRecord = attendance.find(att => att.user === user.id && att.clock_in?.startsWith(today));

                    // Extract the time portion from the timestamp
                    const formatTime = (timestamp) => {
                        if (!timestamp) return 'Absent';
                        const date = new Date(timestamp);
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        return `${hours}:${minutes}`;
                    };
                    
                    return {
                        EmployeeName: emp.Employee_name,
                        ClockIn: formatTime(attendanceRecord?.clock_in),
                        ClockOut: formatTime(attendanceRecord?.clock_out)
                    };
                });

                // Initialize DataTable
                const table = $(`#${tableName}`).DataTable({
                    data: processedData.map(att => [
                        att.EmployeeName,
                        att.ClockIn,
                        att.ClockOut
                    ]),
                    columns: [
                        { title: "Employee Name" },
                        { title: "Clock In Time" },
                        { title: "Clock Out Time" }
                    ],
                    destroy: true,
                    searching: true,
                });

                return () => {
                    table.destroy();
                };
            });
    }, []);

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
                    <h3 className="mb-4">Employee Attendance</h3>
                    <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                </div>
            </div>
        </div>
    );
}
