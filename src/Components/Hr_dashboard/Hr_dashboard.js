import React from 'react'
import working from './working-man.png'
import leader from './leader.png'
import presnt from './present.png'
import absent from './absent.png'
import Column from './Bars/Bars'
import feedback from './feedback.png'
import Radial from './Radial/Radial'
import girl_profile from './girl-profile.jpg'
import medical from './medical.png'
import interview from './interview.png'
import shortlist from './shortlist.png'

export default function Hr_Dashboard() {
  return (
    <div>
          <div className="main">
              <div className="container-fluid p-5">
                  <div className="row">
                      <div className="col-md-8 px-5">
                          <h3><strong>Hello</strong> HR!</h3>
                          <p>Good Morning</p>
                          
                          <div className="row">
                              <div className="col-md-8">
                                  <div className="row">
                                      <div className="col-md-6">
                                        <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"  }}>
                                            <div className="card-body">
                                                <div className="row">
                                                      <div className="col-md-5">
                                                          <img src={presnt} alt="presnt" height={'65px'}/>
                                                      </div>
                                                      <div className="col-md-7 text-white">
                                                          <h6>Present</h6>
                                                          <h5>16</h5>
                                                      </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                      <div className="col-md-6">
                                          <div className="card shadow-lg" style={{background:"blueviolet", borderRadius:"15px"  }}>
                                            <div className="card-body">
                                                   <div className="row">
                                                      <div className="col-md-5">
                                                          <img src={absent} alt="presnt" height={'65px'}/>
                                                      </div>
                                                      <div className="col-md-7 text-white">
                                                          <h6>Absent</h6>
                                                          <h5>16</h5>
                                                      </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="row mt-4">
                                      <h5>Happiness Graph</h5>
                                      <div className="col-md-12">
                                          <Column/>
                                    </div>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="card shadow-lg text-center" style={{borderRadius:"15px"}}>
                                      <div className="card-body pt-5">
                                          <h6>HAVE ANY SPECIAL FEEDBACK</h6>
                                          <button className='btn text-white mt-3' style={{ background: "blueviolet" }}>POST NOW</button>
                                          <img src={feedback} alt="feedback" className='mt-5' height={'120px'}/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="row mt-4">
                              <div className="col-md-6">
                                <h5>Today's Plans</h5>

                                  <div className="card shadow-lg" style={{borderRadius:"15px"}}>
                                  <div className="card-body">
                                    <div className='p-2 mt-3 shadow-lg' style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderLeft:"5px solid green", borderRadius:"15px", lineHeight:"3px"}}>
                                        <h5>
                                            Morning Huddle
                                              </h5>
                                              <p>
                                                  Team Huddle 
                                              </p>
                                              <h6>9:00 AM</h6>
                                    </div>
                                    <div className='p-2 mt-3 shadow-lg' style={{backgroundColor: "rgba(138, 43, 226, 0.2)", borderLeft:"5px solid blueviolet", borderRadius:"15px", lineHeight:"3px"}}>
                                        <h5>
                                            Morning Huddle
                                              </h5>
                                              <p>
                                                  Team Huddle 
                                              </p>
                                              <h6>9:00 AM</h6>
                                    </div>
                                    <div className='p-2 mt-3 shadow-lg' style={{backgroundColor: "rgba(0, 0, 255, 0.2)", borderLeft:"5px solid rgb(0,0,255)", borderRadius:"15px", lineHeight:"3px"}}>
                                        <h5>
                                            Morning Huddle
                                              </h5>
                                              <p>
                                                  Team Huddle 
                                              </p>
                                              <h6>9:00 AM</h6>
                                    </div>
                                    <div className='p-2 mt-3 shadow-lg' style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderLeft:"5px solid rgb(255,0,0)", borderRadius:"15px", lineHeight:"3px"}}>
                                        <h5>
                                            Morning Huddle
                                              </h5>
                                              <p>
                                                  Team Huddle 
                                              </p>
                                              <h6>9:00 AM</h6>
                                    </div>
                                   
                                    
                                   

                                  </div>
                              </div>
                              </div>
                              <div className="col-md-6">
                                <h5>Team Members</h5>

                                  <div className="card shadow-lg" style={{borderRadius:"15px", height:"480px"}}>
                                      <div className="card-body overflow-auto">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <h3>29</h3>
                                                <p>TEAM MEMBERS</p>
                                              </div>
                                              <div className="col-md-6">
                                                  <Radial/>
                                              </div>
                                          </div>
                                        <div className="">
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                          <div className="row">
                                              <div className="col-md-2">
                                                  <img src={girl_profile} alt="Employee Profile" height={'60px'} style={{borderRadius:"60%"}}/>
                                              </div>
                                              <div className="col-md-10 pl-4">
                                                  <h5>Janny Will</h5>
                                                  <p>Developer</p>
                                              </div>
                        
                                          </div>
                                        </div>
                                   
                                    
                                   

                                  </div>
                              </div>
                              </div>

                          </div>

                      </div>






                      <div className="col-md-4 pt-4">
                          
                          <div className="card shadow-lg mt-5" style={{borderRadius:"15px"}}>
                              <div className="card-body">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card text-white shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                                              <div className="card-body">
                                                  <h6 className="card-title">Leaves</h6>
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-text">10</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src={medical} alt="" height={"50px"} style={{position:"absolute", bottom:"-15px", left:"2px"}}/>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                           <div className="card text-white shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                                              <div className="card-body">
                                                  <h6 className="card-title">Interview</h6>
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-text">10</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <img src={interview} alt="" height={"70px"} style={{position:"absolute", bottom:"-18px", left:"2px"}}/>

                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                                                      
                                  </div>
                                  <div className="row mt-2">
                                      <div className="col-md-6">
                                          <div className="card text-white shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                                              <div className="card-body">
                                                  <h6 className="card-title">Shortlisted</h6>
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-text">10</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src={shortlist} alt="" height={"70px"} style={{position:"absolute", bottom:"-20px", right:"-4px"}}/>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                           <div className="card text-white shadow-lg" style={{background:"blueviolet", borderRadius:"15px"}}>
                                              <div className="card-body">
                                                  <h6 className="card-title">Feedbacks</h6>
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-text">10</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src={feedback} alt="" height={"50px"} style={{position:"absolute", bottom:"-14px", right:"-4px"}}/>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                                                      
                                  </div>
                                 
                                  <div className='mt-4' >
                                      <div className="card shadow-lg" style={{background:"blueViolet", borderRadius:"15px"}}>
                                          <div className="card-body">
                                              <h5 className='text-white'>Today's Attendance</h5>
                                              <div className="row mt-3 text-white text-center">
                                                  <div className="col-md-6">
                                                      <h4>
                                                          20
                                                      </h4>
                                                      <h6>
                                                          Present
                                                      </h6>
                                                  </div>
                                                  <div className="col-md-6">
                                                      <h4>
                                                          9
                                                      </h4>
                                                      <h6>
                                                          Absent
                                                      </h6>
                                                  </div>
                                              </div>
                                              
                                          </div>
                                      </div>
                                      <div className='overflow-auto' style={{height:"500px"}}>
                                          
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(0, 128, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                    <h6>John Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>10:00 am</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>07:00 pm</p>
                                                          </div>
                                                    </div>
                                                  </div>
                                              </div>
                                                  </div>
                                            </div>  
                                      <div className="card mt-2 shadow-lg" style={{backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius:"15px"}}>
                                                  <div className="card-body">
                                                        <div className="row">
                                                  <div className="col-md-5 py-2" style={{lineHeight:"2px"}}>
                                                      <h6>James Hopes</h6>
                                                  </div>
                                                  <div className="col-md-7 text-center" style={{lineHeight:"2px"}}>
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <h6><strong>IN</strong></h6>
                                                              <p>-</p>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <h6><strong>OUT</strong></h6>
                                                              <p>-</p>
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
                  </div>

            
              

              
              
              

            </div>
        </div>
    </div>
  )
}
