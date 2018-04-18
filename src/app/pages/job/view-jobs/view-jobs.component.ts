import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
  jobs: Object;
  job: Object;
  @Input() jobId: String;
  @Output() jobIdEvent = new EventEmitter<string>();

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

  onShowMore(i){
    this.jobIdEvent.emit(this.jobs[i].id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "jobId": this.jobs[i].id.toString()
      }
    };
    this.router.navigate(['/job/view-job'], navigationExtras);
  }

}
