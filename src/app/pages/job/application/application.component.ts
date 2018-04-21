import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import {FlashMessagesService} from "angular2-flash-messages";
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  applicationId: string;
  application: any;
  sortType: string;
  sortReverse: Boolean=true;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.applicationId = params["applicationId"];
      this.getJobApplicationById();
    });
  }

  getJobApplicationById(){
    if (this.applicationId) {
      this.authService.getJobApplicationById(this.applicationId).subscribe(data => {
          if (data.success) {
            this.application = data.job_application[0];
            console.log(this.application);
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          }
        },
        err => {
          console.log(err);
          return false;
        });
    }
  }

  dynamicSort(property) {
    var sortOrder = 1;
    // if(!this.sortReverse) {
    //   sortOrder = -1;
    //   property = property.substr(1);
    // }
    return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  onSortTable(sortType){
    this.sortType = sortType;
    if(this.sortReverse) {
      this.application.temp_employees.sort(this.dynamicSort(this.sortType));
    } else {
      this.application.temp_employees.sort(this.dynamicSort(this.sortType));
      this.application.temp_employees.reverse(this.dynamicSort(this.sortType));
    }
    this.sortReverse = !this.sortReverse;
  }

  onViewEmp(empId){

  }

  onAccept(empId){

  }

  onReject(empId){

  }
}
