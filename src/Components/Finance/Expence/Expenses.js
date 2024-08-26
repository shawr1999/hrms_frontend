import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

$.DataTable = require('datatables.net');

export default function Expense_create() {
    const navigate = useNavigate();
    const [Expense, setExpense] = useState([]);
    const tableRef = useRef();
    const tableName = "table1";
    const [Account, setAccount] = useState('');
    const [Amount, setAmount] = useState('');
    const [Date, setDate] = useState('');
    const [Category, setCategory] = useState('');
    const [Payee, setPayee] = useState('');
    const [Payment_method, setPayment_method] = useState('');
    const [Ref, setRef] = useState('');
    const [Description, setDescription] = useState('');
//   const [branchState, setBranchState] = useState('');
//   const [branchDistrict, setBranchDistrict] = useState('');
//   const [branchDescription, setBranchDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [ExpenseId, setExpenseId] = useState('');

  

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/expenses/')
            .then(response => response.json())
            .then(data => {
                setExpenseId(data);
                const table = $(`#${tableName}`).DataTable({
                    data: data.map(Expense => [
                        Expense.Account,
                        Expense.Amount,
                        Expense.Date,
                        Expense.Category,
                        Expense.Payee,
                        Expense.Payment_method,
                        Expense.Ref,
                        Expense.Description,
                        // First_name.First_name_state,
                        // First_name.First_name_district,
                        // First_name.First_name_Description,
                        `<button class="edit-btn btn btn-primary" data-id="${Expense.id}">Edit</button>
                         <button class="delete-btn btn btn-danger" data-id="${Expense.id}">Delete</button>`
                    ]),
                    columns: [
                        { title: "Account" },
                        { title: "Amount" },
                        { title: "Date" },
                        { title: "Category" },
                        { title: "Payee" },
                        { title: "Payment_method" },
                        { title: "Ref" },
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
        const ExpenseId = $(event.currentTarget).data('id');
        navigate(`/edit-Expense/${ExpenseId}`);
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        Account: Account,
        Amount: Amount,
        Date: Date,
        Category: Category,
        Payee: Payee,
        Payment_method: Payment_method,
        Ref: Ref,
        Description: Description,
    };

    axios.post('https://shawr1999.pythonanywhere.com//api/expenses-create/', formData)
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
        setExpenseId(response.data.Leave_id);
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
  icon: "Expense",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    // 
    const ExpenseId = $(event.currentTarget).data('id');
        fetch(`https://shawr1999.pythonanywhere.com//api/expenses/${ExpenseId}/`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setExpense(Expense.filter(Expense => Expense.id !== ExpenseId));
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
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Account} onChange={(e) => setAccount(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Date} onChange={(e) => setDate(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Payee} onChange={(e) => setPayee(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
         Expense Name:
        </label>
        <input type="text" className='form-control' value={Payment_method} onChange={(e) => setPayment_method(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Ref} onChange={(e) => setRef(e.target.value)} required />
        </div>
          <div className="form-group">  
        <label>
          Required Feild:
        </label>
        <input type="text" className='form-control' value={Description} onChange={(e) => setDescription(e.target.value)} required />
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
          First_name Description:
        </label>
          <textarea type="text" className='form-control' value={First_nameDescription} onChange={(e) => setFirst_nameDescription(e.target.value)} required />
                               
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
