import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Net Profit',
              data: [244, 255, 157, 256, 161, 158, 300, 255, 157, 256, 161, 158]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: false
                }
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '45%',
                  borderRadius: 3,
                  endingShape: 'rounded',
                  borderRadiusApplication: 'end',
                  borderRadiusWhenStacked: 'last'
                  
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              },
              yaxis: {
                // title: {
                //   text: '$ (thousands)'
                // }
              },
              fill: {
                opacity: 1,
                  colors: ['#8F76FF'],
                type: 'gradient'
              },
              legend: {
             show: false,
             
        },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return "$ " + val + " thousands"
                  }
                }
              }
            },
          
          
          };
        }

      

        render() {
          return (
            <div>
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={"300px"} />
              </div>
              <div id="html-dist"></div>
            </div>
          );
        }
      }


export default function Column() {
  return (
    <div>
              <div className="card" style={{ borderRadius: "10px" }}>
                <div class="card-header bg-white">Project employment
</div>

                      <div className="card-body">
                          <ApexChart />
                          
                      </div>

                      
                      
                  </div>
    </div>
  )
}
