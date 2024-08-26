import React from 'react'

export default function Info_grid() {
  return (
    <div>
          <div className="row">
              <div className="col-md-3">
                  <div class="card" style={{borderRadius:"10px"}}>
  <div class="card-body">
    <h5 class="card-title">Total employees</h5>
        <div className="row">
            <div className="col-md-6">
                <h3 class="card-text">352</h3>
            </div>
            <div className="col-md-6">
                <p style={{color:"green"}}><i class="fa-solid fa-arrow-trend-up mr-3"></i>+25%</p>
            </div>
    </div>
  </div>
</div>
              </div>
              <div className="col-md-3">
                  <div class="card" style={{borderRadius:"10px"}}>
  <div class="card-body">
    <h5 class="card-title">Number of leave
</h5>
        <div className="row">
            <div className="col-md-6">
                <h3 class="card-text">352</h3>
            </div>
            <div className="col-md-6">
                <p style={{color:"red", borderRadius:"15px"}}><i class="fa-solid fa-arrow-trend-down"></i>+25%</p>
            </div>
    </div>
  </div>
</div>
              </div>
              <div className="col-md-3">
                  <div class="card" style={{borderRadius:"10px"}}>
  <div class="card-body">
    <h5 class="card-title">New employees</h5>
        <div className="row">
            <div className="col-md-6">
                <h3 class="card-text">352</h3>
            </div>
            <div className="col-md-6">
                <p style={{color:"green"}}><i class="fa-solid fa-arrow-trend-up mr-3"></i>+25%</p>
            </div>
    </div>
  </div>
</div>
              </div>
              <div className="col-md-3">
                  <div class="card" style={{borderRadius:"10px"}}>
  <div class="card-body">
    <h5 class="card-title">Happinnes rate</h5>
        <div className="row">
            <div className="col-md-6">
                <h3 class="card-text">352</h3>
            </div>
            <div className="col-md-6">
                <p style={{color:"green"}}><i class="fa-solid fa-arrow-trend-up mr-3"></i>+25%</p>
            </div>
    </div>
  </div>
</div>
              </div>
      </div>
    </div>
  )
}
