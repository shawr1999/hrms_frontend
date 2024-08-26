import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

$.DataTable = require('datatables.net');

const RoleCreateForm = () => {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/roles_view/')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
                axios.get('https://shawr1999.pythonanywhere.com//api/modules/')
                    .then(modulesResponse => {
                        const modulesData = modulesResponse.data;
                        setModules(modulesData);
                        const table = $(`#${tableName}`).DataTable({
                            data: data.map(role => [
                                role.name,
                                role.role_permissions.map(rp => {
                                    const module = modulesData.find(m => m.id === rp.module);
                                    return module ? module.name : 'Unknown Module';
                                }).join(', '),
                                role.role_permissions.map(rp => rp.permissions.join(', ')).join('; '),
                                `<button class="edit-btn btn btn-primary" data-id="${role.id}">Edit</button>
                                 <button class="delete-btn btn btn-danger" data-id="${role.id}">Delete</button>`
                            ]),
                            columns: [
                                { title: "Role Name" },
                                { title: "Modules" },
                                { title: "Permissions" },
                                { title: "Actions" }
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
                    .catch(error => console.error('Error fetching modules:', error));
            })
            .catch(error => console.error('Error fetching roles data:', error));
    }, []);

    const handleEdit = (event) => {
        const roleId = $(event.currentTarget).data('id');
        navigate(`/edit-role/${roleId}`);
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
                const roleId = $(event.currentTarget).data('id');
                axios.delete(`https://shawr1999.pythonanywhere.com//api/roles_view/${roleId}/`)
                    .then(response => {
                        if (response.status === 204) {
                            setRoles(roles.filter(role => role.id !== roleId));
                            Swal.fire("Deleted!", "Your role has been deleted.", "success")
                                .then(() => {
                                    window.location.reload();
                                });
                        } else {
                            console.error('Error deleting role');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
    };

    useEffect(() => {
        axios.get('https://shawr1999.pythonanywhere.com//api/modules/')
            .then(response => setModules(response.data))
            .catch(error => console.error('Error fetching modules:', error));

        axios.get('https://shawr1999.pythonanywhere.com//api/permissions/')
            .then(response => setPermissions(response.data))
            .catch(error => console.error('Error fetching permissions:', error));
    }, []);

    const handleModuleChange = (moduleId) => {
        setRolePermissions(prevPermissions => {
            if (prevPermissions.some(rp => rp.module === moduleId)) {
                return prevPermissions.filter(rp => rp.module !== moduleId);
            } else {
                return [...prevPermissions, { module: moduleId, permissions: [] }];
            }
        });
    };

    const handlePermissionChange = (moduleId, permissionId) => {
        setRolePermissions(prevPermissions => {
            return prevPermissions.map(rp => {
                if (rp.module === moduleId) {
                    if (rp.permissions.includes(permissionId)) {
                        return { ...rp, permissions: rp.permissions.filter(p => p !== permissionId) };
                    } else {
                        return { ...rp, permissions: [...rp.permissions, permissionId] };
                    }
                }
                return rp;
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: roleName,
            role_permissions: rolePermissions
        };

        axios.post('https://shawr1999.pythonanywhere.com//api/roles_create/', formData)
            .then(response => {
                Swal.fire('Good job!', 'Role created successfully!', 'success');
                setRoleName('');
                setRolePermissions([]);
                window.location.reload(); // Reload the page to show the new role in the table
            })
            .catch(error => {
                console.error('Error creating role:', error);
                Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
            });
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Create New Role</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Role Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        {modules.map((module) => (
                            <div key={module.id} className="mb-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={module.id}
                                        onChange={() => handleModuleChange(module.id)}
                                        checked={rolePermissions.some(rp => rp.module === module.id)}
                                    />
                                    <label className="form-check-label">{module.name}</label>
                                </div>
                                {rolePermissions.some(rp => rp.module === module.id) && (
                                    <div className="ms-3">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value={permission.id}
                                                    onChange={() => handlePermissionChange(module.id, permission.id)}
                                                    checked={rolePermissions.find(rp => rp.module === module.id).permissions.includes(permission.id)}
                                                />
                                                <label className="form-check-label">{permission.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary">Create Role</button>
                </form>

                <table className="display" width="100%" id={tableName} ref={tableRef}></table>
            </div>
        </div>
    );
};

export default RoleCreateForm;
