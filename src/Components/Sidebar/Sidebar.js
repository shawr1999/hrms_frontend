import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './style/sidebar.css';
import Header from '../Header/Header';
import wsds from './images/wsds.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
   const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const User_Role_Id = localStorage.getItem('userRoleId');
  const User_Role_Name = localStorage.getItem('Curr_User');
  const emp_name = localStorage.getItem('Curr_Emp_name');
  useEffect(() => {

        const email = localStorage.getItem('userEmail');
        
        if (email) {
            setUserEmail(email);
        } else {
            navigate('/login');
    }

    }, [navigate]);


  useEffect(() => {
    
    
        axios.get('https://shawr1999.pythonanywhere.com//api/modules/')
            .then(response => setModules(response.data))
            .catch(error => console.error('Error fetching modules:', error));

        axios.get('https://shawr1999.pythonanywhere.com//api/permissions/')
            .then(response => setPermissions(response.data))
            .catch(error => console.error('Error fetching permissions:', error));
        
        axios.get(`https://shawr1999.pythonanywhere.com//api/roles_view/${User_Role_Id}/`)
            .then(response => {
                const roleData = response.data;
              setRoleName(roleData.name);
                setRolePermissions(roleData.role_permissions.map(rp => ({
                    module: rp.module,
                    permissions: rp.permissions
                })));
            })
            .catch(error => console.error('Error fetching role data:', error));
    }, [User_Role_Id]);

  

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('Curr_User');
        localStorage.removeItem('Curr_Emp_id');
        navigate('/login');
    };

              
  useEffect(() => {
    // Add click event listeners when the component mounts
    $(".menu > ul > li").click(function (e) {
      // Remove the 'active' class from other menu items
      $(this).siblings().removeClass("active");
      // Toggle the 'active' class on the clicked menu item
      $(this).toggleClass("active");
      // Toggle the visibility of the submenu
      $(this).find("ul").slideToggle();
      // Close other submenus if they are open
      $(this).siblings().find("ul").slideUp();
      // Remove the 'active' class from submenu items
      $(this).siblings().find("ul").find("li").removeClass("active");
      $(this).siblings().removeClass("active-head");
      $(this).siblings().removeClass("main-active");

    });

    $(".menu-btn").click(function () {
      // Toggle the 'active' class on the sidebar
      $(".sidebar").toggleClass("active");
      $(".header").toggleClass("active-head");
      $(".main").toggleClass("main-active");

    });

    // Clean up event listeners when the component unmounts
    return () => {
      $(".menu > ul > li").off('click');
      $(".menu-btn").off('click');


    };


    
  }, []); // Empty dependency array ensures this runs once when the component mounts


  return (
    <div>
      <div className="head-container">
          <Header/>
      </div>
      <aside>
        <div class="side-container">
          
          <div class="sidebar">
            <div class="head">
        <div class="user-img"><img src={wsds} alt=""/></div>
        <div class="user-details mt-2" style={{lineHeight:'5px'}}>
        <p class="name">{emp_name}</p>
          <p class="title">{User_Role_Name}</p>
          
        </div>
      </div>
      {/* <div class=""><i class="ph-bold ph-caret-left"></i></div> */}

            {/* {modules.map((module) => (
              

              <div key={module.id} className="mb-3">
                {rolePermissions.some(rp => rp.module === module.id && module.name === 'Leave') && (<p>{module.name}</p>)}
                  
                  
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={module.id}
                                        checked={rolePermissions.some(rp => rp.module === module.id)}
                                    />
                                    <label className="form-check-label" >{module.name}</label>
                                </div>
                                {rolePermissions.some(rp => rp.module === module.id) && (
                                    <div className="ms-3">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value={permission.id}
                                                    checked={rolePermissions.find(rp => rp.module === module.id).permissions.includes(permission.id)}
                                                />
                                                <label className="form-check-label">{permission.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}   */}


            {User_Role_Name === "admin" ? (
              <>
                <div class="nav">
       <div class="menu">
          <p class="title">Main</p>
                <ul>
            
                  
                  <li className="active"><Link to="/"><i class="icon ph-bold ph-house-simple"></i><span class="text">Dashboard</span></Link></li>
                   
                  
                        <li >
                     
                      <a href="#"><i class="icon ph-bold ph-users-three"></i><span class="text">Staff</span><i class="arrow ph-bold ph-caret-down"></i></a>
                          <ul class="sub-menu">
                            
                              <li className="active" >
                                 
                                  <Link to="/roles"><span class="text">Role</span></Link>
                                
                              </li>
                      
                        <li >
                           <a href="#"><span class="text">Employee Profile</span></a></li>
                        
                        <li >
                        <a href="#"><span class="text">Last Login</span></a></li>
                          </ul>
                      
                    </li>
                    
                  
                    <li >
                        <Link to="/employee"><i class="icon ph-bold ph-user"></i><span class="text">Employee</span></Link>
                      
                    </li>
                  
                  
                   
                  
                    
                    
                       <li >
                    <a href="#">
                        <i className="icon ph-bold ph-house"></i>
                        <span className="text">Report</span>
                        <i className="arrow ph-bold ph-caret-down"></i>
                    </a>
                    <ul className="sub-menu">
                        <li>
                            <a href="#"><span className="text">Income vs Expense</span></a>
                        </li>
                        <li>
                            <a href="#"><span className="text">Monthly Attendance</span></a>
                        </li>
                        <li>
                            <a href="#"><span className="text">Leave</span></a>
                        </li>
                        <li>
                            <a href="#"><span className="text">Account Statement</span></a>
                        </li>
                        <li>
                            <a href="#"><span className="text">Payroll</span></a>
                        </li>
                        <li>
                            <a href="#"><span className="text">Timesheet</span></a>
                        </li>
                    </ul>
                      </li>
              

                          
                   
                  <li>
                 
                        <a href="#"><i class="icon ph-bold ph-receipt"></i><span class="text">Payroll</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                        <li >
                           <a href="#"><span class="text">Set Salary</span></a></li>
                          
                        <li >
                           <a href="#"><span class="text">Payslip</span></a></li>

                        </ul>
                   
                  </li>
                  
                 <li>
                        <a href="#"><i class="icon ph-bold ph-clock"></i><span class="text">Timesheet</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                        <li >
                           <Link to="/timesheet"><span class="text">Timesheet</span></Link></li>
                          
                        <li >
                           <Link to="/Leaves"><span class="text">Manage Leave</span></Link></li>
                          
                        <li >
                           <a href="#"><span class="text">Attendance</span></a></li>
                          {/* 
                        <li >
                           <a href="#"><span class="text">Marked Attendance</span></a></li>
                
                        <li >
                           <a href="#"><span class="text">Bulk Attendance</span></a></li> */}

                        </ul>
                     
                  </li>
                  
                    <li >
                    
                       
                      <a href="#"><i class="icon ph-bold ph-cube"></i><span class="text">Performance</span><i class="arrow ph-bold ph-caret-down"></i></a>
                     
                      <ul class="sub-menu">
                        
                        <li >
                           <Link to="/Indicator"><span class="text">Indicator</span></Link></li>
                        
                        <li >
                           <Link to="/Appraisal"><span class="text">Appraisal</span></Link></li>
                        
                        <li >
                           <Link to="/Goal_tracking"><span class="text">Goal Tracking</span></Link></li>
                      </ul>
                        
                      
                    </li>
                  
                  <li >
                     
                      
                        <a href="#"><i class="icon ph-bold ph-wallet"></i><span class="text">Finance</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                        <li >
                           <Link to="/Account"><span class="text">Account List</span></Link></li>
                          
                        <li >
                           <a href="#"><span class="text">Account Balance</span></a></li>
                          
                        <li >
                           <Link to="/Payee"><span class="text">Payee</span></Link></li>
                          
                        <li >
                           <Link to="/Payer"><span class="text">Payers</span></Link></li>
                          
                        <li >
                           <Link to="/Deposit"><span class="text">Deposit</span></Link></li>
                          
                        <li >
                           <Link to="/Expens"><span class="text">Expence</span></Link></li>
                          
                        <li >
                           <Link to="/Transfer_balance"><span class="text">Transfer Balance</span></Link></li>
                        </ul>
                      
                    
                </li>
                
                  <li >
                     
                      
                        <a href="#"><i class="icon ph-bold ph-graduation-cap"></i><span class="text">Training</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                        <li >
                           <Link to="/Training"><span class="text">Training List</span></Link></li>
                          
                        <li >
                           <Link to="/Trainer"><span class="text">Trainer</span></Link></li>
                        </ul>
                      
                    
                </li>
                  <li >
                    <a href="#"><i class="icon ph-bold ph-user-plus"></i><span class="text">HR Admin Setup</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                            <li >
                              

                                <Link to="/Award"><span class="text">Award</span></Link>
                              </li>
                          
                      
                        <li > 
                            <Link to="/Transfer"><span class="text">Transfer</span></Link>
                          </li>
                      
                        <li >
                           
                            <Link to="/Resignation"><span class="text">Resignation</span></Link>
                          
                        </li>
                      
                        <li >
                           
                            <Link to="/Trip"><span class="text">Trip</span></Link>
                        </li>
                      
                
                        <li >
                           <Link to="/Promotion"><span class="text">Promotion</span></Link></li>
                
                        <li >
                           <Link to="/Complaint"><span class="text">Complaints</span></Link></li>
                
                        <li >
                           <Link to="/Warning"><span class="text">Warning</span></Link></li>
                
                        <li >
                           <Link to="/Termination"><span class="text">Termination</span></Link></li>
                
                        <li >
                           <Link to="/Announcement"><span class="text">Announcement</span></Link></li>
                
                        <li >
                           <Link to="/Holiday"><span class="text">Holiday</span></Link></li>
                        </ul>
                </li>
                 
                  
                  
                    <li >
                        <a href="#"><i class="icon ti ti-envelope"></i><span class="text">Recruitment</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          
                        <li >
                           <Link to="/Job"><span class="text">Jobs</span></Link></li>
                          
                        <li >
                           <a href="#"><span class="text">Create Jobs</span></a></li>
                          
                        <li >
                           <Link to="/Job_Application"><span class="text">Job Application</span></Link></li>
                          
                        <li >
                           <a href="#"><span class="text">Job Candidate</span></a></li>
                          
                        <li >
                           <Link to="/Job_On_Boarding"><span class="text">Job On-Boarding</span></Link></li>
                          
                        <li >
                           <a href="#"><span class="text">Custom Qestion</span></a></li>
                          
                        <li >
                         <Link to="/Interview_schedule"><span class="text">Interview Schedule</span></Link></li>
                          {/* 
                        <li >
                           <a href="#"><span class="text">Termination</span></a></li>
                
                        <li >
                           <a href="#"><span class="text">Announcement</span></a></li>
                
                        <li >
                           <a href="#"><span class="text">Holiday</span></a></li> */}
                        </ul>
                  
                   
                  </li>
                    
                    
                  
                    <li >
                       

                        
                          <Link to="/contract"><i class="icon fa-solid fa-file-signature"></i><span class="text">Contracts</span></Link>
                        
                      
                    </li>
                  
                  
                  <li >
                      <Link to="/ticket"><i class="icon ph-bold ph-ticket"></i><span class="text">Ticket</span></Link>
                    
                   </li>
                    
                    
                    
                  <li >
                    
                      <Link to="/event"><i class="icon fa-regular fa-calendar-check"></i><span class="text">Event</span></Link>
                      
                </li>
                      
                    
                      
                  <li >
                     
                      <Link to="/meeting"><i class="icon fa-regular fa-handshake"></i><span class="text">Meeting</span></Link>
                    
                </li>
                        
                    
                    
                  <li >
                   

                <Link to="/zoom"><i class="icon ph-bold ph-video-conference"></i><span class="text">Zoom Meeting</span></Link>
                
                </li>
                      

                    
                  
                  <li >
                   

                <Link to="/assets"><i class="icon fa-solid fa-star-of-life"></i><span class="text">Assets</span></Link>
                
                </li>
                    
                    
                  
                  <li >
                     
                
                <a href="#"><i class="icon ph-bold ph-file"></i><span class="text">Document</span></a>
                
                </li>
                    
                    
                    
                  <li >
                     
                    
                <a href="#"><i class="icon fa-solid fa-envelope-open-text"></i><span class="text">Email Templates</span></a>
                
                </li>
                      
                    

                  
                  <li >
                    
                <Link to="/policy"><i class="icon fa-solid fa-person-praying"></i><span class="text">Company Policy</span></Link>
                
                </li>
                    
                    

                  
                        <li >
                           
                    
                            <a href="#"><i class="icon ph-bold ph-chats"></i><span class="text">Messanger</span></a>
                          
                        </li>
                      
                    
              {/* 
                        <li >
                           <a href="#"><i class="icon ti ti-layout"></i><span class="text">HRM System Setup</span></a></li> */}
                    <li>
                    <a href="#"><i class="icon ti ti-layout"></i><span class="text">HRM System Setup</span><i class="arrow ph-bold ph-caret-down"></i></a>
              <ul class="sub-menu">
                
                        <li>
                          <Link to="/branchs"><span class="text">Branch</span></Link></li>
                
                        <li>
                          <Link to="/departments"><span class="text">Department</span></Link></li>
                
                        <li>
                          <Link to="/designation"><span class="text">Designation</span></Link></li>
                
                        <li>
                          <Link to="/leave"><span class="text">Leaves</span></Link></li>
                
                        <li>
                          <Link to="/document-type"><span class="text">Document</span></Link></li>
                
                        <li>
                          <Link to="/payslip-type"><span class="text">Payslip</span></Link></li>
                
                        <li>
                          <Link to="/Allowance_option"><span class="text">Allowance Options</span></Link></li>
                
                        <li>
                          <Link to="/Deduction_option"><span class="text">Deduction Options</span></Link></li>
                
                        <li>
                          <Link to="/Goal_type"><span class="text">Goal Type</span></Link></li>
                
                        <li>
                          <Link to="/Training_type"><span class="text">Training Type</span></Link></li>
                
                        <li>
                          <Link to="/Award_type"><span class="text">Award Type</span></Link></li>
                
                        <li>
                          <Link to="/Termination_type"><span class="text">Termination Type</span></Link></li>
                
                        <li>
                          <Link to="/job_category"><span class="text">Job Category</span></Link></li>
                
                        <li>
                          <Link to="/job_stage"><span class="text">Job Stage</span></Link></li>
                
                        <li>
                           <Link to="/Performance_type"><span class="text">Performance Type</span></Link></li>
                
                        <li>
                          <Link to="/Competencies"><span class="text">Competencies</span></Link></li>
                
                        <li>
                          <Link to="/Expence_type"><span class="text">Expense Type</span></Link></li>
                
                        <li>
                          <Link to="/income_type"><span class="text">Income Type</span></Link></li>
                
                        <li>
                          <Link to="/payment_type"><span class="text">Payment Type</span></Link></li>
                
                        <li>
                          <Link to="/contract_type"><span class="text">Contract Type</span></Link></li>
                {/* 
                        <li >
                           <a href="#"><span class="text">Termination</span></a></li>
                
                        <li >
                           <a href="#"><span class="text">Announcement</span></a></li>
                
                        <li >
                           <a href="#"><span class="text">Holiday</span></a></li> */}
              </ul>
                
                </li>
              
          </ul>
        </div>
        {/* <div class="menu">
          <p class="title">Settings</p>
          <ul>
                        <li >
                          <a href="#"><i class="icon ph-bold ph-gear"></i><span class="text">Settings</span></a></li>
          </ul>
        </div> */}
      </div>
      <div class="menu">
        <p class="title">Account</p>
        <ul>
                        {/* <li>
                          <a href="#"><i class="icon ph-bold ph-info"></i><span class="text">FAQ</span></a></li> */}
                        <li>
                          <Link to="" onClick={handleLogout}><i class="icon ph-bold ph-sign-out"></i><span class="text">Logout</span></Link></li>
        </ul>
                </div>
                </>):

              (
      <><div class="nav">
        <div class="menu">
          <p class="title">Main</p>
                <ul>
            {/* {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/">Dashboard</Link>)}</li>))} */}
                  
                  <li className="active"><Link to="/"><i class="icon ph-bold ph-house-simple"></i><span class="text">Dashboard</span></Link></li>
                   
                  {User_Role_Name !== "Employee" && (
                    <>
                        <li >
                     
                      <a href="#"><i class="icon ph-bold ph-users-three"></i><span class="text">Staff</span><i class="arrow ph-bold ph-caret-down"></i></a>
                          <ul class="sub-menu">
                            {modules.map((module) => (
                              <li className="active" key={module.id}>
                                {rolePermissions.some(rp => rp.module === module.id && module.name === 'Role') && (
                                  <Link to="/roles"><span class="text">Role</span></Link>
                                )}
                              </li>))}
                      {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Employee Profile</span></a>)}</li>))}
                        {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Last') && (<a href="#"><span class="text">Last Login</span></a>)}</li>))}
                          </ul>
                      
                    </li>
                    </>)}
                  {modules.map((module) => (
                    <li key={module.id}>
                      {rolePermissions.some(rp => rp.module === module.id && module.name === 'Employee') && (
                        <Link to="/employee"><i class="icon ph-bold ph-user"></i><span class="text">Employee</span></Link>
                      )}
                    </li>
                  ))}
                  
                   
                  {User_Role_Name !== "Employee" && (
                    
                    <>
                       <li >
        <a href="#">
            <i className="icon ph-bold ph-house"></i>
            <span className="text">Report</span>
            <i className="arrow ph-bold ph-caret-down"></i>
        </a>
        <ul className="sub-menu">
            <li>
                <a href="#"><span className="text">Income vs Expense</span></a>
            </li>
            <li>
                <a href="#"><span className="text">Monthly Attendance</span></a>
            </li>
            <li>
                <a href="#"><span className="text">Leave</span></a>
            </li>
            <li>
                <a href="#"><span className="text">Account Statement</span></a>
            </li>
            <li>
                <a href="#"><span className="text">Payroll</span></a>
            </li>
            <li>
                <a href="#"><span className="text">Timesheet</span></a>
            </li>
        </ul>
                      </li>
    </>
              

                  )}        
                  {User_Role_Name !== "Employee" && ( <>
                  <li>
                 
                        <a href="#"><i class="icon ph-bold ph-receipt"></i><span class="text">Payroll</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Set Salary</span></a>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Payslip</span></a>)}</li>))}

                        </ul>
                   
                  </li>
                  </>)}
                 <li>
                        <a href="#"><i class="icon ph-bold ph-clock"></i><span class="text">Timesheet</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Leave') && (<Link to="/timesheet"><span class="text">Timesheet</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Leave') && (<Link to="/Leaves"><span class="text">Manage Leave</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Attendance') && (<a href="#"><span class="text">Attendance</span></a>)}</li>))}
                          {/* {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Marked Attendance</span></a>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Bulk Attendance</span></a>)}</li>))} */}

                        </ul>
                     
                  </li>
                  {modules.map((module) => (
                    <li key={module.id}>
                    
                      {rolePermissions.some(rp => rp.module === module.id && module.name === 'Performance') && (
                       <>
                      <a href="#"><i class="icon ph-bold ph-cube"></i><span class="text">Performance</span><i class="arrow ph-bold ph-caret-down"></i></a>
                     
                      <ul class="sub-menu">
                        {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Indicator"><span class="text">Indicator</span></Link>)}</li>))}
                        {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Appraisal"><span class="text">Appraisal</span></Link>)}</li>))}
                        {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Goal_tracking"><span class="text">Goal Tracking</span></Link>)}</li>))}
                      </ul>
                        </>
                      )}
                    </li>
                  ))}
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                      <>
                        <a href="#"><i class="icon ph-bold ph-wallet"></i><span class="text">Finance</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Account"><span class="text">Account List</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Account Balance</span></a>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Payee"><span class="text">Payee</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Payer"><span class="text">Payers</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Deposit"><span class="text">Deposit</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Expens"><span class="text">Expence</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Transfer_balance"><span class="text">Transfer Balance</span></Link>)}</li>))}
                        </ul>
                      </>
                    )}
                </li>
                
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                      <>
                        <a href="#"><i class="icon ph-bold ph-graduation-cap"></i><span class="text">Training</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Training"><span class="text">Training List</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Trainer"><span class="text">Trainer</span></Link>)}</li>))}
                        </ul>
                      </>
                    )}
                </li>
                  <li >
                    <a href="#"><i class="icon ph-bold ph-user-plus"></i><span class="text">HR Admin Setup</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                            <li key={module.id}>
                              {rolePermissions.some(rp => rp.module === module.id && module.name === 'Award') && (

                                <Link to="/Award"><span class="text">Award</span></Link>
                              )}</li>))}
                          
                      {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Transfer') && (
                            <Link to="/Transfer"><span class="text">Transfer</span></Link>
                          )}</li>))}
                      {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (
                            <Link to="/Resignation"><span class="text">Resignation</span></Link>
                          )}
                        </li>))}
                      {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (
                            <Link to="/Trip"><span class="text">Trip</span></Link>)}
                        </li>))}
                      
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Promotion"><span class="text">Promotion</span></Link>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Complaint"><span class="text">Complaints</span></Link>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Warning"><span class="text">Warning</span></Link>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Termination"><span class="text">Termination</span></Link>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Announcement"><span class="text">Announcement</span></Link>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Holiday"><span class="text">Holiday</span></Link>)}</li>))}
                        </ul>
                </li>
                 
                  
                  {User_Role_Name !== "Employee" && (<>
                    <li >
                        <a href="#"><i class="icon ti ti-envelope"></i><span class="text">Recruitment</span><i class="arrow ph-bold ph-caret-down"></i></a>
                        <ul class="sub-menu">
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Job"><span class="text">Jobs</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Create Jobs</span></a>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Job_Application"><span class="text">Job Application</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Job Candidate</span></a>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<Link to="/Job_On_Boarding"><span class="text">Job On-Boarding</span></Link>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Custom Qestion</span></a>)}</li>))}
                          {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Interview Schedule') && (<Link to="/Interview_schedule"><span class="text">Interview Schedule</span></Link>)}</li>))}
                          {/* {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Termination</span></a>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Announcement</span></a>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Holiday</span></a>)}</li>))} */}
                        </ul>
                  
                   
                  </li>
                    </>
                    )}
                  {modules.map((module) => (
                    <li key={module.id}>
                      {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (

                        <>
                          <Link to="/contract"><i class="icon fa-solid fa-file-signature"></i><span class="text">Contracts</span></Link>
                        </>
                      )}
                    </li>
                  ))}
                  {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Ticket') && (
                      <Link to="/ticket"><i class="icon ph-bold ph-ticket"></i><span class="text">Ticket</span></Link>
                    )}
                   </li>
                    ))
                    }
                    {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Event') && (
                      <Link to="/event"><i class="icon fa-regular fa-calendar-check"></i><span class="text">Event</span></Link>
                      )}
                </li>
                      ))
                    }
                      {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Meeting') && (
                      <Link to="/meeting"><i class="icon fa-regular fa-handshake"></i><span class="text">Meeting</span></Link>
                    )}
                </li>
                        ))
                    }
                    {modules.map((module) => (
                  <li key={module.id}>
                  {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (

                <Link to="/zoom"><i class="icon ph-bold ph-video-conference"></i><span class="text">Zoom Meeting</span></Link>
                )}
                </li>
                      
))
                    }
                  {modules.map((module) => (
                  <li key={module.id}>
                  {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (

                <Link to="/assets"><i class="icon fa-solid fa-star-of-life"></i><span class="text">Assets</span></Link>
                )}
                </li>
                    ))
                    }
                  {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                
                <a href="#"><i class="icon ph-bold ph-file"></i><span class="text">Document</span></a>
                )}
                </li>
                    ))
                    }
                    {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                    
                <a href="#"><i class="icon fa-solid fa-envelope-open-text"></i><span class="text">Email Templates</span></a>
                )}
                </li>
                      ))
                    }

                  {modules.map((module) => (
                  <li key={module.id}>
                    {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                    
                <Link to="/policy"><i class="icon fa-solid fa-person-praying"></i><span class="text">Company Policy</span></Link>
                )}
                </li>
                    ))
                    }

                  {
                      modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Report') && (
                    
                            <a href="#"><i class="icon ph-bold ph-chats"></i><span class="text">Messanger</span></a>
                          )}
                        </li>
                      ))
                    }
              {/* {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><i class="icon ti ti-layout"></i><span class="text">HRM System Setup</span></a>)}</li>))} */}
             {User_Role_Name==="admin" && (
                  <>   <li>
                    <a href="#"><i class="icon ti ti-layout"></i><span class="text">HRM System Setup</span><i class="arrow ph-bold ph-caret-down"></i></a>
              <ul class="sub-menu">
                
                        <li>
                          <Link to="/branchs"><span class="text">Branch</span></Link></li>
                
                        <li>
                          <Link to="/departments"><span class="text">Department</span></Link></li>
                
                        <li>
                          <Link to="/designation"><span class="text">Designation</span></Link></li>
                
                        <li>
                          <Link to="/leave"><span class="text">Leaves</span></Link></li>
                
                        <li>
                          <Link to="/document-type"><span class="text">Document</span></Link></li>
                
                        <li>
                          <Link to="/payslip-type"><span class="text">Payslip</span></Link></li>
                
                        <li>
                          <Link to="/Allowance_option"><span class="text">Allowance Options</span></Link></li>
                
                        <li>
                          <Link to="/Deduction_option"><span class="text">Deduction Options</span></Link></li>
                
                        <li>
                          <Link to="/Goal_type"><span class="text">Goal Type</span></Link></li>
                
                        <li>
                          <Link to="/Training_type"><span class="text">Training Type</span></Link></li>
                
                        <li>
                          <Link to="/Award_type"><span class="text">Award Type</span></Link></li>
                
                        <li>
                          <Link to="/Termination_type"><span class="text">Termination Type</span></Link></li>
                
                        <li>
                          <Link to="/job_category"><span class="text">Job Category</span></Link></li>
                
                        <li>
                          <Link to="/job_stage"><span class="text">Job Stage</span></Link></li>
                
                        <li>
                           <Link to="/Performance_type"><span class="text">Performance Type</span></Link></li>
                
                        <li>
                          <Link to="/Competencies"><span class="text">Competencies</span></Link></li>
                
                        <li>
                          <Link to="/Expence_type"><span class="text">Expense Type</span></Link></li>
                
                        <li>
                          <Link to="/income_type"><span class="text">Income Type</span></Link></li>
                
                        <li>
                          <Link to="/payment_type"><span class="text">Payment Type</span></Link></li>
                
                        <li>
                          <Link to="/contract_type"><span class="text">Contract Type</span></Link></li>
                {/* {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Termination</span></a>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Announcement</span></a>)}</li>))}
                {modules.map((module) => (
                        <li key={module.id}>
                          {rolePermissions.some(rp => rp.module === module.id && module.name === 'Resignation') && (<a href="#"><span class="text">Holiday</span></a>)}</li>))} */}
              </ul>
                
                </li>
              </>)}
          </ul>
        </div>
        {/* <div class="menu">
          <p class="title">Settings</p>
          <ul>
                        <li >
                          <a href="#"><i class="icon ph-bold ph-gear"></i><span class="text">Settings</span></a></li>
          </ul>
        </div> */}
      </div>
      <div class="menu">
        <p class="title">Account</p>
        <ul>
                        {/* <li>
                          <a href="#"><i class="icon ph-bold ph-info"></i><span class="text">FAQ</span></a></li> */}
                        <li>
                          <Link to="" onClick={handleLogout}><i class="icon ph-bold ph-sign-out"></i><span class="text">Logout</span></Link></li>
        </ul>
                  </div>
                  </>)
      }
    </div>
  </div>
      </aside>

    </div>
  );
};

export default Sidebar;
