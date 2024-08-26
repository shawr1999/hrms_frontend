import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Job_On_Boarding_create() {
    const navigate = useNavigate();
    const [Job_On_Boarding, setJob_On_Boarding] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Interviewer, setInterviewer] = useState('');
    const [Joining_date, setJoining_date] = useState('');
    const [Days_of_week, setDays_of_week] = useState('');
    const [Salary, setSalary] = useState('');
    const [Salary_type, setSalary_type] = useState('');
    const [Salary_duration, setSalary_duration] = useState('');
    const [Job_Type, setJob_Type] = useState('');
    const [Status, setStatus] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [Job_On_BoardingId, setJob_On_BoardingId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/job-on-boarding/')
            .then(response => response.json())
            .then(data => {
                setJob_On_BoardingId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Job_On_Boarding => [
                        Job_On_Boarding.Interviewer,
                        Job_On_Boarding.Joining_date,
                        Job_On_Boarding.Days_of_week,
                        Job_On_Boarding.Salary,
                        Job_On_Boarding.Salary_type,
                        Job_On_Boarding.Status,
                        // Job_On_Boarding.Salary_duration,
                        // Job_On_Boarding.Job_Type,
                        // Job_On_Boarding.Salary_type,
                        // branch.branch_state,
                        // branch.branch_district,
                        // branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${Job_On_Boarding.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Job_On_Boarding.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Joining_date" },
                        { title: "Days_of_week" },
                        { title: "Salary" },
                        { title: "Salary_type" },
                        { title: "Status" },
                        // { title: "Salary_duration" },
                        // { title: "Job_Type" },
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
        const Job_On_BoardingId = $(event.currentTarget).data('id');
        navigate(`/edit-Job_On_Boarding/${Job_On_BoardingId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Interviewer: Interviewer,
        Joining_date: Joining_date,
        Days_of_week: Days_of_week,
        Salary: Salary,
        Salary_type: Salary_type,
        Salary_duration: Salary_duration,
        Job_Type: Job_Type,
        Status: Status,
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/job-on-boarding-create/', formData)
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
        setJob_On_BoardingId(response.data.Leave_id);
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
    const Job_On_BoardingId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/job-on-boarding/${Job_On_BoardingId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setJob_On_Boarding(Job_On_Boarding.filter(Job_On_Boarding => Job_On_Boarding.id !== Job_On_BoardingId));
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
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Interviewer} onChange={(e) => setInterviewer(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Joining_date} onChange={(e) => setJoining_date(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Days_of_week} onChange={(e) => setDays_of_week(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Salary_type} onChange={(e) => setSalary_type(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Job_On_Boarding Name:
        </label>
        <input type="text" className='form-control' value={Salary_duration} onChange={(e) => setSalary_duration(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Job_Type} onChange={(e) => setJob_Type(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Status} onChange={(e) => setStatus(e.target.value)} required />
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
