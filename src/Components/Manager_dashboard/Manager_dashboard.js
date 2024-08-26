import React from 'react'
import notification from './notification.png'
import message from './message.png'
import employee from './employee.png'
import add from './add.png'
import Progress from './Radial/Radial'
import Clients from './clients/clients'
import Wave from './wave/wave'
import Wave1 from './wave/wave1'
import Bar from './bar/bar'
import Bar2 from './bar/bar2'

export default function Manager_dashboard() {
  return (
    <div>
          <div className="main">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-md-3">
                        <div className="card" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row">
                                      <div className="col-md-3">
                                          <img src={notification} alt="notification" height={"70px"}/>
                                      </div>
                                      <div className="col-md-9 text-white mt-2" style={{lineHeight:"2px"}}>
                                          <h5>
                                            Notifications
                                          </h5>
                                          <p>
                                            6 Unread notifications
                                          </p>
                                          
                                      </div>
                                                                           
                                    
                                </div>
                            
                            </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row">
                                     <div className="col-md-3">
                                          <img src={message} alt="message" height={"70px"} />
                                      </div>
                                      <div className="col-md-9 text-white mt-2" style={{lineHeight:"2px"}}>
                                          <h5>
                                            Messages
                                          </h5>
                                          <p>
                                            6 Unread messages
                                          </p>
                                      </div>
                                </div>

                            </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                          <img src={employee} alt="employee" height={"70px"} />
                                      </div>
                                      <div className="col-md-9 text-white mt-2" style={{lineHeight:"2px"}}>
                                          <h5>
                                            Total Employees
                                          </h5>
                                          <p>
                                            26 employees
                                          </p>
                                      </div>
                                </div>

                            </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row">
                                     <div className="col-md-3">
                                          <img src={add} alt="Create New Project" height={"70px"}/>
                                      </div>
                                      <div className="col-md-9 text-white pr-4 mt-2">
                                          <h5>
                                            Create New Project
                                          </h5>
                                          
                                      </div>
                                </div>

                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="row mt-4">
                      <h5>Project</h5>
                      <div className="col-md-5">
                          
                           <div className="card shadow-lg" style={{borderRadius:"15px"}}>
                      <div className="card-body" >
                          <Progress/>
                      </div>
                  </div>
                          
                      </div>
                      <div className="col-md-7">
                           <div className="row">
                      <div className="col-md-6">
                        <div className="card" style={{ borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row">
                                      <div className="col-md-6">
  
                                            <h6 style={{color:"blueviolet"}}>
                                            Total Client
                                          </h6>
                                                  <div className="row" style={{color:"blueviolet"}}>
                                                      <div className="col-md-4" style={{color:"blueviolet"}}>
                                                          <h3>75</h3>
                                                  </div>
                                                      <div className="col-md-8" style={{lineHeight:"15px"}}>
                                                          <p><i className='fa-solid fa-caret-up ml-1'></i>
                                                          <span className='d-block'>+0.5%</span></p>
                                                          
                                                  </div>
                                                  </div>
                                              </div>
                                      <div className="col-md-6" style={{height:"100px"}}>
                                        <Clients/>
                                          
                                      </div>
                                                                           
                                    
                                </div>
                            
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                          <div className="row text-white">
                                               <h6 >
                                                      Total Task Done
                                                  </h6>
                                              <div className="col-md-9 py-2" style={{height:"70px"}}>
                                                  <progress value="35" max="75" className='shadow-lg ' style={{ height: "20px", width: "100%" }}></progress>
                                                  <p>40 Left from target</p>
                                          
                                      </div>
                                      <div className="col-md-3 text-white">
  
                                           
                                                 <h3>75</h3>
                                              </div>
                                      
                                                                           
                                    
                                </div>

                            </div>
                        </div>
                              </div>
                                                </div>

                      <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="card shadow-lg" style={{ borderRadius:"15px"}}>
                            <div className="card-body">
                               <div className="row">
                                      <div className="col-md-6">
  
                                            <h3 style={{color:"blueviolet"}}>
                                            100
                                          </h3>
                                                  <div className="row" style={{color:"blueviolet"}}>
                                                      <div className="col-md-12" style={{color:"blueviolet"}}>
                                                          <h6>Total Clients</h6>
                                                        </div>
                                                    
                                                  </div>
                                              </div>
                                      <div className="col-md-6" >
                                        <Wave/>
                                          
                                      </div>
                                                                           
                                    
                                </div>

                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                            <div className="card-body">
                                <div className="row text-white">
                                      <div className="col-md-6">
  
                                            <h3 >
                                            30
                                          </h3>
                                                  <div className="row" >
                                                      <div className="col-md-12" >
                                                          <h6>New Project</h6>
                                                        </div>
                                                    
                                                  </div>
                                              </div>
                                      <div className="col-md-6" >
                                        <Wave1/>
                                          
                                      </div>
                                                                           
                                    
                                </div>

                            </div>
                        </div>
                      </div>
                      </div>
                      </div>
                  </div>
                  
                  <div className="row mt-4">
                      <div className="col-md-3">
                          <div className="card shadow-lg" style={{borderRadius:"15px"}}>
                              <div className="card-body">
                                  <p>Current Balance</p>
                                  <h5><b>$29,999</b></h5>
                                  <p>
                                      +3.2 than last week
                                  </p>
                                  <Bar/>
                              </div>
                          </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-lg" style={{borderRadius:"15px"}}>
                              <div className="card-body">
                                  <p>Current Balance</p>
                                  <h5><b>$29,999</b></h5>
                                  <p>
                                      +3.2 than last week
                                  </p>
                                  <Bar2/>
                              </div>
                          </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-lg" style={{borderRadius:"15px"}}>
                <div className="card-body">
                  <h5>Daily Task</h5>

                  <div className="row">
                    <div className="col-md-2">
                      10:00
                    </div>
                    <div className="col-md-10">
                      <div className="card text-white" style={{borderRadius:"15px", background:"orange"}} >
                        <div className="card-body">
                          <h5>HRMS Meeting</h5>
                          <p>10:00 - 11:00</p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-2">
                      11:00
                    </div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card text-white" style={{borderRadius:"15px", background:"orange"}} >
                        <div className="card-body">
                          <h5>HRMS Meeting</h5>
                          <p>11:00 - 11:30</p>
                        </div>
                      </div>

                        </div>
                        <div className="col-md-6">
                            
                      <div className="card text-white" style={{borderRadius:"15px", background:"orange"}} >
                        <div className="card-body">
                          <h5>HRMS Meeting</h5>
                          <p>11:30 - 12:00</p>
                        </div>
                      </div>

                        </div>
                      </div>
                    

                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-2">
                      12:00
                    </div>
                    <div className="col-md-10">
                      <div className="card text-white" style={{borderRadius:"15px", background:"orange"}} >
                        <div className="card-body">
                          <h5>HRMS Meeting</h5>
                          <p>10:00 - 11:00</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </div>
                
              </div>
        </div>
    </div>
  )
}
