import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) navigate('/login');
        })
        .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} required />
            <input name="email" onChange={handleChange} required />
            <input name="password" type="password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
