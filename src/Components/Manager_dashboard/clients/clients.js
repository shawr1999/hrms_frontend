import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [70],
            options: {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              
              
              plotOptions: {
                radialBar: {
                //   startAngle: -115,
                //   endAngle: 245,
                   hollow: {
                    margin: 0,
                    size: '70%',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                      enabled: true,
                      top: 3,
                      left: 0,
                      blur: 4,
                      opacity: 0.24
                    }
                  },
                  track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                      enabled: true,
                      top: -3,
                      left: 0,
                      blur: 4,
                      opacity: 0.35
                    }
                  },
              
                  dataLabels: {
                    show: true,
                    name: {
                      offsetY: 2,
                      show: true,
                      color: '#888',
                      fontSize: '10px'
                    },
                    value: {
                      formatter: function(val) {
                        return parseInt(val);
                      },
                      offsetY: -5,
                      color: 'blueviolet',
                      fontSize: '19px',
                      show: true,
                    }
                  }
                }
              },
              
                labels: [''],
                
              colors: ['blueviolet'],
              },
            
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={"80%"} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }

export default function clients() {
  return (
    <div>
      <ApexChart />
    </div>
  )
}
