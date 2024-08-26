import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

        class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
                name: "UAGC",
                data: [10, 4, 3, 5, 4, 12]
            },
            {
                name: "SA",
                data: [5, 1, 5, 5, 4, 6]
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
              colors: ['blueviolet','#D4E9FF'],
              dataLabels: {
                enabled: false,          
                
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
                  opacity: 0.0
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
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={250} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }


export default function progress() {
  return (
    <div>
              
      <ApexChart />
                          

                      
                      
    </div>
  )
}
