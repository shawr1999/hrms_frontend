import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

        class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
                name: "UAGC",
                data: [10, 8, 10, 10, 7, 12]
            }
            ],
            options: {
              chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: false,
                  color: '#000',
                  top: 8,
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
              colors: ['#ffffff'],
              dataLabels: {
                enabled: false,          
                
              },
              tooltip: {
                theme: 'dark', // 'dark' theme for better contrast
                style: {
                  fontSize: '12px',
                  fontFamily: undefined
                },
              },
              stroke: {
                curve: 'smooth'
              },
              
              // title: {
              //   text: 'Product Trends by Month',
              //   align: 'left'
              // },
                grid: {
                  show: false,
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.0
                },
              },
                xaxis: {
                  labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                
                },
                yaxis: {
                    labels: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
            },
          
          
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={"70%"} />
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
