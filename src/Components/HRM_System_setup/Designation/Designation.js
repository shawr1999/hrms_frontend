import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function DesignationView() {
    const navigate = useNavigate();
    const [designations, setdesignations] = useState([]);
    const [Department, setDepartment] = useState([])
    const tableRef = useRef();
    const tableName = "table1";
    const [designationdepartment, setdesignationdepartment] = useState('');
  const [designationName, setdesignationName] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [designationId, setdesignationId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/designation_view/')
            .then(response => response.json())
            .then(data => {
                setdesignations(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(designation => [
                        designation.designation_department,
                        designation.designation_name,
                        // branch.branch_state,
                        // branch.branch_district,
                        // branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${designation.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${designation.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Department" },
                        { title: "Designation" },
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

   useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/department_view/')
            .then(response => response.json())
            .then(data => setDepartment(data))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const handleEdit = (event) => {
        const designationId = $(event.currentTarget).data('id');
        navigate(`/edit-designation/${designationId}`);
    };


const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      designation_department: designationdepartment,
      designation_name: designationName
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/designation_create/', formData)
        .then(response => {
            Swal.fire({
                title: "Good job!",
                text: response.data.message + "with designation Id:-" + response.data.designation_id,
                icon: "success",
               
            }).then((result) => {
        if (result.isConfirmed) {
            // history.push('/'); // Redirect to home page after clicking "OK"
            window.location.reload();
            // navigate("/designation")
        }
      });
        setResponseMessage(response.data.message);
        setdesignationId(response.data.designation_id);
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
    const designationId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/designation_view/${designationId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setdesignations(designations.filter(designation => designation.id !== designationId));
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
                    console.error('Error deleting branch');
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
                                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newdesignation">
                Create New designation
          </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>


                
            </div>
            <div class="modal fade" id="newdesignation">
          <form onSubmit={handleSubmit}>
    <div class="modal-dialog">
      <div class="modal-content">
      
        <div class="modal-header">
          <h5 class="modal-title ">Add New Branch</h5>
          {/* <button type="button" class="close" data-dismiss="modal">×</button> */}
        </div>
        
        <div class="modal-body">
          <div className="form-group">  
        <label>
         Department:
        </label>
<select className="form-control" value={designationdepartment} onChange={(e) => setdesignationdepartment(e.target.value)} required>
                        <option value="">Select Department</option>
                        {Department.map(department => (
                            <option key={department.department_name} value={department.department_name}>{department.department_name}</option>
                        ))}
                    </select>        </div>
          <div className="form-group">  
        <label>
          Designation Name:
        </label>
        <input type="text" className='form-control' value={designationName} onChange={(e) => setdesignationName(e.target.value)} required />
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
