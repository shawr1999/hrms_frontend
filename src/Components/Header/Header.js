import React from 'react'
import './style/header.css'
import profile from './Images/profile/image.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
const emp_name = localStorage.getItem('Curr_Emp_name');
console.log(emp_name)
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        
        if (email) {
            setUserEmail(email);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRoleId');
        localStorage.removeItem('Curr_User');
        localStorage.removeItem('Curr_Emp_id');
        navigate('/login');
    };
  return (
    <div>
      <header className='header'>
        <div className="container-fluid">
              <nav class="navbar navbar-expand-sm bg-light navbar-light rounded p-3">

          <ul class="navbar-nav">
            <li class="nav-item menu-btn">
                <a href="#" className='nav-link px-3 py-2 rounded hamburger'>
                  <i className="fa-solid fa-bars mt-3"></i>
                </a>
              </li>
              <li class="nav-item">
                <div class="input-group ml-4">
      
                  <input type="search" class="form-control border-right-0 search" placeholder='Search' style={{ height: "50px" }} />
                <div class="input-group-prepend bg-transparent">
              <span class="input-group-text bg-white border-left-0"><i class="fa-solid fa-magnifying-glass"></i></span>
              </div>
            </div>
            </li>
           
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link px-3 py-2" href="#" data-toggle="modal" data-target="#notification"><i class="fa-solid fa-bell"></i></a>
                
              </li>
            <li class="nav-item">
                <a class="nav-link px-3 py-2" href="#"><i class="fa-solid fa-layer-group"></i></a>

              </li>

            <li class="nav-item">
                <a class="nav-link px-3 py-2" href="#"><i class="fa-solid fa-circle-exclamation"></i></a>

              </li>

              <li class="nav-item">
                <a class="nav-link px-3 py-2" href="#"><i class="fa-solid fa-comment-dots"></i></a>

              </li>
        </ul>
            <a class="navbar-brand" href="#" style={{ width: "150px" }}>
              <div className='d-flex'><div className="text-right ml-3">
                <h5>{emp_name}</h5>
             <h6 style={{margin:"-10px 0 0 0", fontSize:"10px"}}>{userEmail}</h6>
              </div>
                <p></p>
                <img src={profile} className='rounded ml-2' alt="Logo" style={{ height:"40px" }} />
              </div>
          
            </a>
  

          </nav>
          </div>
      </header>
      <div class="modal fade" id="notification">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
      
        <div class="modal-header">
          <h4 class="modal-title">Notifications</h4> 
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        
        <div class="modal-body">
          Modal body..
        </div>
        
        <div class="modal-footer">
          <a href="#" className='mx-auto' data-dismiss="modal">View All</a>
        </div>
        
      </div>
    </div>
  </div>  
      </div>
  )
}
