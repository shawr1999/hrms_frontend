import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function BranchView() {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [branchType, setBranchType] = useState('');
  const [branchCountry, setBranchCountry] = useState('');
  const [branchState, setBranchState] = useState('');
  const [branchDistrict, setBranchDistrict] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [branchId, setBranchId] = useState('');

  const countries = Country.getAllCountries();
  const states = branchCountry ? State.getStatesOfCountry(branchCountry) : [];
  const districts = branchState ? City.getCitiesOfState(branchCountry, branchState) : [];

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/branch_view/')
            .then(response => response.json())
            .then(data => {
                setBranches(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(branch => [
                        branch.branch_type,
                        branch.branch_country,
                        branch.branch_state,
                        branch.branch_district,
                        branch.branch_address,
                        `<button class="edit-btn btn btn-primary" data-id="${branch.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${branch.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Branch Type" },
                        { title: "Country" },
                        { title: "State" },
                        { title: "District" },
                        { title: "Address" },
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
        const branchId = $(event.currentTarget).data('id');
        navigate(`/edit-branch/${branchId}`);
    };

      const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      branch_type: branchType,
      branch_country: branchCountry,
      branch_state: branchState,
      branch_district: branchDistrict,
      branch_address: branchAddress
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/branch_create/', formData)
        .then(response => {
            Swal.fire({
                title: "Good job!",
                text: response.data.message + "with Branch Id:-" + response.data.branch_id,
                icon: "success",
               
            }).then((result) => {
        if (result.isConfirmed) {
            // history.push('/'); // Redirect to home page after clicking "OK"
            // window.location.reload();
            window.location.reload();
        }
      });
        // setResponseMessage(response.data.message);
        // setBranchId(response.data.branch_id);
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
    const branchId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/branch_view/${branchId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setBranches(branches.filter(branch => branch.id !== branchId));
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
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newbranch">
                Create New Branch
            </button>
                        <table className="display" width="100%" id={tableName} ref={tableRef}></table>
                    </div>
                </div>


                
            </div>
            <div class="modal fade" id="newbranch">
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
          Branch Type:
        </label>
        <input type="text" className='form-control' value={branchType} onChange={(e) => setBranchType(e.target.value)} required />
        </div>
    <div className="form-group">
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
                               
                                  </div>
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
