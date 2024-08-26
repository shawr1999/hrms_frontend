import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Indicator from './Indicator';

export default function Indicator_Edit() {
    const { IndicatorId } = useParams();
    const navigate = useNavigate();
    const [Indicator, setIndicator] = useState({
            Branch:'',
            Department:'',
            Designation:'',
            Outstanding_skilled:'',
            Outstanding_unskilled:'',
            Average_skilled:'',
            Average_unskilled:'',
        // Average_unskilled: ''
        // Last_name_state: '',
        // Last_name_district: '',
        // Last_name_Email: ''
    });

    useEffect(() => {
        if (IndicatorId) {
            fetch(`https://shawr1999.pythonanywhere.com//api/indicators/${IndicatorId}/`)
                .then(response => response.json())
                .then(data => setIndicator(data))
                .catch(error => console.error('Error fetching Indicator data:', error));
        }
    }, [IndicatorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndicator(prevIndicator => ({ ...prevIndicator, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://shawr1999.pythonanywhere.com//api/indicators/${Indicator.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Indicator)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Success!",
                    text: "Document type upLast_named successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Indicator'); // Redirect to home page after clicking "OK"
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
            <h2>Edit indicators</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Branch" value={Indicator.Branch} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Department" value={Indicator.Department} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Designation" value={Indicator.Designation} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Outstanding_skilled" value={Indicator.Outstanding_skilled} onChange={handleChange} />
                </div> 
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Outstanding_unskilled" value={Indicator.Outstanding_unskilled} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Average_skilled" value={Indicator.Average_skilled} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Average_unskilled" value={Indicator.Average_unskilled} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Document Name</label>
                    <input type="text" className="form-control" name="Average_unskilled" value={Indicator.Average_unskilled} onChange={handleChange} />
                </div> */}
                
                {/* <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="Last_name_state" value={Last_name.Last_name_state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="Last_name_district" value={Last_name.Last_name_district} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" name="Last_name_Email" value={Last_name.Last_name_Email} onChange={handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
                </div>
                </div>
        </div>
    );
}
