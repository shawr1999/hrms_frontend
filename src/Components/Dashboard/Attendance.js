import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const ClockIn = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    
    const Data = {
        UserId: localStorage.getItem('Curr_Emp_id')
    };

    const handleClockIn = () => {
        axios.post('https://shawr1999.pythonanywhere.com//api/clock_in/', Data, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
})
.then(response => {
    setMessage(response.data.message || response.data.error);
    Swal.fire({
                title: "Success!",
                text: response.data.message || "Clock In successful!",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/');
            });
})
.catch(err => {
    if (err.response) {
        // Handle non-200 responses
        setMessage(err.response.data.error || 'Something went wrong!');
        Swal.fire({
                title: "Warning!",
                text: err.response.data.error || "Clock In successful!",
                icon: "warning",
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/');
            });
    } else {
        // Handle network or other errors
        setMessage('Something went wrong!');
    }
    console.error(err);
});
    };
    return (
        <div>
            <button onClick={handleClockIn}>Clock In</button>
            {message && <p>{message}</p>}
        </div>
    );
};

const ClockOut = () => {
    const [message, setMessage] = useState(null);
    
    const Data = {
        UserId: localStorage.getItem('Curr_Emp_id')
    };

    const handleClockOut = () => {
        axios.post('https://shawr1999.pythonanywhere.com//api/clock_out/', Data, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data)
        })
        .then(response => {
            setMessage(response.data.message || response.data.error);
        })
        .catch(err => {
            setMessage('Something went wrong!');
            console.error(err);
        });
    };

    return (
        <div>
            <button onClick={handleClockOut}>Clock Out</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export { ClockIn, ClockOut };
