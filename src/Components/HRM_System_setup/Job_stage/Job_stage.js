import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Job_stage_create() {
    const navigate = useNavigate();
    const [Job_stage, setJob_stage] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Job_stage_title, setJob_stage_title] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [Job_stageId, setJob_stageId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/job_stage_view/')
            .then(response => response.json())
            .then(data => {
                setJob_stageId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Job_stage => [
                        Job_stage.Job_stage_title,
                        // branch.branch_state,
                        // branch.branch_district,
                        // branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${Job_stage.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Job_stage.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Training name" },
                        // { title: "State" },
                        // { title: "District" },
                        // { title: "Address" },
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
            .catch(error => console.error('Error fetching branch data:', error));
    }, []);

    const handleEdit = (event) => {
        const Job_stageId = $(event.currentTarget).data('id');
        navigate(`/edit-Job_stage/${Job_stageId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Job_stage_title: Job_stage_title
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/job_stage_create/', formData)
        .then(response => {
            Swal.fire({
                title: "Good job!",
                text: response.data.message + "with Leave Id:-" + response.data.Leave_id,
                icon: "success",
               
            }).then((result) => {
        if (result.isConfirmed) {
            // history.push('/'); // Redirect to home page after clicking "OK"
            window.location.reload();
        }
      });
        setResponseMessage(response.data.message);
        setJob_stageId(response.data.Leave_id);
      })
      .catch(error => {
        console.error('There was an error!', error.response.data);
        setResponseMessage('An error occurred. Please try again.');
      });
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
    // 
    const Job_stageId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/job_stage_view/${Job_stageId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setJob_stage(Job_stage.filter(Job_stage => Job_stage.id !== Job_stageId));
                    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(); // Redirect to home page after clicking "OK"
                    }
                });
                } else {
                    console.error('Error deleting Leave');
                }
            })
            .catch(error => console.error('Error:', error));
  }
});
        
    };

    return (
        <div>
            <div className="main">

                <div className="container-fluid">
                    <div className="card p-3">
                                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newLeave">
                Create New Leave
          </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>


                
            </div>
            <div class="modal fade" id="newLeave">
          <form onSubmit={handleSubmit}>
    <div class="modal-dialog">
      <div class="modal-content">
      
        <div class="modal-header">
          <h5 class="modal-title ">Add New Leave</h5>
          {/* <button type="button" class="close" data-dismiss="modal">×</button> */}
        </div>
        
        <div class="modal-body">
          <div className="form-group">  
        <label>
         Job_stage Name:
        </label>
        <input type="text" className='form-control' value={Job_stage_title} onChange={(e) => setJob_stage_title(e.target.value)} required />
        </div>
          {/* <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={required_feild} onChange={(e) => setrequired_feild(e.target.value)} required />
        </div> */}
    {/* <div className="form-group">
        <label>
          Branch Country:
          
                              </label>
                              <select value={branchCountry} className='form-control' onChange={(e) => setBranchCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
            ))}
                                  </select>
            </div>
            <div className="form-group">
        <label>
          Branch State:
        </label>
          <select value={branchState} className='form-control' onChange={(e) => setBranchState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
            ))}
                                  </select>
                                  </div>
      <div className="form-group">
        <label>
          Branch District:
        </label>
          <select className='form-control' value={branchDistrict} onChange={(e) => setBranchDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.name} value={district.name}>{district.name}</option>
            ))}
                                  </select>
                                  </div>
       <div className="form-group">
        <label>
          Branch Address:
        </label>
          <textarea type="text" className='form-control' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} required />
                               
                                  </div> */}
        </div>
        
        <div class="modal-footer">
        <button type="button" className="btn" style={{ background:"#f8f9fa" }} data-dismiss="modal">Close</button>
        <button type="submit" className='btn text-white' style={{ background:"#8F76FF" }}>Submit</button>

        </div>
        
      </div>
            </div>
             </form>
              </div>
            
        </div>
    );
}
