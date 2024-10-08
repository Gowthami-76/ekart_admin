import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import Chart from 'chart.js';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    // styleUrls: ['./dashboard.component.css']
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  LocationsList: any;
  locationsCount: any;
  productlistCount: any;
  languageCount: any;
  // EkartServices: any;
  userCount: any;
  reqData: any;
  reportCount: any;
  feedbackCount: any;
  productsizeCount: any;
  productlenthCount: any;

  constructor(private router: Router, private ekartServices: EkartadminService) {
    this.getallLocations();
    this.getProductList();
    this.getLanguages();
    this.getRequest();
    // this.getUserDetails();
    this.getUserDetails();
    this.getReports();
    this.getFeedback();
    this.getallSizes();
    this.getallProductLenghts();
  }

    ngOnInit(){

    

      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }

    getProductList() {
      this.ekartServices.ListofProducts().subscribe((resp) => {
        if(resp.StatusCode == 200) {
          this.productlistCount = resp.count
          console.log('product', this.productlistCount)
        }
      })
    }

    getUserDetails() {
      this.ekartServices.UsersList().subscribe((Userresp) => {
        if (Userresp.statusCode == 200) {
          this.userCount = Userresp.count
          console.log('userCount', this.userCount)
        }
      });
    }

    getLanguages() {
      this.ekartServices.getLanguages().subscribe((languageResp) => {
        if (languageResp.StatusCode == 200) {
         this.languageCount = languageResp.Data.Count
         console.log('language', this.languageCount)
        }
      });
    }

    getallSizes() {
      this.ekartServices.getproductSizes().subscribe((allsizesResp) => {
        if(allsizesResp.StatusCode == 200) {
          this.productsizeCount = allsizesResp.Data.sizesCount
          console.log("List", this.productsizeCount)
        }
      })
    }

    getallProductLenghts() {
      this.ekartServices.getallproductlenghts().subscribe((getlengthResp) => {
        if(getlengthResp.StatusCode == 200) {
          this.productlenthCount = getlengthResp.Data.sizesCount;
        }
      })
    }

    getallLocations() {
      this.ekartServices.getLocations().subscribe((getLocationResp) => {
        if (getLocationResp.StatusCode == 200) {
          this.locationsCount = getLocationResp.Data.locationsCount
          console.log('count', this.locationsCount)
        }
      })
    }

    getReports() {
      this.ekartServices.getRepots().subscribe((reportsResp) => {
        if(reportsResp.statusCode == 200) {
          this.reportCount = reportsResp.count
        }
      })
    }

    getFeedback() {
      this.ekartServices.getFeedbacklist().subscribe((getfeedbackResp) => {
        if(getfeedbackResp.statusCode == 200) {
         this.feedbackCount = getfeedbackResp.count
        }
      })
    }
    

    getRequest(){
      this.ekartServices.getRequestList().subscribe((requestResp) => {
        if(requestResp.statusCode == 200){
          this.reqData = requestResp.count
        }
  
      })
    }

    
}
