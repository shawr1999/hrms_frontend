import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Indicator_create() {
    const navigate = useNavigate();
    const [Indicator, setIndicator] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Branch, setBranch] = useState('');
    const [Department, setDepartment] = useState('');
    const [Designation, setDesignation] = useState('');
    const [Outstanding_skilled, setOutstanding_skilled] = useState('');
    const [Outstanding_unskilled, setOutstanding_unskilled] = useState('');
    const [Average_skilled, setAverage_skilled] = useState('');
    // const [Ref, setRef] = useState('');
    const [Average_unskilled, setAverage_unskilled] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchAverage_unskilled, setBranchAverage_unskilled] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [IndicatorId, setIndicatorId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/indicators/')
            .then(response => response.json())
            .then(data => {
                setIndicatorId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Indicator => [
                        Indicator.Branch,
                        Indicator.Department,
                        Indicator.Designation,
                        Indicator.Outstanding_skilled,
                        Indicator.Outstanding_unskilled,
                        Indicator.Average_skilled,
                        // Indicator.Ref,
                        Indicator.Average_unskilled,
                        // First_name.First_name_state,
                        // First_name.First_name_district,
                        // First_name.First_name_Average_unskilled,
                        `<button class="edit-btn btn btn-primary" data-id="${Indicator.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Indicator.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Branch" },
                        { title: "Department" },
                        { title: "Designation" },
                        { title: "Outstanding_skilled" },
                        { title: "Outstanding_unskilled" },
                        { title: "Average_skilled" },
                        // { title: "Ref" },
                        { title: "Average_unskilled" },
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
        const IndicatorId = $(event.currentTarget).data('id');
        navigate(`/edit-Indicator/${IndicatorId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Branch: Branch,
        Department: Department,
        Designation: Designation,
        Outstanding_skilled: Outstanding_skilled,
        Outstanding_unskilled: Outstanding_unskilled,
        Average_skilled: Average_skilled,
        // Ref: Ref,
        Average_unskilled: Average_unskilled,
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/indicators-create/', formData)
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
        setIndicatorId(response.data.Leave_id);
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
  icon: "Indicator",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    // 
    const IndicatorId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/indicators/${IndicatorId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setIndicator(Indicator.filter(Indicator => Indicator.id !== IndicatorId));
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
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Designation} onChange={(e) => setDesignation(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Outstanding_skilled} onChange={(e) => setOutstanding_skilled(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Outstanding_unskilled} onChange={(e) => setOutstanding_unskilled(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Indicator Name:
        </label>
        <input type="text" className='form-control' value={Average_skilled} onChange={(e) => setAverage_skilled(e.target.value)} required />
        </div>
          {/* <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Ref} onChange={(e) => setRef(e.target.value)} required />
        </div> */}
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Average_unskilled} onChange={(e) => setAverage_unskilled(e.target.value)} required />
        </div>
    {/* <div className="form-group">
        <label>
          First_name Country:
          
                              </label>
                              <select value={First_nameCountry} className='form-control' onChange={(e) => setFirst_nameCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
            ))}
                                  </select>
            </div>
            <div className="form-group">
        <label>
          First_name State:
        </label>
          <select value={First_nameState} className='form-control' onChange={(e) => setFirst_nameState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
            ))}
                                  </select>
                                  </div>
      <div className="form-group">
        <label>
          First_name District:
        </label>
          <select className='form-control' value={First_nameDistrict} onChange={(e) => setFirst_nameDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.name} value={district.name}>{district.name}</option>
            ))}
                                  </select>
                                  </div>
       <div className="form-group">
        <label>
          First_name Average_unskilled:
        </label>
          <textarea type="text" className='form-control' value={First_nameAverage_unskilled} onChange={(e) => setFirst_nameAverage_unskilled(e.target.value)} required />
                               
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
