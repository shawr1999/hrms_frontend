import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [44, 56],
        
      options: {
        chart: {
          width: "100%",
          type: 'donut',
        },
        plotOptions: {
            pie: {
              donut: {
              size: '80%', // Adjust this to make the donut slimmer or thicker
              width: '20px', // Adjust this to control the thickness of the donut slices
              labels: {
                      show: false,
                      total: {
                        showAlways: true,
                        show: true
                      }
                    }
                },
                
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
          },
            labels: ["Remote", "On-site"],

          fill: {
            colors: ['#8F76FF', '#482acd'],
            type: 'gradient',
        },
          legend: {
             show: false,
             formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
        // title: {
        //   text: 'Gradient Donut with custom Start-angle',
        // },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width={"100%"}
            height={238}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default function Donut() {
  return (
      <div>
          <div className="card" style={{ borderRadius: "12px" }}>
                <div class="card-header bg-white">Working Format</div>

                      <div className="card-body">
                          <ApexChart />
                          <div className="row">
                              <div className="col-md-6">
                                  <p><i class="fa-solid fa-circle mr-2" style={{color:"#8F76FF"}}></i>Remote</p>
                              </div>
                              <div className="col-md-6 text-right">
                                  <p><i class="fa-solid fa-circle mr-2" style={{color:"#482acd"}}></i>On-site</p>
                              </div>
                          </div>
                      </div>

                      
                      
                  </div>
          
      
    </div>
  );
}
