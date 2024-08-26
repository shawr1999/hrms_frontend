import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";

const RoleEditForm = () => {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {
        axios.get('https://shawr1999.pythonanywhere.com//api/modules/')
            .then(response => setModules(response.data))
            .catch(error => console.error('Error fetching modules:', error));

        axios.get('https://shawr1999.pythonanywhere.com//api/permissions/')
            .then(response => setPermissions(response.data))
            .catch(error => console.error('Error fetching permissions:', error));
        
        axios.get(`https://shawr1999.pythonanywhere.com//api/roles_view/${roleId}/`)
            .then(response => {
                const roleData = response.data;
                setRoleName(roleData.name);
                setRolePermissions(roleData.role_permissions.map(rp => ({
                    module: rp.module,
                    permissions: rp.permissions
                })));
            })
            .catch(error => console.error('Error fetching role data:', error));
    }, [roleId]);

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

        axios.put(`https://shawr1999.pythonanywhere.com//api/roles_update/${roleId}/`, formData)
            .then(response => {
                Swal.fire('Good job!', 'Role updated successfully!', 'success');
                navigate('/roles'); // Redirect to roles list page after updating
            })
            .catch(error => {
                console.error('Error updating role:', error);
                Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
            });
    };

    return (
        <div className="main">
            <div className="container">
                <h2>Edit Role</h2>
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
                    <button type="submit" className="btn btn-primary">Update Role</button>
                </form>
            </div>
        </div>
    );
};

export default RoleEditForm;
