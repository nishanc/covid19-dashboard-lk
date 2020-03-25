import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { ApiResponse, HospitalData } from 'src/app/_interfaces/apiresponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public clickedOnce: boolean = false;
  apiresponse: ApiResponse[];
  lastrecord: ApiResponse; 
  hospitals: HospitalData[];
  labels = [];
  dataSetLocalTotal = [];
  dataSetGlobalTotal = [];
  dataSetLocalNew = [];
  dataSetLocalRec = [];
  dataLocalRec: number;
  dataSetLocalDead = [];
  dataLocalDead: number;
  dataSetLocalInHospitals = [];
  dataLocalInHospitals: number;
  dataLocalRecRate: number;
  dataGlobalMor: number;
  dataLocalMor: number;
  constructor(private toastr: ToastrService, private dashboardService: DashboardService) {}

  public getDataAll(){
    this.dashboardService.getData().subscribe(res => {
      this.apiresponse = res as unknown as ApiResponse[];
      // console.log(this.apiresponse[0].update_date_time)
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>COVID-19 Sri Lanka Dashboard</b>.', '', {
        // disableTimeOut: true,
        closeButton: false,
        enableHtml: true,
        timeOut: 3000,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-top-center'
      });

      for (var item of this.apiresponse) {
        // console.log(item.update_date_time)
        let labelArr = [];
        var dateL = new Date(item.update_date_time).toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
        })
        var timeL = new Date(item.update_date_time).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
        // console.log(dateL);
        // console.log(timeL);
        labelArr.push(dateL)
        labelArr.push(timeL)
        this.labels.push(labelArr)
        this.dataSetLocalTotal.push(item?.local_total_cases)
        this.dataSetGlobalTotal.push(item?.global_total_cases)
        this.dataSetLocalNew.push(item?.local_new_cases)
        this.dataSetLocalRec.push(item?.local_recovered)
        this.dataSetLocalDead.push(item?.local_deaths)
        this.dataSetLocalInHospitals.push(item?.local_total_number_of_individuals_in_hospitals)
      }
      this.dataLocalRec = this.dataSetLocalRec[0];
      this.dataLocalDead = this.dataSetLocalDead[0];
      this.dataLocalInHospitals = this.dataSetLocalInHospitals[0];

      var gradientChartOptionsConfigurationWithTooltipBlue: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }]
        }
      };
  
      var gradientChartOptionsConfigurationWithTooltipPurple: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };
  
      var gradientChartOptionsConfigurationWithTooltipRed: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            position: 'right',
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };
  
      var gradientChartOptionsConfigurationWithTooltipOrange: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(220,53,69,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }]
        }
      };
  
      var gradientChartOptionsConfigurationWithTooltipGreen: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            position: 'right',
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };
  
  
      var gradientBarChartConfiguration: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            position: 'right',
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
  
          xAxes: [{
  
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };
  
      this.canvas = document.getElementById("chartLineRed");
      this.ctx = this.canvas.getContext("2d");
  
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
  
      var data = {
        labels: this.labels.reverse(),
        datasets: [{
          label: "Count",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.dataSetLocalDead.reverse(),
        }]
      };
  
      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipRed
      });
  
  
      this.canvas = document.getElementById("chartLineGreen");
      this.ctx = this.canvas.getContext("2d");
  
  
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
  
      var data2 = {
        labels: this.labels,
        datasets: [{
          label: "Count",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data:  this.dataSetLocalRec.reverse(),
        }]
      };
  
      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data2,
        options: gradientChartOptionsConfigurationWithTooltipGreen
  
      });
  
      var chart_labels = this.labels;
      if(chart_labels != []) {
        // console.log(chart_labels)
        this.datasets = [
          this.dataSetLocalTotal.reverse(),
          this.dataSetLocalNew.reverse(),
          this.dataSetGlobalTotal.reverse()
          
        ];
        this.data = this.datasets[0];
      }
      
  
      this.canvas = document.getElementById("chartBig1");
      this.ctx = this.canvas.getContext("2d");
  
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
  
      var config = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: "Count",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: gradientChartOptionsConfigurationWithTooltipRed
      };
      this.myChartData = new Chart(this.ctx, config);
  
  
      this.canvas = document.getElementById("CountryChart");
      this.ctx  = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
  
  
      var myChart = new Chart(this.ctx, {
        type: 'bar',
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: this.labels,
          datasets: [{
            label: "Count",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: this.dataSetLocalInHospitals.reverse(),
          }]
        },
        options: gradientBarChartConfiguration
      });
    }, error => {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Oh no!</b> - something went wrong.', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-center'
      });
      console.log(error)
    });
  }

  public getDataLast(){
    this.dashboardService.getLastData().subscribe(res => {
      this.lastrecord = res as unknown as ApiResponse;
      // console.log(this.lastrecord[0])
      this.hospitals = this.lastrecord[0].hospital_data;
      // console.log(this.hospitals[0].hospital.name_si)
      this.dataLocalRecRate = (this.lastrecord[0].local_recovered / this.lastrecord[0].local_total_cases) * 100.0;
      this.dataGlobalMor = (this.lastrecord[0].global_deaths / this.lastrecord[0].global_total_cases) * 100.0;
      this.dataLocalMor = (this.lastrecord[0].local_deaths / this.lastrecord[0].local_total_cases) * 100.0;
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>'+ this.lastrecord[0].local_recovered +'<b> Recovered.', '', {
        // disableTimeOut: true,
        closeButton: false,
        enableHtml: true,
        timeOut: 3000,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-top-center'
      });
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>'+ this.lastrecord[0].local_deaths +'<b> Deaths</b>.', '', {
        // disableTimeOut: true,
        closeButton: false,
        enableHtml: true,
        timeOut: 3000,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-top-center'
      });
    }, error => {
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Oh no!</b> - something went wrong.', '', {
        disableTimeOut: true,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-center'
      });
      console.log(error)
    });
  }

  ngOnInit() {
    console.log("oninit")
    this.getDataAll();
    this.getDataLast();
  }

  public updateOptions(btn: number) {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
    if(btn == 1) {
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Local Total Cases</b>', '', {
        // disableTimeOut: true,
        closeButton: false,
        enableHtml: true,
        timeOut: 2000,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: 'toast-top-center'
      });
    }
    else if(btn == 2) {
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Local New Cases</b>', '', {
        // disableTimeOut: true,
        closeButton: false,
        enableHtml: true,
        timeOut: 2000,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: 'toast-top-center'
      });
    }
    else if(btn == 3) {
      if(this.clickedOnce == false){
        this.clickedOnce = true;
      }
      else {
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Global Total Cases</b>', '', {
          // disableTimeOut: true,
          closeButton: false,
          enableHtml: true,
          timeOut: 2000,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-top-center'
        });
        this.clickedOnce = false;
      }
    }
    else
      console.log('undefined')
  }
}
