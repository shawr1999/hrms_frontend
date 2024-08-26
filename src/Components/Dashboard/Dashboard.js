import React from 'react'
import Info_grid from './info-grid/Info_grid';
import Donut from './Charts/Donut/Donut';
import Bars from './Charts/Bars/Bars';
import Application_bar from './Charts/Application-Bar/Application_bar';
import Column from './Charts/Column/Column';
import Recruitment_progress from './Recruitment_progress/Recruitment_progress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {


  return (
    <div>
      <div className="main">
        {/* <h1>{userEmail}</h1> */}
        {/* <button className="btn btn-secondary" onClick={handleLogout}>Logout</button> */}
          <div className="container-fluid">
              <Info_grid />

              <div className="row mt-3">
                  <div className="col-md-3">
                    <Donut/>

                  </div>
                  <div className="col-md-6">
                      <Bars/>
          </div>
          <div className="col-md-3">
                    <Application_bar/>

                  </div>
        </div>
        <div className="row mt-3">
                  <div className="col-md-6">
                    <Column/>

                  </div>
          <div className="col-md-6">
            <Recruitment_progress/>
          </div>
          
              </div>
        </div>
      </div>
    </div>
  )
}
