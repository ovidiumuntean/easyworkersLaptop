import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  job_applications: Object;
  job: Object;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getJobApplications();
  }

  getJobApplications(){
    this.authService.getJobApplications().subscribe(data => {
        if (data.success) {
          this.job_applications = data.job_applications;
          console.log(this.job_applications);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onApplySubmit(){

  }

  onShowApplication(applicationId){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "applicationId": applicationId
      }
    };
    this.router.navigate(['/job/job-application'], navigationExtras);
  }
}
