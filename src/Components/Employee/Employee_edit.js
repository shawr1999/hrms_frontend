import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditEmployee = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        Employee_id: '',
        Employee_name: '',
        Employee_phone: '',
        Date_of_Birth: '',
        Gender: '',
        Email: '',
        Password: '',
        Address: '',
        Branch: '',
        Department: '',
        Role: '',
        Designation: '',
        Date_Of_Joining: '',
        Employee_type: '',
        Document: '',
        Account_holder: '',
        Account_number: '',
        Bank_name: '',
        Bank_identifier_code: '',
        Branch_location: '',
        Tax_payer_id: ''
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Fetch employee data
        if (employeeId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/employee_view/${employeeId}/`)
                .then(response => response.json())
                .then(data => setEmployee(data))
                .catch(error => console.error('Error fetching employee data:', error));
        }

        // Fetch roles
        fetch('https://shawr1999.pythonanywhere.com//api/roles_view/')
            .then(response => response.json())
            .then(data => setRoles(data))
            .catch(error => console.error('Error fetching roles:', error));
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({ ...prevEmployee, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in employee) {
            formData.append(key, employee[key]);
        }

        const response = await fetch(`https://shawr1999.pythonanywhere.com//api/employee_view/${employeeId}/`, {
            method: 'PUT',
            body: formData
        });
        const data = await response.json();
        if (response.status === 200) {
            Swal.fire({
                title: "Success!",
                text: "Employee updated successfully",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/employee');
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: JSON.stringify(data),
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(employee).map((key) => (
                        <div className="mb-3" key={key}>
                            <label className="form-label">{key.replace(/_/g, ' ')}</label>
                            {key === 'Role' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={key === 'Password' ? 'password' : 'text'}
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
