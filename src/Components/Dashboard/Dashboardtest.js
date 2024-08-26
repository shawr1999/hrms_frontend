import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClockIn, ClockOut } from './Attendance';
const Dashboard = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <div>
            <div className="main">
            <h1>Dashboard</h1>  
            <ClockIn/>
            <ClockOut/>
            <button onClick={handleLogout}>Logout</button>
            </div>
            </div>
    );
};

export default Dashboard;
