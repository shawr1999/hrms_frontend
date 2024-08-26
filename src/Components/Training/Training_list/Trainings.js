import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Training_create() {
    const navigate = useNavigate();
    const [Training, setTraining] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Branch, setBranch] = useState('');
    const [Trainer_option, setTrainer_option] = useState('');
    const [Training_type, setTraining_type] = useState('');
    const [Trainer, setTrainer] = useState('');
    const [Training_cost, setTraining_cost] = useState('');
    const [Employee, setEmployee] = useState('');
    const [Start, setStart] = useState('');
    const [End, setEnd] = useState('');
    const [Description, setDescription] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchTraining_cost, setBranchTraining_cost] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [TrainingId, setTrainingId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/trainings/')
            .then(response => response.json())
            .then(data => {
                setTrainingId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Training => [
                        Training.Branch,
                        Training.Trainer_option,
                        Training.Training_type,
                        Training.Trainer,
                        Training.Training_cost,
                        Training.Employee,
                        Training.Start,
                        Training.End,
                        Training.Description,
                        // Trainer_option.Trainer_option_state,
                        // Trainer_option.Trainer_option_district,
                        // Trainer_option.Trainer_option_Training_cost,
                        `<button class="edit-btn btn btn-primary" data-id="${Training.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Training.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Branch" },
                        { title: "Trainer_option" },
                        { title: "Training_type" },
                        { title: "Trainer" },
                        { title: "Training_cost" },
                        { title: "Employee" },
                        { title: "Start" },
                        { title: "End" },
                        { title: "Description" },
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
        const TrainingId = $(event.currentTarget).data('id');
        navigate(`/edit-Training/${TrainingId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Branch: Branch,
        Trainer_option: Trainer_option,
        Training_type: Training_type,
        Trainer: Trainer,
        Training_cost: Training_cost,
        Employee: Employee,
        Start: Start,
        End: End,
        Description: Description,
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/trainings-create/', formData)
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
        setTrainingId(response.data.Leave_id);
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
  icon: "Training",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    // 
    const TrainingId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/trainings/${TrainingId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setTraining(Training.filter(Training => Training.id !== TrainingId));
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
         Training Name:
        </label>
        <input type="text" className='form-control' value={Branch} onChange={(e) => setBranch(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Training Name:
        </label>
        <input type="text" className='form-control' value={Trainer_option} onChange={(e) => setTrainer_option(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Training Name:
        </label>
        <input type="text" className='form-control' value={Training_type} onChange={(e) => setTraining_type(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Training Name:
        </label>
        <input type="text" className='form-control' value={Trainer} onChange={(e) => setTrainer(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Training Name:
        </label>
        <input type="text" className='form-control' value={Training_cost} onChange={(e) => setTraining_cost(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Training Name:
        </label>
        <input type="text" className='form-control' value={Employee} onChange={(e) => setEmployee(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Start} onChange={(e) => setStart(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={End} onChange={(e) => setEnd(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
    {/* <div className="form-group">
        <label>
          Trainer_option Country:
          
                              </label>
                              <select value={Trainer_optionCountry} className='form-control' onChange={(e) => setTrainer_optionCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
            ))}
                                  </select>
            </div>
            <div className="form-group">
        <label>
          Trainer_option State:
        </label>
          <select value={Trainer_optionState} className='form-control' onChange={(e) => setTrainer_optionState(e.target.value)} required>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
            ))}
                                  </select>
                                  </div>
      <div className="form-group">
        <label>
          Trainer_option District:
        </label>
          <select className='form-control' value={Trainer_optionDistrict} onChange={(e) => setTrainer_optionDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.name} value={district.name}>{district.name}</option>
            ))}
                                  </select>
                                  </div>
       <div className="form-group">
        <label>
          Trainer_option Start:
        </label>
          <textarea type="text" className='form-control' value={Trainer_optionStart} onChange={(e) => setTrainer_optionStart(e.target.value)} required />
                               
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
