import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Transfer_create() {
    const navigate = useNavigate();
    const [Transfer, setTransfer] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Employee, setEmployee] = useState('');
    const [Branch, setBranch] = useState('');
    const [Department, setDepartment] = useState('');
    const [Date, setDate] = useState('');
    const [Description, setDescription] = useState('');
    const User_Role_Name = localStorage.getItem('Curr_User');
    // const [Due, setDue] = useState('');
    // const [Description, setDescription] = useState('');
    // const [Description, setDescription] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [TransferId, setTransferId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/transfers/')
            .then(response => response.json())
            .then(data => {
                setTransferId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Transfer => [
                        Transfer.Employee,
                        Transfer.Branch,
                        Transfer.Department,
                        Transfer.Date,
                        Transfer.Description,
                        // Transfer.Due,
                        // Transfer.Description,
                        // Transfer.Description,
                        // branch.branch_state,
                        // branch.branch_district,
                      // branch.branch_address,
                        User_Role_Name !== "Employee" &&
                        `<button class="edit-btn btn btn-primary" data-id="${Transfer.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Transfer.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Employee" },
                        { title: "Branch" },
                        { title: "Department" },
                        { title: "Date" },
                        { title: "Description" },
                        // { title: "Due" },
                        // { title: "Description" },
                       User_Role_Name !== "Employee" && { title: "Action" }
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
        const TransferId = $(event.currentTarget).data('id');
        navigate(`/edit-Transfer/${TransferId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Employee: Employee,
        Branch: Branch,
        Department: Department,
        Date: Date,
        Description: Description,
        // Due: Due,
        // Description: Description
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/transfers-create/', formData)
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
        setTransferId(response.data.Leave_id);
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
  icon: "Transfer",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    // 
    const TransferId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/transfers/${TransferId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setTransfer(Transfer.filter(Transfer => Transfer.id !== TransferId));
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
              {User_Role_Name !== "Employee" && (
                                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newLeave">
                Create New Leave
          </button>
                )}
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
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Employee} onChange={(e) => setEmployee(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Date} onChange={(e) => setDate(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
          {/* <div className="form-group">  
        <label>
         Transfer Name:
        </label>
        <input type="text" className='form-control' value={Due} onChange={(e) => setDue(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Description} onChange={(e) => setDescription(e.target.value)} required />
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
