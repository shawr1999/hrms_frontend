import React from 'react'
import profile1 from './images/profile1.png'
import Profile2 from './images/profile2.png'

export default function Recruitment_progress() {
  return (
    <div>
        <div className="card" style={{ borderRadius: "10px", height:"400px" }}>
                <div class="card-header bg-white">Recruitment progress

</div>

                      <div className="card-body">
                  <div className="row">
                      <div className="col-md-4"><h6><strong>Full Name</strong></h6></div>
                      <div className="col-md-4"><h6><strong>Department</strong></h6></div>
                      <div className="col-md-4"><h6><strong>Type</strong></h6></div>
                  </div>
                   <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={profile1} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Dom Sibley </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>Devops</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-danger mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Tech interview</span>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={Profile2} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Joe Root </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>UX/UI Designer</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-success mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Resume review</span>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={profile1} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Zak Crawley </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>.Net developer</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-primary mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Final interview</span>
                      </div>
                  </div>
                   <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={profile1} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Dom Sibley </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>Devops</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-danger mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Tech interview</span>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={Profile2} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Joe Root </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>UX/UI Designer</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-success mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Resume review</span>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-4">
                          <img src={profile1} alt="" height={"30px"} className='rounded mr-3'/> <span style={{fontWeight:"500"}}>Zak Crawley </span>
                      </div>
                      <div className="col-md-4">
                         <span style={{fontWeight:"500"}}>.Net developer</span> 
                      </div>
                      <div className="col-md-4">
                         <i className='fa fa-circle text-primary mr-2' style={{fontSize:"9px"}}></i> <span style={{fontWeight:"500"}}>Final interview</span>
                      </div>
                  </div>                  
                      </div>

                      
                      
                  </div>
    </div>
  )
}
