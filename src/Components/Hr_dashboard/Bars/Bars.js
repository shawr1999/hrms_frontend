import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
                name: "Happiness",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 100]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['blueviolet'],
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              
              // title: {
              //   text: 'Product Trends by Month',
              //   align: 'left'
              // },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              }
            },
          
          
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={130} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }


export default function Column() {
  return (
    <div>
              <div className="card shadow-lg" style={{ borderRadius: "10px" }}>
                
                      <div className="card-body">
                          <ApexChart />
                          
                      </div>

                      
                      
                  </div>
    </div>
  )
}
