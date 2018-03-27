import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-view-company-jobs',
  templateUrl: './view-company-jobs.component.html',
  styleUrls: ['./view-company-jobs.component.css']
})
export class ViewCompanyJobsComponent implements OnInit {
  jobs: Object;
  job: Object;
  constructor(
      private authService: AuthService,
      private router: Router,
      private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getCompanyJobs().subscribe(data => {
      if(data.success) {
        this.jobs = data.jobs;
        console.log(this.jobs);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onApplySubmit(i){
    this.authService.applyForJob(this.jobs[i]).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    })
    console.log(this.jobs[i]);
  }

}
