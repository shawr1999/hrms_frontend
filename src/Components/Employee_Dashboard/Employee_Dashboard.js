import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate,Link } from 'react-router-dom';
import working from './working-man.png';
import leader from './leader.png';
import user from './user.png';
import branch from './branch.png';
import department from './department.png';
import attendance from './atten.png';
import './Style/emp_dash.css';
import Bars from './Bars/Bars';
import total_leave from './total_leave.png';
import medical from './medical.png';
import casual from './casual.png';
import earned from './earn.png';
import ticket from './ticket.png';
import chat from './chat.png';
import payroll from './payroll.png';
import holiday from './holiday.png';

export default function Employee_Dashboard() {
    const [Branches, setBranches] = useState([]);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [Leaves, setLeaves] = useState([]);
    const employee_branch = localStorage.getItem("Curr_Emp_id");

    useEffect(() => {
        fetch('https://shawr1999.pythonanywhere.com//api/employee_view/')
            .then(response => response.json())
            .then(data => setBranches(data))
            .catch(error => console.error('Error fetching roles:', error));

        fetch('https://shawr1999.pythonanywhere.com//api/leave_view/')
            .then(response => response.json())
            .then(data => setLeaves(data))
            .catch(error => console.error('Error fetching roles:', error));
    }, []);

    const Data = {
        UserId: localStorage.getItem('Curr_Emp_id')
    };

    const handleClockIn = () => {
        axios.post('https://shawr1999.pythonanywhere.com//api/clock_in/', Data, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setMessage(response.data.message || response.data.error);
            Swal.fire({
                title: "Success!",
                text: response.data.message || "Clock in successful!",
                icon: "success",
                confirmButtonText: "OK"
            })
        })
        .catch(err => {
            if (err.response) {
                setMessage(err.response.data.error || 'Something went wrong!');
                Swal.fire({
                    title: "Not Allowed!",
                    text: err.response.data.error || "Already Clocked in",
                    icon: "warning",
                    confirmButtonText: "OK"
                })
            } else {
                setMessage('Something went wrong!');
            }
            console.error(err);
        });
    };

    const handleClockOut = () => {
        axios.post('https://shawr1999.pythonanywhere.com//api/clock_out/', Data, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setMessage(response.data.message || response.data.error);
            Swal.fire({
                title: "Success!",
                text: response.data.message || "Clock Out successful!",
                icon: "success",
                confirmButtonText: "OK"
            })
        })
        .catch(err => {
            setMessage('Something went wrong!');
            Swal.fire({
                title: "Not Allowed!",
                text: "Already Clocked Out",
                icon: "warning",
                confirmButtonText: "OK"
            })
        });
    };

    return (
        <div>
            <div className="main">
                <div className="container-fluid p-5">
                    <div className="row">
                        <div className="col-md-6 px-5">
                            <h3><strong>Hello</strong> Employee!</h3>
                            <p>Good Morning</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-lg" style={{background:"blueviolet", color:"white", borderRadius:"15px"}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img src={branch} alt="" style={{height:"50px"}}/>
                                                </div>
                                                <div className="col-md-9">
                                                    <h6>Branch</h6>
                                                    {Branches.length > 0 ? (
                                                        <h4>{Branches.find(branch => branch.Employee_id === employee_branch)?.Branch || 'N/A'}</h4>
                                                    ) : (
                                                        <h4>Loading...</h4>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-lg" style={{background:"blueviolet", color:"white", borderRadius:"15px"}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img src={department} alt="" style={{height:"60px"}}/>
                                                </div>
                                                <div className="col-md-9">
                                                    <h6>Department</h6>
                                                    {Branches.length > 0 ? (
                                                        <h4>{Branches.find(branch => branch.Employee_id === employee_branch)?.Department || 'N/A'}</h4>
                                                    ) : (
                                                        <h4>Loading...</h4>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <div className="card atten border-0">
                                        <div className="card-body shadow-lg">
                                            <h5 style={{color:"blueviolet"}}>Attendance</h5>
                                            <div className="row text-center mt-5">
                                                <div className="col-md-6">
                                                    <button className='btn clockin text-white' onClick={handleClockIn}>
                                                        Clock In
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                     <button className='btn clockout' onClick={handleClockOut}>
                                                        Clock Out
                                                    </button>
                                                </div>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5">
                                     <div className="card border-0">
                                        <div className="card-body shadow-lg">
                                            <h5 style={{color:"blueviolet"}}>Tickets</h5>
                                            <div className="table-responsive">
                                               <table className="table">
                                                  <thead style={{background:"blueviolet", color:"white"}}>
                                                  <tr>
                                                      <th>Subject</th>
                                                      <th>By</th>
                                                      <th>Status</th>
                                                      <th>Action</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody className='overflow-auto'>
                                                  <tr>
                                                      <td>Ticket for New Mouse</td>
                                                      <td>John</td>
                                                      <td><button className='btn text-white m-2' style={{background:"blueViolet"}}>Open</button></td>
                                                        <td>
                                                            <div className='d-flex'>
                                                            <button type="button" className="btn text-white m-2" style={{background:"blueViolet"}} data-toggle="tooltip" data-placement="top" title="View">
                                                        <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                            <button className='btn text-white m-2' style={{background:"blueViolet"}} data-toggle="tooltip" data-placement="top" title="Accept">
                                                                <i className="fa-solid fa-circle-check"></i>
                                                            </button>
                                                            <button className='btn text-white m-2' style={{background:"blueViolet"}} data-toggle="tooltip" data-placement="top" title="Decline">
                                                                <i className="fa-solid fa-xmark"></i>
                                                            </button>
                                                        </div>
                                                        </td>
                                                  </tr>
                                                  </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 px-5 pt-5 border-left">
                            <h5>Defect Density</h5>
                             <Bars/>

                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <div className="card shadow-lg" style={{background:'blueviolet', borderRadius:'15px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                              <div className="col-md-4"><img src={total_leave} alt="total leaves" width={'100%'}/></div>
                                              <div className="col-md-8 text-white"><h6>Total Leaves</h6>
                                               {Leaves.map(lv =>
                                                        
                                                   <h4 className='d-block'>{lv.days_per_year}</h4>
                                                    
                                                    )}
                                                    </div>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                                  <div className="col-md-6">
                                    <div className="card shadow-lg" style={{background:'blueviolet', borderRadius:'15px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                              <div className="col-md-4"><img src={medical} alt="medical leave" width={'100%'}/></div>
                                                <div className="col-md-8 text-white "><h6>Medical Leaves</h6>
                                                    {Leaves.map(lv =>
                                                        <h4 className='d-block'>{ lv.leave_name==="Medical Leave"?lv.days_per_year:"0" }</h4>
                                                    )}
                                              
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                 <div className="col-md-6">
                                    <div className="card shadow-lg" style={{background:'blueviolet', borderRadius:'15px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                              <div className="col-md-4"><img src={casual} alt="casual leave" width={'100%'}/></div>
                                                <div className="col-md-8 text-white"><h6>Casual Leaves</h6>
                                                    {Leaves.map(lv =>
                                                        
                                                        <h4 className='d-block'>{lv.leave_name === "Casual Leave"? lv.days_per_year:"0"}</h4>
                                                    )}
                                                    </div>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card shadow-lg" style={{background:'blueviolet', borderRadius:'15px'}}>
                                        <div className="card-body">
                                            <div className="row">
                                              <div className="col-md-4"><img src={earned} alt="earned leave" width={'100%'}/></div>
                                              <div className="col-md-8 text-white"><h6>Earned Leaves</h6>
                                              {Leaves.map(lv =>
                                                        
                                                        <h4 className='d-block'>{lv.leave_name === "Earned Leave"? lv.days_per_year:"0"}</h4>
                                                    )}
                                                    </div>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-5">
                                <h5>Shortcuts</h5>
                                <div className='d-flex mt-3'>
                                    <div className='text-center' style={{ width: "100px" }}>
                                        <Link to='/Leaves'>
                                        <img src={earned} alt="Leaves" height={'50px'} className='shadow-lg' style={{background:'blueviolet', borderRadius:'15px', padding:"2px"}}/>
                                             </Link>
                                            <h6 className='mt-2'>Leave</h6>
                                           
                                    </div>
                                    <div className='text-center' style={{ width: "100px" }}>
                                        <Link to='/ticket'>
                                            <img src={ticket} alt="Ticket" height={'50px'} className='shadow-lg' style={{ background: 'blueviolet', borderRadius: '15px', padding: "2px" }} />
                                            </Link>
                                        <h6 className='mt-2'>Ticket</h6>
                                    </div>
                                    <div className='text-center' style={{width:"100px"}}>
                                        <img src={chat} alt="Chat" height={'50px'} className='shadow-lg' style={{background:'blueviolet', borderRadius:'15px', padding:"2px"}}/>
                                        <h6 className='mt-2'>Chats</h6>
                                    </div>
                                    <div className='text-center' style={{width:"100px"}}>
                                        <img src={payroll} alt="Payroll" height={'50px'} className='shadow-lg' style={{background:'blueviolet', borderRadius:'15px', padding:"2px"}}/>
                                        <h6 className='mt-2'>Payroll</h6>
                                    </div>    
                                    <div className='text-center' style={{ width: "100px" }}>
                                        <Link to="/Holiday">
                                            <img src={holiday} alt="Holidays" height={'50px'} className='shadow-lg' style={{ background: 'blueviolet', borderRadius: '15px', padding: "2px" }} />
                                            </Link>
                                        <h6 className='mt-2'>Holidays</h6>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
