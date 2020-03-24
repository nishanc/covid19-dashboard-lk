import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { ApiResponse, HospitalData } from 'src/app/_interfaces/apiresponse';

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  staticAlertClosed  = false;
  staticAlertClosed1 = false;
  staticAlertClosed2 = false;
  staticAlertClosed3 = false;
  staticAlertClosed4 = false;
  staticAlertClosed5 = false;
  staticAlertClosed6 = false;
  staticAlertClosed7 = false;

  lastrecord: ApiResponse; 
  hospitals: HospitalData[];
  lastupdated: string;
  dataLocalRec: number;
  dataLocalNew: number;
  dataLocalTotal: number;
  dataLocalInHospitals: number;
  dataGlobalRec: number;
  dataGlobalNew: number;
  dataGlobalTotal: number;
  dataLocalNewDeaths: number;
  dataLocalTotalDeaths: number;
  dataGlobalTotalDeaths: number;

  constructor(private toastr: ToastrService, private dashboardService: DashboardService) {}

  showNotification(from, align){

      const color = Math.floor((Math.random() * 5) + 1);

      switch(color){
        case 1:
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
           disableTimeOut: true,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-info alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 2:
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
           disableTimeOut: true,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 3:
        this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
           disableTimeOut: true,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-warning alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
        break;
        case 4:
        this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
           disableTimeOut: true,
           enableHtml: true,
           closeButton: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-' + from + '-' +  align
         });
         break;
         case 5:
         this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
            disableTimeOut: true,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: 'toast-' + from + '-' +  align
          });
        break;
        default:
        break;
      }
  }

  ngOnInit() {
    this.getDataLast();
  }

  public getDataLast(){
    this.dashboardService.getLastData().subscribe(res => {
      this.lastrecord = res as unknown as ApiResponse;
      // console.log(this.lastrecord[0])
      this.hospitals = this.lastrecord[0].hospital_data;
      this.lastupdated = this.lastrecord[0].update_date_time;

      this.dataLocalRec = this.lastrecord[0].local_recovered;
      this.dataLocalInHospitals = this.lastrecord[0].local_total_number_of_individuals_in_hospitals;
      this.dataLocalNew = this.lastrecord[0].local_new_cases;
      this.dataLocalTotal = this.lastrecord[0].local_total_cases;

      this.dataGlobalRec = this.lastrecord[0].global_recovered;
      this.dataGlobalNew = this.lastrecord[0].global_new_cases;
      this.dataGlobalTotal = this.lastrecord[0].global_total_cases;

      this.dataLocalNewDeaths = this.lastrecord[0].local_new_deaths;
      this.dataLocalTotalDeaths = this.lastrecord[0].local_deaths;
      this.dataGlobalTotalDeaths = this.lastrecord[0].global_deaths;
      // console.log(this.hospitals[0].hospital.name_si)
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Last Updated On</b> - '+ this.lastupdated, '', {
        // disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        timeOut: 10000,
        toastClass: "alert alert-info alert-with-icon",
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

}
