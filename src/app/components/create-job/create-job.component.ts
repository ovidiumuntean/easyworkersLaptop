import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  title: String;
  description: String;
  type: String;
  experience: Number;
  category: String;
  company_id: String;
  timestamp: Date;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onJobSubmit() {

    let companyId = '';
    if (localStorage) {
      const employee = JSON.parse(localStorage.getItem('employee'));
      companyId = employee.companyId;
    } else {
      console.log('localStorage empty');
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/']);
    }
    const job = {
      title: this.title,
      description: this.description,
      type: this.type,
      experience: this.experience,
      category: this.category,
      companyId: companyId
    };
    // Required Fields
    if (!this.validateService.validateJob(job)) {
      console.log(job);
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.createJob(job).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Job created successfully!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/company/jobs']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/company/home']);
      }
    });
  }

}
