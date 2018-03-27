import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const employee = {
      email: this.email,
      password: this.password
    }


    if(!this.validateService.validateLogin(employee)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(employee.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateEmployee(employee).subscribe(data => {
      if(data.success) {
        this.authService.storeEmployeeData(data.token, data.employee);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['company']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['company/login']);
      }
    });
  }

}
