import React from 'react'
import './style/applications.css'

export default function Application_bar() {
  return (
    <div>
      <div className="card" style={{borderRadius:"10px", height:"100%"}}>
        <div className="card-header">Total Applications</div>
        <div className="card-body">
          <div className="bar" style={{width:"100%", height:"10px",display:"flex"}}>
            <div className='bg-danger' style={{width:"10%", height:"100%", borderTopLeftRadius:"3px", borderBottomLeftRadius:"3px"}}></div>
            <div className='bg-primary' style={{width:"40%", height:"100%"}}></div>
            <div className='bg-info' style={{width:"30%", height:"100%"}}></div>
            <div className='bg-success' style={{width:"20%", height:"100%", borderTopRightRadius:"3px", borderBottomRightRadius:"3px"}}></div>
          </div>
        </div>
        <a href="#" className='text-decoration-none py-3 mt-3 application-items'> 
          <div className="container w-100 text">
            <span><i class="fa-solid fa-circle mr-2 text-danger" ></i></span>
            <span className='ml-5'>Rejected</span>
            <span className='float-right'>10%</span>
          </div>
        </a>
        <a href="#" className='text-decoration-none py-3 application-items'> 
          <div className="container w-100 text">
            <span><i class="fa-solid fa-circle mr-2 text-primary" ></i></span>
            <span className='ml-5'>Applications</span>
            <span className='float-right'>40%</span>
          </div>
        </a>
         <a href="#" className='text-decoration-none py-3 application-items'> 
          <div className="container w-100 text">
            <span><i class="fa-solid fa-circle mr-2 text-warning" ></i></span>
            <span className='ml-5'>On-hold</span>
            <span className='float-right'>30%</span>
          </div>
        </a>
         <a href="#" className='text-decoration-none py-3 application-items'> 
          <div className="container w-100 text">
            <span><i class="fa-solid fa-circle mr-2 text-success" ></i></span>
            <span className='ml-5'>Shortlisted</span>
            <span className='float-right'>20%</span>
          </div>
        </a>

      </div>
    </div>
  )
}
