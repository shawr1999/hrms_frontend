import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
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

    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [genders] = useState(['Male', 'Female', 'Other']);
    const [employee_type] = useState(['On-Roll', 'Off-Roll', 'Trainee', 'Third Party', 'Other']);

    useEffect(() => {
        // Fetch roles
        fetch('https://shawr1999.pythonanywhere.com//api/roles_view/')
            .then(response => response.json())
            .then(data => setRoles(data))
            .catch(error => console.error('Error fetching roles:', error));

        fetch('https://shawr1999.pythonanywhere.com//api/branch_view/')
            .then(response => response.json())
            .then(data => setBranches(data))
            .catch(error => console.error('Error fetching roles:', error));

        fetch('https://shawr1999.pythonanywhere.com//api/department_view/')
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error('Error fetching roles:', error));

        fetch('https://shawr1999.pythonanywhere.com//api/designation_view/')
            .then(response => response.json())
            .then(data => setDesignations(data))
            .catch(error => console.error('Error fetching roles:', error));

        // Fetch employees
        fetch('https://shawr1999.pythonanywhere.com//api/employee_view/')
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
                $('#employeeTable').DataTable();
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({ ...prevEmployee, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://shawr1999.pythonanywhere.com//api/employee_create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        const data = await response.json();
        if (response.status === 201) {
            Swal.fire({
                title: "Success!",
                text: "Employee created successfully",
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

    const handleDelete = async (id) => {
        const response = await fetch(`https://shawr1999.pythonanywhere.com//api/employee_view/${id}/`, {
            method: 'DELETE',
        });
        if (response.status === 204) {
            Swal.fire({
                title: "Deleted!",
                text: "Employee deleted successfully",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                setEmployees(employees.filter(emp => emp.id !== id));
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete employee",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Create Employee</h2>
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
                            ) : key === 'Gender' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    {genders.map(gender => (
                                        <option key={gender} value={gender}>{gender}</option>
                                    ))}
                                </select>
                                ) :
                                    key === 'Employee_type' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    {employee_type.map(emplyeeType => (
                                        <option key={emplyeeType} value={emplyeeType}>{emplyeeType}</option>
                                    ))}
                                </select>
                                ) :
                                key === 'Branch' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.branch_state}>{branch.branch_state}</option>
                                    ))}
                                </select>
                                    ) :
                                        key === 'Department' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.department_name}>{department.department_name}</option>
                                    ))}
                                </select>
                                    ) :
                                        key === 'Designation' ? (
                                <select
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    {designations.map(designation => (
                                        <option key={designation.id} value={designation.designation_name}>{designation.designation_name}</option>
                                    ))}
                                </select>
                                    ) :
                                        (
                                <input
                                    type={
                                        key === 'Password' ? 'password' :
                                        key === 'Employee_phone' ? 'number' :
                                        key === 'Date_of_Birth' || key === 'Date_Of_Joining' ? 'date' :
                                        'text'
                                    }
                                    className="form-control"
                                    name={key}
                                    value={employee[key]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>

                <h2>Employees List</h2>
                <table id="employeeTable" className="display">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.Employee_id}</td>
                                <td>{emp.Employee_name}</td>
                                <td>{emp.Employee_phone}</td>
                                <td>{emp.Email}</td>
                                <td>
                                    <button onClick={() => navigate(`/edit-employees/${emp.id}`)} className="btn btn-warning">Edit</button>
                                    <button onClick={() => handleDelete(emp.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateEmployee;
