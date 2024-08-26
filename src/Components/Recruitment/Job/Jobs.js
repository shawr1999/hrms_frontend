import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Job_create() {
    const navigate = useNavigate();
    const [Job, setJob] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Title, setTitle] = useState('');
    const [Branch, setBranch] = useState('');
    const [Category, setCategory] = useState('');
    const [No_of_positions, setNo_of_positions] = useState('');
    const [Start, setStart] = useState('');
    const [End, setEnd] = useState('');
    const [Skill_box, setSkill_box] = useState('');
    const [Status, setStatus] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [JobId, setJobId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/jobs/')
            .then(response => response.json())
            .then(data => {
                setJobId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Job => [
                        Job.Title,
                        Job.Branch,
                        Job.Category,
                        Job.No_of_positions,
                        Job.Status,
                        Job.Start,
                        Job.End,
                        Job.Skill_box,
                        // Job.Start,
                        // branch.branch_state,
                        // branch.branch_district,
                        // branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${Job.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Job.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Branch" },
                        { title: "Category" },
                        { title: "No_of_positions" },
                        { title: "Status" },
                        { title: "Start" },
                        { title: "End" },
                        { title: "Skill_box" },
                        { title: "Action" }
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
        const JobId = $(event.currentTarget).data('id');
        navigate(`/edit-Job/${JobId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Title: Title,
        Branch: Branch,
        Category: Category,
        No_of_positions: No_of_positions,
        Status: Status,
        Start: Start,
        End: End,
        Skill_box: Skill_box,
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/jobs-create/', formData)
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
        setJobId(response.data.Leave_id);
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
    const JobId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/jobs/${JobId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setJob(Job.filter(Job => Job.id !== JobId));
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
         Job Name:
        </label>
        <input type="text" className='form-control' value={Title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job Name:
        </label>
        <input type="text" className='form-control' value={Branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job Name:
        </label>
        <input type="text" className='form-control' value={Category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job Name:
        </label>
        <input type="text" className='form-control' value={No_of_positions} onChange={(e) => setNo_of_positions(e.target.value)} required />
        </div>
           <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job Name:
        </label>
        <input type="text" className='form-control' value={Start} onChange={(e) => setStart(e.target.value)} required />
                                </div>
                                
          <div className="form-group">  
        <label>
         Job Name:
        </label>
        <input type="text" className='form-control' value={End} onChange={(e) => setEnd(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Skill_box} onChange={(e) => setSkill_box(e.target.value)} required />
        </div>
       
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
