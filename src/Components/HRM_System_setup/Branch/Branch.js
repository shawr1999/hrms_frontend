import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';

function Form() {
//   const history = useHistory();
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

  return (

    <div>
        <div className="main">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newbranch">
                Open modal
          </button>
            


           

          <div className="card">
              <div className="card-header">Add Branch</div>
              <div className="card-body">
      
                  {responseMessage && <p>{responseMessage}</p>}
                  {branchId && <p>Branch ID: {branchId}</p>}
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
              <option key={country.isoCode} value={country.name}>{country.name}</option>
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
              <option key={state.isoCode} value={state.name}>{state.name}</option>
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

export default Form;
