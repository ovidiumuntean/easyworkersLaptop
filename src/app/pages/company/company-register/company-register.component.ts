import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {Address} from "../../../models/address";

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  first_name: String;
  last_name: String;
  name: String;
  regNo: String;
  phoneNo: String;
  address: Address;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) {
    this.address = new Address();
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const comp = {
      name: this.name,
      regNo: this.regNo,
      phoneNo: this.phoneNo,
      address: this.address,
      email: this.email
    }

    const employee = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      permission: 'company_admin',
      password: this.password
    }

    const company = {
      company: comp,
      employee: employee
    }

    // Required Fields
    if(!this.validateService.validateRegisterCompany(company.company) || !this.validateService.validateAddress(company.company.address)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(comp.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register company
    this.authService.registerCompany(company).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
