import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  jobId: String;
  job: Object;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.jobId = params["jobId"];
      this.getJobById();
    });
  }

  getJobById() {
    if (this.jobId) {
      this.authService.getJobById(this.jobId).subscribe(data => {
          if (data.success) {
            this.job = data.job;
            console.log(this.job);
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

}
