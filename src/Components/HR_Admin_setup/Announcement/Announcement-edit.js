import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Announcement from './Announcement';

export default function Announcement_Edit() {
    const { AnnouncementId } = useParams();
    const navigate = useNavigate();
    const [Announcement, setAnnouncement] = useState({
            Announcement_title:'',
            Branch:'',
            Department:'',
            Employee:'',
            Announcement_start_date: '',
            Announcement_end_date:'',
            Announcement_description:'',
            // Skill_box:'',
        // department_state: '',
        // department_district: '',
        // department_address: ''
    });

    useEffect(() => {
        if (AnnouncementId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/announcements/${AnnouncementId}/`)
                .then(response => response.json())
                .then(data => setAnnouncement(data))
                .catch(error => console.error('Error fetching Announcement data:', error));
        }
    }, [AnnouncementId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prevAnnouncement => ({ ...prevAnnouncement, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/announcements/${Announcement.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Announcement)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Document type updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Announcement'); // Redirect to home page after clicking "OK"
                    }
                });
                // Redirect to home page after save
            })
            .catch(error => console.error('Error updating department:', error));
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <div className="card p-3">
            <h2>Edit department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Announcement_title" value={Announcement.Announcement_title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Branch" value={Announcement.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Department" value={Announcement.Department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Employee" value={Announcement.Employee} onChange={handleChange} />
                </div>
                 <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Announcement_start_date" value={Announcement.Announcement_start_date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Announcement_end_date" value={Announcement.Announcement_end_date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Announcement_description" value={Announcement.Announcement_description} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Skill_box" value={Announcement.Skill_box} onChange={handleChange} />
                </div> */}
               
                
                {/* <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="department_state" value={department.department_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="department_district" value={department.department_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="department_address" value={department.department_address} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
